// xrai · chrome-ext · background service worker
// - opens side panel on action click
// - relays MCP calls between page/sidepanel and the user's hub (default localhost)
// - pops out 3D node graph window
// - registers context menus for "grab to XRAI" + "remix in XRAI"

const HUB = 'http://localhost:8787'; // xrai bridge sidecar (ws + mcp relay)

chrome.runtime.onInstalled.addListener(()=>{
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(()=>{});
  chrome.contextMenus.create({ id:'xrai-grab',    title:'Grab to XRAI',        contexts:['image','video','link','selection'] });
  chrome.contextMenus.create({ id:'xrai-remix',   title:'Open in XRAI Remix',  contexts:['page','image','video','link'] });
  chrome.contextMenus.create({ id:'xrai-shader',  title:'Reprogram with WGSL', contexts:['image','video'] });
  chrome.contextMenus.create({ id:'xrai-ar',      title:'View in AR (Needle)', contexts:['link','image'] });
});

chrome.contextMenus.onClicked.addListener((info, tab)=>{
  const payload = {
    src: info.srcUrl || info.linkUrl || info.pageUrl,
    text: info.selectionText,
    type: info.mediaType || (info.linkUrl ? 'link' : 'page'),
    page: tab?.url, title: tab?.title,
  };
  if(info.menuItemId === 'xrai-grab')   send({ cmd:'grab',   payload });
  if(info.menuItemId === 'xrai-remix')  open(`popout.html?mode=remix&src=${encodeURIComponent(payload.src||tab.url)}`);
  if(info.menuItemId === 'xrai-shader') open(`popout.html?mode=shader&src=${encodeURIComponent(payload.src)}`);
  if(info.menuItemId === 'xrai-ar')     open(`popout.html?mode=ar&src=${encodeURIComponent(payload.src)}`);
});

chrome.commands.onCommand.addListener(async cmd=>{
  if(cmd === 'toggle-dash'){
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    chrome.tabs.sendMessage(tab.id, { kind:'xrai.toggle' });
  }
  if(cmd === 'popout-graph') open('popout.html?mode=graph');
});

chrome.runtime.onMessage.addListener((msg, sender, reply)=>{
  if(msg?.kind === 'xrai.mcp'){
    // relay MCP request to the user's hub
    fetch(`${HUB}/mcp`, {
      method:'POST', headers:{ 'content-type':'application/json' },
      body: JSON.stringify({ ...msg.req, source: sender.tab?.url || 'sidepanel' })
    }).then(r=> r.json()).then(reply).catch(e=> reply({ error:e.message }));
    return true;
  }
  if(msg?.kind === 'xrai.popout'){
    open(msg.url);
  }
  if(msg?.kind === 'xrai.capture'){
    // broadcast to side panel
    chrome.runtime.sendMessage({ kind:'xrai.capture.broadcast', cap: msg.cap }).catch(()=>{});
  }
});

function send(req){
  chrome.runtime.sendMessage({ kind:'xrai.bg.send', req }).catch(()=>{});
}

function open(path){
  chrome.windows.create({
    url: chrome.runtime.getURL(path),
    type: 'popup',
    width: 1100, height: 760,
  });
}
