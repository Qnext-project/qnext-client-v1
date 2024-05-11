import axios from "axios";

const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/",
    timeout: 60000,
});

instance.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Accept"] = "application/json";
        let token:any = "";
        if (typeof window !== "undefined") {
            token =localStorage.getItem("token");
        }
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("error in response of the request",error);

        return Promise.reject(error);
    }
);
export default instance;
