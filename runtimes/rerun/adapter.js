// xrai · runtimes/rerun — Rerun.io ARKit recording playback
// contract: { mount(stage, scene, ctx), unmount() }
// ARKit → .rrd pipeline:
//   - swift app: `import RerunSDK` → log ARFrame depth/RGB/anchors → save .rrd
//   - python:   `pip install rerun-sdk` + parse ARKit JSON → rr.log(...) → rr.save("session.rrd")
//   - rust CLI: `cargo install rerun-arkit` (community port; experimental)
// host viewer:  https://app.rerun.io/?url=<absolute .rrd URL, CORS-enabled>

const SAMPLE = 'https://app.rerun.io/version/0.18.2/examples/structure_from_motion/data.rrd';

let host = null, onEv = null;

export const id   = 'rerun';
export const meta = { needsNet:true, externalDomain:'app.rerun.io' };

export function mount(stage, scene, ctx = {}){
  host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0;background:#000;display:flex;flex-direction:column';
  stage.appendChild(host);

  const bar = document.createElement('div');
  bar.style.cssText = `
    display:flex;gap:10px;align-items:center;padding:6px 12px;
    border-bottom:1px solid #211e18;
    font:500 10px/1 'JetBrains Mono',ui-monospace,monospace;
    color:#ffb000;text-transform:uppercase;letter-spacing:.22em`;
  bar.innerHTML = `
    <span style="opacity:.5">rerun·</span>
    <input id="rr-url" type="url" placeholder=".rrd URL (CORS)" value="${ctx.url || SAMPLE}" style="flex:1;background:#0d0c0a;color:#f4ecd8;border:1px solid #3a3022;font:inherit;padding:4px 8px;text-transform:none;letter-spacing:.04em">
    <button id="rr-go" style="background:#ffb000;color:#0d0c0a;border:0;font:inherit;font-weight:700;padding:5px 10px;cursor:pointer">load</button>
    <a href="https://rerun.io/docs/getting-started/data-in/swift" target="_blank" style="color:#7fffe4;text-decoration:none">arkit→rrd ↗</a>`;
  host.appendChild(bar);

  const f = document.createElement('iframe');
  f.style.cssText = 'flex:1;border:0;background:#000';
  f.allow = 'cross-origin-isolated';
  host.appendChild(f);

  function go(){
    const u = host.querySelector('#rr-url').value.trim();
    f.src = `https://app.rerun.io/?url=${encodeURIComponent(u)}`;
    onEv?.({ type:'rerun.load', url: u });
  }
  host.querySelector('#rr-go').onclick = go;
  go();
}

export function unmount(){
  host?.remove(); host = null;
}

export function onEvent(cb){ onEv = cb; }
