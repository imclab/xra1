# geo-map

MapLibre + OpenFreeMap base + XRAI pin layer. Drop, drag, search, fly-to-current-location, hand-off to AR view.

## Mount contract

```js
import { mount } from './adapter.js';
await mount(host, scene, ctx);
```

- `host` — container element.
- `scene.entities[]` (optional) — entries with `{ type:'geo', lng, lat, label?, kind? }` seed pins on mount.
- `ctx.bus` (optional) — pub/sub. Adapter emits/consumes `geo.pin.add|remove|move` + `geo.view`.

## Persistence

- **localStorage** key `xrai.geo.pins.v1` — all pins serialized on every add/remove/drag. Restored before scene seed (seed wins on id collision).
- **BroadcastChannel** `xrai.geo.pins` — cross-tab/window sync. Wire format: `{ kind:'add'|'remove'|'move', ... }`. Inbound calls re-enter `addPin/removePin` with `fromBus=true` to short-circuit re-emit loops.

Zero server, zero account. Open two tabs of geo-map → pins sync live.

## Geocoding

Free Nominatim (`nominatim.openstreetmap.org`). Rate-limited; keep query volume sane.

## See also

- `runtimes/geo-ar/` — phone-camera AR companion using same pin protocol.
