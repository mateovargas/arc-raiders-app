const buildURL = (path: string, baseURL: string): string => {
    return new URL(path, baseURL).toString();
}

export {
    buildURL
}