// xrai · runtimes/supasplat — SuperSplat editor (PlayCanvas)
// the user spelled "supasplat" — canonical project is "supersplat" at https://superspl.at/editor
// contract: { mount(stage, scene, ctx), unmount() }
// strategy: iframe the hosted editor. Future: swap to `@playcanvas/supersplat` runtime when import-as-module ships.

let host = null, onEv = null;

export const id   = 'supasplat';
export const meta = { needsNet:true, externalDomain:'superspl.at' };

export function mount(stage){
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
    <span style="opacity:.5">supasplat·</span>
    <span style="opacity:.6">PlayCanvas editor · iframed</span>
    <span style="flex:1"></span>
    <a href="https://superspl.at/editor" target="_blank" style="color:#7fffe4;text-decoration:none">open externally ↗</a>`;
  host.appendChild(bar);

  const f = document.createElement('iframe');
  f.src = 'https://superspl.at/editor';
  f.style.cssText = 'flex:1;border:0;background:#000';
  f.referrerPolicy = 'no-referrer';
  f.allow = 'clipboard-read; clipboard-write; xr-spatial-tracking; camera';
  host.appendChild(f);

  onEv?.({ type:'supasplat.iframe', url: f.src });
}

export function unmount(){
  host?.remove(); host = null;
}

export function onEvent(cb){ onEv = cb; }
