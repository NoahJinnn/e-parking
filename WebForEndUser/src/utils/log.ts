import { APP_ANALYTICS, APP_CRASHLYTICS, APP_DEBUG } from '@config';

import { delay } from './tools';

export type DebugStatus = "bug!" | "warn" | "info" | "doin";

/**
 * Debug class for application
 */
export class Debug {
    /**
     * Name of class that this debug belong to
     */
    name: string;
    constructor (name: string) {
        this.name = name;
    }

    /**
     * Log an info into terminal or to file
     * @param opts Log info that need to print out
     * @param alert Should alert this in different color?
     */
    Print (opts: { icon: DebugStatus; name: string; mess: string; data?: any }, alert: boolean = false) {
        this.collectAnalytic(opts.name, opts.mess, opts.data);
        if (APP_DEBUG) {
            console[alert ? "warn" : "log"](
                `<${opts.icon} #${this.name}>`,
                opts.name,
                ":",
                opts.mess,
                opts.data || typeof opts.data === "number" ? "==>" : "",
                opts.data || typeof opts.data === "number" ? opts.data : "",
            );
        } else {
            // Collect crash only on product mode
            if (APP_CRASHLYTICS.enabled && opts.icon === "bug!") {
                // Found bug => send to crashlytics
                // crashlytics().recordError(
                //     new Error(
                //         JSON.stringify({
                //             className: this.name,
                //             functName: opts.name,
                //             message: opts.mess,
                //             data: opts.data,
                //         }),
                //     ),
                // );
            }
        }
    }

    /**
     * Send an analytic to google firebase
     * @param _type Type of event
     * @param _name Name of event
     * @param _data Data that send to analytic
     */
    async sendAnalyticEvent (_type: DebugStatus, _name: string, _data: any = {}) {
        if (APP_ANALYTICS.enabled) {
            // await analytics().logEvent(name, {
            //     type: type,
            //     value: data,
            // });
            await delay(10);
        }
    }

    /**
     * Collect data from and log and send to analytic
     * @param functName Name of funtion which is logging
     * @param functLog Log from function
     * @param functData Data from function
     */
    async collectAnalytic (functName: string, functLog: string, functData?: any) {
        if (APP_ANALYTICS.keyword.class.indexOf(this.name) !== -1) {
            return this.sendAnalyticEvent("info", this.name, { name: functName, log: functLog, data: functData });
        }
        for (const filter of APP_ANALYTICS.keyword.funct) {
            if (functName.includes(filter)) {
                return this.sendAnalyticEvent("info", functName, {
                    log: functLog,
                    data: functData,
                });
            }
        }
        for (const filter of APP_ANALYTICS.keyword.mess) {
            if (functLog.includes(filter)) {
                return this.sendAnalyticEvent("info", filter, {
                    log: functLog,
                    data: functData,
                });
            }
        }
        if (typeof functData === "object") {
            const dataKeys = Object.keys(functData);
            for (const filter of APP_ANALYTICS.keyword.dataKeys) {
                if (dataKeys.indexOf(filter) !== -1) {
                    return this.sendAnalyticEvent("info", filter, {
                        log: functName,
                        data: functData[filter],
                    });
                }
            }
        }
    }

    /**
     * Log an bug to console
     * @param name Name of function that call this log
     * @param mess Message for this log
     * @param data Data will be logged
     */
    b (functName: string, mess: string, data?: any) {
        this.Print({ icon: "bug!", name: functName, mess, data }, true);
    }
    /**
     * Log warning to console
     * @param name Name of function that call this log
     * @param mess Message for this log
     * @param data Data will be logged
     */
    w (functName: string, mess: string, data?: any) {
        this.Print({ icon: "warn", name: functName, mess, data }, true);
    }
    /**
     * Log info to console
     * @param name Name of function that call this log
     * @param mess Message for this log
     * @param data Data will be logged
     */
    i (functName: string, mess: string, data?: any) {
        this.Print({ icon: "info", name: functName, mess, data });
    }
    /**
     * Log prossing job to console
     * @param name Name of function that call this log
     * @param mess Message for this log
     * @param data Data will be logged
     */
    p (functName: string, mess: string, data?: any) {
        this.Print({ icon: "doin", name: functName, mess, data });
    }
}

/**
 * Global debug
 */
export const gDebug = new Debug("global");
