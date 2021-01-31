
//初始的状态数据
export default {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
    user:{},  //用户信息
    token:localStorage.getItem("token_key") || "",//初始赋值直接从localstorage里面获取
}
