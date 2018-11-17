import axios from 'axios';
import router from './router';

// 请求拦截
axios.interceptors.request.use(
    config => {
        if (localStorage.xwToken) {
          config.headers.Authorization = localStorage.xwToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 错误提醒
        const { status } = error.response;
        if (status == 401) {
            alert('token过期, 请重新登录!');
            // 清楚token
            localStorage.removeItem("xwToken");
            // 页面跳转
            router.push('/login');
        } else {
            alert(error.response.data);
        }
        return Promise.reject(error);
    }
);


export default axios;