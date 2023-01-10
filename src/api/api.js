import axios from "axios";

// const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

// axios instance
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "e79465c0-a085-445a-b2a1-0ae7b0126e40",
    },
});

// export const getUsers = (currentPage, pageSize) => {
/// without instance
//   return axios
//       .get(`${baseUrl}users?page=${currentPage}&count=${pageSize}`, {
//           //for cross-domain request
//           withCredentials: true,
//       })
//       .then((res) => res.data);

/// with instance
//     return axiosInstance
//         .get(`users?page=${currentPage}&count=${pageSize}`)
//         .then((res) => res.data);
// };

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return axiosInstance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((res) => res.data);
    },

    follow(userId) {
        return axiosInstance.post(`follow/${userId}`).then((res) => res.data);
    },
    unFollow(userId) {
        return axiosInstance.delete(`follow/${userId}`).then((res) => res.data);
    },
};

export const authAPI = {
    getAuth() {
        return axiosInstance.get(`auth/me`).then((res) => res.data);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return axiosInstance.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        });
    },
    logout() {
        return axiosInstance.delete(`auth/login`);
    },
};

export const profileAPI = {
    getProfile(userId) {
        return axiosInstance.get(`profile/${userId}`).then((res) => res.data);
    },

    getStatus(userId) {
        return axiosInstance
            .get(`profile/status/${userId}`)
            .then((res) => res.data);
    },

    updateStatus(status) {
        return axiosInstance.put(`profile/status`, { status: status });
    },

    saveMainPhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return axiosInstance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    saveProfile(profile) {
        return axiosInstance.put(`profile`, profile);
    },
};

export const securityAPI = {
    getCaptchaUrl() {
        return axiosInstance.get(`security/get-captcha-url`);
    },
};
