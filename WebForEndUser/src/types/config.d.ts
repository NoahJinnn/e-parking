interface IAppConfigDict {
    enabled: boolean;
}
interface IAppAnalytics extends IAppConfigDict {
    keyword: {
        class: string[];
        funct: string[];
        mess: string[];
        dataKeys: string[];
    };
}
