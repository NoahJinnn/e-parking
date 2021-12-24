interface IApiConfig {
    method?: "POST" | "GET";
    headers?: { [key: string]: string };
    data?: { [key: string]: string | number };
}

interface ICommonResponse {
    message: string;
}

interface IApiFindUnits {
    radius: number;
    data: IMarker[];
}
