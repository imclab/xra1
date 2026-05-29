// js/comfort/kb.js — AgentKB (web port of src/services/jarvis/kb.ts)
// ─────────────────────────────────────────────────────────────────────────────
// Pure-computation rule engine. Zero network, zero LLM, zero deps. Runs in the
// browser and in Node (smoke). This is the *brain* the comfort loop fires
// against (Pattern A: NO new brain — same engine iOS uses).
//
// Parity scope: this web port carries the comfort-loop-relevant surface of the
// iOS class verbatim — setNode / addRule / evaluate / recordRuleOutcome. The
// content-addressable Experience memory (remember/recall/compact) is iOS-only
// and unused by the comfort loop, so it is intentionally omitted here. The
// rule-eval math (resolvePath, evalCondition, ±0.05/-0.03 confidence) is
// byte-identical to iOS so sentiment classification matches across platforms.
// ─────────────────────────────────────────────────────────────────────────────

/** @typedef {'=='|'!='|'>'|'<'|'>='|'<='} RuleOp */
/** @typedef {{ call: string, args?: Record<string, unknown> }} RuleAction */
/** @typedef {{ id: string, when: [string, RuleOp, unknown][], do: RuleAction[], hits: number, misses: number, confidence: number }} KBRule */

function resolvePath(nodes, path) {
  const parts = path.split('.');
  const node = nodes[parts[0]];
  if (!node) return undefined;
  let val = node;
  for (let i = 1; i < parts.length; i++) {
    if (val == null || typeof val !== 'object') return undefined;
    val = val[parts[i]];
  }
  return val;
}

function evalCondition(actual, op, expected) {
  switch (op) {
    case '==': return actual === expected;
    case '!=': return actual !== expected;
    case '>':  return typeof actual === 'number' && typeof expected === 'number' && actual > expected;
    case '<':  return typeof actual === 'number' && typeof expected === 'number' && actual < expected;
    case '>=': return typeof actual === 'number' && typeof expected === 'number' && actual >= expected;
    case '<=': return typeof actual === 'number' && typeof expected === 'number' && actual <= expected;
    default:   return false;
  }
}

export class AgentKB {
  constructor() {
    this.graph = { nodes: {}, edges: [], rules: [], version: 1, updatedAt: Date.now() };
  }

  setNode(id, v) {
    // Mirror iOS shape exactly: node.v holds the value bag, and rules address
    // it as `<id>.v.<key>` (see comfortRules `userState.v.retryRate`).
    this.graph.nodes[id] = { id, v };
    this.graph.updatedAt = Date.now();
  }

  getNode(id) {
    return this.graph.nodes[id];
  }

  addRule(rule) {
    const idx = this.graph.rules.findIndex((r) => r.id === rule.id);
    if (idx >= 0) this.graph.rules[idx] = rule;
    else this.graph.rules.push(rule);
    this.graph.updatedAt = Date.now();
  }

  /** @returns {{ rule: KBRule, actions: RuleAction[] }[]} */
  evaluate() {
    const fired = [];
    for (const rule of this.graph.rules) {
      const allMatch = rule.when.every(([path, op, expected]) =>
        evalCondition(resolvePath(this.graph.nodes, path), op, expected),
      );
      if (allMatch) fired.push({ rule, actions: rule.do });
    }
    return fired;
  }

  recordRuleOutcome(ruleId, success) {
    const rule = this.graph.rules.find((r) => r.id === ruleId);
    if (!rule) return;
    if (success) {
      rule.hits++;
      rule.confidence = Math.min(1, rule.confidence + 0.05);
    } else {
      rule.misses++;
      rule.confidence = Math.max(0, rule.confidence - 0.03);
    }
    this.graph.updatedAt = Date.now();
  }

  get stats() {
    return {
      nodes: Object.keys(this.graph.nodes).length,
      rules: this.graph.rules.length,
      version: this.graph.version,
    };
  }
}
