import {
    axiosInstance,
    ResultCodeForCaptchaEnum,
    ResultCodesEnum,
    ResponseType
} from "./api";

type GetAuthDataType = {
    id: number;
    email: string;
    login: string;
};

type LoginDataType = {
    userId: number;
};

export const authAPI = {
    getAuth() {
        return axiosInstance
            .get<ResponseType<GetAuthDataType>>(`auth/me`)
            .then((res) => res.data);
    },
    login(
        email: string,
        password: string,
        rememberMe = false,
        captcha: null | string = null
    ) {
        return axiosInstance
            .post<ResponseType<LoginDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then((res) => res.data);
    },
    logout() {
        return axiosInstance
            .delete<ResponseType>(`auth/login`)
            .then((res) => res.data);
    },
};
