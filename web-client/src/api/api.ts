import { baseUrl } from "../utils";

export namespace API {
  export type Result<T> = { success: true; data: T } | { success: false; error: string };

  export interface LatestResponseItem {
    name: string;
    latestImages: string[];
  }
  export type LatestResponse = LatestResponseItem[];
}

export const fetchLatest = async (): Promise<API.Result<API.LatestResponse>> => {
  try {
    let response = await fetch(`${baseUrl}/api/latest`);
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false, error: error + "" };
  }
};

export const fetchCameras = async (): Promise<
  { success: true; data: API.LatestResponse } | { success: false; error: string }
> => {
  try {
    let response = await fetch("/api/cameras");
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false, error: error + "" };
  }
};
