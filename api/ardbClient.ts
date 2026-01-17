import { buildURL } from "../utils/buildURL.ts";

const ardbGet = async (path: string) => {
    const url = buildURL(path, "https://ardb.app/api/");

    console.log(`ARDB GET: ${url}`);

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        const bodyText = await res.text().catch(() => "");
        throw new Error(
            `ARDB request failed: ${res.status} ${res.statusText} url=${url} body=${bodyText}`
        );
    }

    return res.json();
}

export default ardbGet;