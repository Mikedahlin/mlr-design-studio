# MLR Repository Audit

**Date**: 2026-08-21
**Phase**: 1 - Repository Audit

## Overview
A comprehensive audit of the repository was conducted to locate all relevant 3D, image, video, and font assets in accordance with the MLR project guidelines.

## Findings

### Logo and Brand Files
- **Found**: `public/images/MLR Emblem.png` (Approved interim logo)
- **Found**: Various reference images in `public/media/brand-reference/` and `public/media/brand-reference-pack/`. These are for visual direction only and should not be used as final production media.

### HDRI Files
- **Found**: `assets/hdris/polyhaven-kloppenheim-puresky-4k.hdr` (Approved)
- **Found**: `assets/hdris/polyhaven-venice-sunset-4k.hdr` (Approved)

### 3D Files (.blend, .fbx, .obj, .glb, .gltf, .usd)
- **Found**: `public/media/generated/apex/apex-media-source.blend` (Forbidden/Rejected primitive)
- **Found**: `public/media/generated/ember/ember-media-source.blend` (Forbidden/Rejected primitive)
- **Found**: `public/media/generated/northshore/northshore-media-source.blend` (Forbidden/Rejected primitive)
- **Not Found**: Any `.glb`, `.gltf`, `.fbx`, `.obj` files in `assets/models/`. The required `assets/models/northshore-lodge-main.glb` is missing and must be downloaded.

### Video and Image Master Files
- **Found**: `public/media/mlr-opening/` (Approved homepage opening media, frozen - do not modify)
- **Found**: `public/media/velvet-room/velvet-room-v2.*` (Approved, frozen - do not modify)
- **Found**: `public/media/master-renders/` (Not for clean-room production media)
- **Found**: `public/media/card-final-frames/` (Not for clean-room production media)

### Existing Manifests and Logs
- **Not Found**: `MLR-ASSET-MANIFEST.json`
- **Not Found**: `MLR-PRODUCTION-LOG.md`
- **Not Found**: `MLR-LICENSES.md`
(These files are being initialized now).

## Action Items
1. Initialize the manifest, log, and licenses files.
2. The `assets/models/northshore-lodge-main.glb` model is missing. It needs to be manually downloaded from Sketchfab and placed there.
3. Proceed to Phase 2 (Northshore references and assets).
