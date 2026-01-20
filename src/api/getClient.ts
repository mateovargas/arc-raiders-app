import { buildURL } from "../utils/buildURL.js";

const getData = async (path: string, baseURL: string) => {
    const url = buildURL(path, baseURL);

    console.log(`GET: ${url}`);

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const bodyText = await res.text().catch(() => "");
        throw new Error(
            `Request failed: ${res.status} ${res.statusText} url=${url} body=${bodyText}`
        );
    }

    return res.json();
}

export default getData;