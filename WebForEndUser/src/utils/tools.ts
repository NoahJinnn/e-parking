/**
 * Delay current async function by given time
 * @param ms Delay time in microseconds
 */
export function delay (ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create an promise with timeout
 * @param ms Timeout in millisecond
 * @param promise
 */
export const timeoutPromise = (ms: number, promise: Promise<any>): Promise<Response> =>
    new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error("API timeout"));
        }, ms);
        promise.then(
            (res: Response) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err: Error) => {
                clearTimeout(timeoutId);
                reject(err);
            },
        );
    });

/**
 * Get formated time for app clock
 */
export function getFormatTime (date: Date = new Date()) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}
