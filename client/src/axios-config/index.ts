import axios, {AxiosInstance, AxiosRequestConfig } from 'axios'

let token = localStorage.getItem('token')
const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000',
};
if(token){
    config.headers = {'Authorization': 'Bearer ' + JSON.parse(token)}
}

const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.response.use(
    (response) =>
         new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

        if (error.response.status === 401) {
            localStorage.removeItem("token");

            // if (history) {
            //     history.push("/");
            // } else {
                window.location.pathname = "/";
            // }
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);

export {axiosInstance}
