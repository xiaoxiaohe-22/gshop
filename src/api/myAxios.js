import axios from "axios";
import qs from "qs"
import {Indicator} from 'mint-ui';
import store from "../vuex/store"
import {MessageBox} from 'mint-ui';
import router from "../router/Index"
//封装axios
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});


//请求拦截器
instance.interceptors.request.use(
    function (config) {//对post请求的参数进行urlencoded处理

        Indicator.open();//所有的请求之前我都要显示loading


        if (config.method.toLowerCase() === 'post') {//post请求的时候对参数进行urlencoded处理
            config.data = qs.stringify(config.data)
        }
//如果该请求是需要token的则我们就不用再去发送请求了... 那么如何判断该请求通过看请求头中是否有needCheck 来判断
        const {token} = store.state;
        if (token) {//如果有token则添加到请求头上面去
            config.headers['Authorization'] = token;
        } else {
            if (config.headers.needCheck) {
                if (!token) {
                    throw  new Error("未携带token")
                }
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    });

//相应拦截器
instance.interceptors.response.use(
    (response) => {
        Indicator.close();
        return response.data;
    },
    (error) => {
        Indicator.close();

        if (!error.response) {
            //说明才错误是因为没有携带token导致 而且该请求根本就没有发出去 也就不会有所谓的响应体数据
            MessageBox("提示", error.message);
            if (router.currentRoute.path !== "/login") {

                store.dispatch("logout")
                //跳转到登录页面
                router.replace("/login")

            }
        } else {

            if (error.response.status === 401) {
                MessageBox("提示", "登录已失效,请重新登录");
                //跳转到登录界面
                router.replace("/login")
            }else if(error.response.status === 404){
                MessageBox("提示", "访问的资源不存在");
            }
            else {
                alert(error.message);//统一处理异常,我这边是直接alert
            }
        }
        return new Promise(() => {
        });//终端promise链
    });


export default instance;


