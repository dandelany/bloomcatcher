import { baseUrl } from "../utils";

export namespace API {
  export type Result<T> = { success: true; data: T } | { success: false; error: string };

  export interface CamerasResponseItem {
    name: string;
    hostname: string;
  }
  export type CamerasResponse = CamerasResponseItem[];

  export interface LatestResponseItem {
    name: string;
    latestImages: string[];
  }
  export type LatestResponse = LatestResponseItem[];

  export interface LibraryResponseItem {
    name: string;
    sessions: {
      dirName: string,
      name: string, 
      date: string,
      count: number,
      thumbUrl: string
    }[]
  }
  export type LibraryResponse = LibraryResponseItem[];

  export interface SessionResponse {
    images: string[]
  }
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
  { success: true; data: API.CamerasResponse } | { success: false; error: string }
> => {
  try {
    let response = await fetch(`${baseUrl}/api/cameras`);
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false, error: error + "" };
  }
};



export const fetchLibrary = async (): Promise<API.Result<API.LibraryResponse>> => {
  try {
    let response = await fetch(`${baseUrl}/api/library`);
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false, error: error + "" };
  }
};

export const fetchSession = async (cameraName: string, sessionId: string): Promise<API.Result<API.SessionResponse>> => {
  try {
    let response = await fetch(`${baseUrl}/api/session/${cameraName}/${sessionId}`);
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false, error: error + "" };
  }
};