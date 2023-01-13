import axios from "axios";
import {PhotosType, ProfileType, UsersType} from "../types/types";

// axios instance
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "e79465c0-a085-445a-b2a1-0ae7b0126e40",
    },
});

type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
type FollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
type UnFollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance
          .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
          .then((res) => res.data);
    },

    follow(userId: number) {
        return axiosInstance.post<FollowType>(`follow/${userId}`).then((res) => res.data);
    },

    unFollow(userId: number) {
        return axiosInstance.delete<UnFollowType>(`follow/${userId}`).then((res) => res.data);
    },
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
type GetAuthType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type LogoutType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    getAuth() {
        return axiosInstance.get<GetAuthType>(`auth/me`).then((res) => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return axiosInstance.post<LoginType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        }).then((res) => res.data);
    },
    logout() {
        return axiosInstance.delete<LogoutType>(`auth/login`).then((res) => res.data);
    },
};

type UpdateStatusType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
type SaveMainPhotoType = {
    data: { photos: PhotosType }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type SaveProfileType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const profileAPI = {
    getProfile(userId: number | null) {
        return axiosInstance.get<ProfileType>(`profile/${userId}`).then((res) => res.data);
    },

    getStatus(userId: number) {
        return axiosInstance
          .get(`profile/status/${userId}`)
          .then((res) => res.data);
    },

    updateStatus(status: string) {
        return axiosInstance.put<UpdateStatusType>(`profile/status`, { status: status }).then((res) => res.data);
    },

    saveMainPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return axiosInstance.put<SaveMainPhotoType>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => res.data);
    },

    saveProfile(profile: ProfileType) {
        return axiosInstance.put<SaveProfileType>(`profile`, profile).then((res) => res.data);
    },
};

type GetCaptchaUrlType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return axiosInstance.get<GetCaptchaUrlType>(`security/get-captcha-url`).then((res) => res.data);
    },
};