// comfort-demo.html — jARvis comfort-loop, button-by-button E2E.
// Drives the REAL loop (no mocks): each button records a real action stream,
// runs a real tick, and we assert the real sentiment + HUD render + XRAI persist.
import { test, expect } from '@playwright/test';
import { errorFilter } from './_helpers.js';

async function open(page, errors) {
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('requestfailed', r => errors.push(`reqfail: ${r.url()} ${r.failure()?.errorText}`));
  await page.goto('/comfort-demo.html');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => !!window.__comfort, null, { timeout: 8000 });
}

// Read the real last sentiment computed by the page's loop.
const lastState = page => page.evaluate(() => window.__comfort.getLastSentiment()?.state);
const lastHint  = page => page.evaluate(() => {
  const e = window.__comfort.loop.hud.emissions.filter(x => x.type === 'jarvis_ui_hint');
  return e.length ? e[e.length - 1].payload.kind : null;
});

test.describe('comfort-demo.html — page loads clean', () => {
  test('mounts brand, headline, flow grid, all controls', async ({ page }) => {
    const errors = [];
    await open(page, errors);

    await expect(page.locator('body')).toContainText(/comfort loop/i);
    await expect(page.locator('h1')).toContainText(/web/i);
    // 5 sentiment cells + 5 trigger buttons + 3 loop controls present
    await expect(page.locator('#flow .cell')).toHaveCount(5);
    for (const id of ['frustration','cancel','confusion','discovery','flow','tick','auto','reset'])
      await expect(page.locator(`[data-testid="${id}"]`)).toBeVisible();

    const filtered = errors.filter(errorFilter);
    expect(filtered, filtered.join('\n')).toHaveLength(0);
  });
});

test.describe('comfort-demo.html — button by button (real signals → real sentiment → real HUD)', () => {
  const cases = [
    { id: 'frustration', state: 'frustration', hint: 'ghost_hand_demo' },
    { id: 'cancel',      state: 'frustration', hint: 'ghost_hand_demo' },
    { id: 'confusion',   state: 'confusion',   hint: 'modality_switch' },
    { id: 'discovery',   state: 'discovery',   hint: 'silent_particle_burst' },
    { id: 'flow',        state: 'flow',        hint: 'suppress_chrome' },
  ];

  for (const c of cases) {
    test(`"${c.id}" → ${c.state} + ${c.hint} + readout updates`, async ({ page }) => {
      const errors = [];
      await open(page, errors);

      await page.locator(`[data-testid="${c.id}"]`).click();

      // 1. Real sentiment computed by the loop matches the contract.
      expect(await lastState(page)).toBe(c.state);
      // 2. The closed-loop UI hint fired.
      expect(await lastHint(page)).toBe(c.hint);
      // 3. Readout reflects it (visible, real DOM).
      await expect(page.locator('#r-state')).toHaveText(c.state);
      // 4. The flow-grid cell for this state is highlighted.
      await expect(page.locator(`#flow .cell[data-state="${c.state}"]`)).toHaveClass(/active/);
      // 5. Sentiment persisted as a codon.sentiment entity (XRAI parity).
      const persisted = await page.evaluate(() =>
        window.__comfort.getActive().scene.entities.filter(e => e.type === 'codon.sentiment').length);
      expect(persisted).toBeGreaterThan(0);

      const filtered = errors.filter(errorFilter);
      expect(filtered, filtered.join('\n')).toHaveLength(0);
    });
  }

  test('frustration shows the HUD card on screen (visual response, not just data)', async ({ page }) => {
    const errors = [];
    await open(page, errors);
    await page.locator('[data-testid="frustration"]').click();
    await expect(page.locator('.cmf-hud.cmf-show')).toBeVisible();
    await expect(page.locator('.cmf-label')).toContainText(/FRICTION/);
    expect(errors.filter(errorFilter), '').toHaveLength(0);
  });

  test('flow suppresses page chrome (body.cmf-flow)', async ({ page }) => {
    await open(page, []);
    await page.locator('[data-testid="flow"]').click();
    await expect(page.locator('body')).toHaveClass(/cmf-flow/);
  });

  test('confusion surfaces the alternate-input rail (VOICE/TYPE/TAP)', async ({ page }) => {
    await open(page, []);
    await page.locator('[data-testid="confusion"]').click();
    await expect(page.locator('.cmf-rail .cmf-chip')).toHaveCount(3);
    await expect(page.locator('.cmf-rail')).toContainText('VOICE');
  });

  test('reset clears sentiment + readout', async ({ page }) => {
    await open(page, []);
    await page.locator('[data-testid="discovery"]').click();
    expect(await lastState(page)).toBe('discovery');
    await page.locator('[data-testid="reset"]').click();
    await expect(page.locator('#r-state')).toHaveText('—');
  });

  test('auto-tick toggle flips state label on/off', async ({ page }) => {
    await open(page, []);
    const btn = page.locator('[data-testid="auto"]');
    await expect(btn).not.toHaveClass(/on/);
    await btn.click();
    await expect(btn).toHaveClass(/\bon\b/);
    await btn.click();
    await expect(btn).not.toHaveClass(/\bon\b/);
  });
});
