import { LRUCache as LRU } from "lru-cache";

import { CacheValue } from "./types.ts";

/**
 * Global in memory cache instance
 *
 * - Key: string (we control this via makeCacheKey)
 * - Value: CacheValue<any> (data + metadata)
 *
 * This cache:
 * - Evicts least recently used entries when max is reached
 * - Automatically expires entries after `ttl`
 * - Lives for the lifetime of the server process
 */
export const upstreamCache = new LRU<string, CacheValue<any>>({
    // Maximum number of entries to keep in memory
    max: 500,

    // Time to live for each entry (in milliseconds)
    // After this time the entry is removed automatically
    ttl: 1000 * 60 * 5, // 5 minutes

    // When an entry is accessed, reset its age
    // This keeps "hot" entries in cache longer
    updateAgeOnGet: true,

    // Do not return expired entries
    allowStale: false,
});