export namespace API {
    export interface LatestResponseItem {
        name: string;
        latestImages: string[];
    }
    export type LatestResponse = LatestResponseItem[];

}
export const fetchLatest = async (): Promise<{ success: true, data: API.LatestResponse } | { success: false, error: string }> => {
    try {
        let response = await fetch('http://localhost:3939/latest');
        let json = await response.json();
        return {success: true, data: json};
    } catch (error) {
        console.log(error);
        return {success: false, error: error + ''};
    }
}

export const fetchCameras = async (): Promise<{ success: true, data: API.LatestResponse } | { success: false, error: string }> => {
    try {
        let response = await fetch('http://localhost:3939/cameras');
        let json = await response.json();
        return {success: true, data: json};
    } catch (error) {
        console.log(error);
        return {success: false, error: error + ''};
    }
}