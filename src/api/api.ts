import axios from "axios";
import { UsersType } from "../types/types";

// axios instance
export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY,
    },
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = Record<string, never>, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}