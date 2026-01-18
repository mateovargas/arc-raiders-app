import { CacheValue } from "./types.ts";
import { upstreamCache } from "./const.ts";

/**
 * Creates a stable, deterministic cache key.
 *
 * Why this exists:
 * - Objects in JS do not guarantee key order
 * - The same inputs MUST always generate the same cache key
 *
 * Example:
 * makeCacheKey({ route: "items", id: 123 })
 * makeCacheKey({ id: 123, route: "items" })
 *
 * Both produce the same string key.
 */
export function makeCacheKey(parts: Record<string, any>) {
    // Sort keys alphabetically
    const sorted = Object.keys(parts)
        .sort()
        .reduce<Record<string, any>>((obj, key) => {
            obj[key] = parts[key];
            return obj;
        }, {});

    // Convert the sorted object to a string for Map / LRU usage
    return JSON.stringify(sorted);
}

/**
 * Tracks in flight requests per cache key.
 *
 * Purpose:
 * - Prevents multiple simultaneous requests from
 *   calling the upstream API at the same time
 *
 * Example:
 * 10 users hit /items at once
 * Only ONE upstream request is executed
 * The other 9 await the same Promise
 */
const inFlight = new Map<string, Promise<any>>();

/**
 * Cache wrapper function
 *
 * Responsibilities:
 * 1. Return cached data if available
 * 2. Deduplicate concurrent requests
 * 3. Fetch from upstream if needed
 * 4. Store result in cache
 *
 * This function is generic and reusable across ALL routes
 */
export async function getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>
) {
    // 1) Check if data is already cached
    const cached = upstreamCache.get(key) as CacheValue<T> | undefined;

    // If cache hit, return immediately
    if (cached) {
        return {
            data: cached.data,
            cacheHit: true,
        };
    }

    // 2) Check if a request for this key is already in progress
    const existing = inFlight.get(key) as Promise<T> | undefined;

    // If another request is already fetching this data,
    // wait for it instead of calling upstream again
    if (existing) {
        const data = await existing;
        return {
            data,
            cacheHit: true, // treated as cache hit since we avoided upstream
        };
    }

    // 3) No cache and no in flight request
    // Call the upstream fetcher
    const p = fetcher()
        .then((data) => {
            // Store the fetched data in the cache
            upstreamCache.set(key, {
                data,
                fetchedAt: Date.now(),
            });

            return data;
        })
        .finally(() => {
            // Always remove the in flight marker
            // even if the request fails
            inFlight.delete(key);
        });

    // Mark this request as in flight
    inFlight.set(key, p);

    // Wait for the upstream request to complete
    const data = await p;

    return {
        data,
        cacheHit: false, // first request always counts as a miss
    };
}
