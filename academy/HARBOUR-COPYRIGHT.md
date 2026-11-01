# OpenStreetMap map data

© OpenStreetMap contributors

https://www.openstreetmap.org/copyright

The OSM-derived database in data/gibraltar-map.json is made available under the Open Database License (ODbL) 1.0:
https://opendatacommons.org/licenses/odbl/1-0/

Individual database contents are available under the Database Contents License:
https://opendatacommons.org/licenses/dbcl/1-0/

This release includes an adapted local-metre database produced from OSM API data on 2026-10-17. Geometry was stitched, projected, clipped, simplified and, for linear roads/piers/cliffs, buffered. Source way identifiers remain attached to features. Projection and head-mark source coordinates are recorded in data/map-provenance.json. The three `anchorage-*` vessels are fictional game scenario features, not mapped vessel positions.

Source requests:
- https://api.openstreetmap.org/api/0.6/map?bbox=-5.38,36.135,-5.35,36.16
- https://api.openstreetmap.org/api/0.6/map?bbox=-5.38,36.10,-5.35,36.135
- https://api.openstreetmap.org/api/0.6/map?bbox=-5.35,36.135,-5.33,36.16
- https://api.openstreetmap.org/api/0.6/map?bbox=-5.35,36.10,-5.33,36.135

The ODbL notice applies to the map database. The historical study/depth material and simulator code retain their existing provenance and terms.
