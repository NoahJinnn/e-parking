import { API_SECURE_KEY, API_TIMEOUT } from '@config';
import { gDebug } from '@utils/log';
import { timeoutPromise } from '@utils/tools';

interface IRequestInit extends RequestInit {
    body?: any;
}

/**
 * Fetch API from backend
 * @param url Path of api
 * @param opts
 */
export const commonFetch = async (url: string, opts?: IRequestInit): Promise<any> => {
    gDebug.i("commonFetch", `Calling url: ${url}`, opts);
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    try {
        const response = await timeoutPromise(
            API_TIMEOUT,
            fetch(proxyUrl + url, {
                ...opts,
                headers: {
                    ...opts?.headers,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                body: opts?.method === "GET" ? undefined : JSON.stringify(opts?.body || {}),
            }),
        );
        return await response.json();
    } catch (e) {
        gDebug.w("commonFetch", `failed url: ${url}`, e);
        throw new Error("API Call failed");
    }
};

/**
 * Fetch API with x-api-key header set
 * @param url Path of api
 * @param opts
 */
export const secureFetch = (url: string, opts?: IRequestInit) =>
    commonFetch(url, {
        ...opts,
        headers: { "x-api-key": API_SECURE_KEY, ...opts?.headers },
    });
