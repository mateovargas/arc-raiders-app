import { Router } from 'express';

import { getMapData } from '../../api/metaforge/mapsClient.ts';
import { getOrFetch, makeCacheKey } from '../../cache/lru.ts';
import { MapData } from '../../api/types.ts';

const router = Router();

//GET /api/metaforge/maps/:name
router.get('/:name', async (req, res) => {
    const mapName = req.params.name;
    const key = makeCacheKey({ route: `metaforge:maps:${mapName}` });

    try {
        const result = await getOrFetch<MapData>(key, () => getMapData(mapName));
        res.setHeader('XCache', result.cacheHit ? 'HIT' : 'MISS');
        res.json(result.data);
    } catch (err) {
        res.status(502).json({ error: 'Failed to fetch Metaforge map data' });
    }
});

export default router;