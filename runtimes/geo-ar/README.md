# geo-ar

Phone-camera AR companion to `geo-map`. Live video + DeviceOrientation compass + nearby-pin overlay + radar. Same pin protocol as `geo-map`, so pins drop on the map appear in AR (and vice versa) on the same device or across devices via shared persistence.

## Mount contract

```js
import { mount } from './adapter.js';
await mount(host, scene, ctx);
```

- URL params: `?lng=&lat=` seed initial position before geolocation fix.
- `scene.entities[]` (optional) — entries with `{ type:'geo', lng, lat, label?, kind? }` seed pins on mount.
- `ctx.bus` (optional) — pub/sub. Adapter emits/consumes `geo.pin.add|remove|move`.

## Permissions

- **Camera**: tap `camera` (gesture-gated).
- **DeviceOrientation**: tap `orient` (iOS requires explicit `DeviceOrientationEvent.requestPermission()`).
- **Geolocation**: auto-requested on mount.

## Persistence

Same as `geo-map`:

- **localStorage** `xrai.geo.pins.v1`.
- **BroadcastChannel** `xrai.geo.pins` — pins sync live with any open `geo-map` or `geo-ar` tab.

## Projection

Per pin: haversine distance + bearing → screen X via `(bearing - heading)` mapped across assumed 70° FOV. Closer pins render larger. Radar shows full 360°, scoped to 60m.

## See also

- `runtimes/geo-map/` — full MapLibre map view + drop/drag/search.
