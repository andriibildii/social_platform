import { PhotosType, ProfileType } from "../types/types";
import { axiosInstance, ResultCodesEnum, ResponseType } from "./api";

type SavePhotosResponseDataType = {
    photos: PhotosType
};

export const profileAPI = {
    getProfile(userId: number | null) {
        return axiosInstance
            .get<ProfileType>(`profile/${userId}`)
            .then((res) => res.data);
    },

    getStatus(userId: number | null) {
        return axiosInstance
            .get<string>(`profile/status/${userId}`)
            .then((res) => res.data);
    },

    updateStatus(status: string) {
        return axiosInstance
            .put<ResponseType>(`profile/status`, { status: status })
            .then((res) => res.data);
    },

    saveMainPhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return axiosInstance
            .put<ResponseType<SavePhotosResponseDataType>>(`profile/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.data);
    },

    saveProfile(profile: ProfileType) {
        return axiosInstance
            .put<ResponseType>(`profile`, profile)
            .then((res) => res.data);
    },
};
