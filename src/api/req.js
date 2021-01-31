

//这里定义所有发请求的接口
import instance from "./myAxios";

//根据经纬度获取位置详情
export const reqAddress = (geohash)=> instance("/position/"+geohash);

//获取食品分类列表  需要携带token
export const reqFoodCategoryList = ()=> instance.get("/index_category",{
    headers:{
        needCheck:true
    }
});

//根据经纬度获取商铺列表  需要鞋带token
export const reqStoreList = ({latitude,longitude})=>
    instance.get('/shops',{
        params:{
            latitude,
            longitude
        },
        headers:{
            needCheck:true
        }
    });

//根据经纬度和关键字搜索商铺列表
export const reqStoreListByKeyword = ({geohash,keyword})=> instance(`/search_shops?keyword=${keyword}&geohash=${geohash}`);

//发送短信验证码
export const reqSmsCode = (phone)=> instance(`/sendcode?phone=${phone}`);

//短信验证码登录
export const reqLoginBySms = ({phone,code})=> instance.post(`/login_sms`,{phone,code});

//用户名密码登录
export const reqLoginByPwd = ({name,pwd,captcha})=> instance.post(`/login_pwd`,{name,pwd,captcha});

//自动登录
export const reqAutoLogin = () => instance.get("/auto_login");
