export type CacheValue<T> = {
    data: T;
    fetchedAt: number;
};