import {
    axiosInstance,
    GetItemsType,
    ResponseType,
} from "./api";

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return axiosInstance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then((res) => res.data);
    },

    follow(userId: number) {
        return axiosInstance
            .post<ResponseType>(`follow/${userId}`)
            .then((res) => res.data);
    },

    unFollow(userId: number) {
        return axiosInstance
            .delete(`follow/${userId}`)
            .then((res) => res.data) as Promise<ResponseType>
    },
};
