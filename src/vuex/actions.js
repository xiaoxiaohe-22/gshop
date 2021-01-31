import {reqAddress, reqFoodCategoryList, reqStoreList, reqAutoLogin} from "@/api/req"
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, SAVE_TOKEN, SAVE_USER,REMOVE_TOKEN,REMOVE_USER} from "./mutations_types"


export default {


    //清除数据 退出登录
    async logout({commit}) {
         localStorage.removeItem("token_key");
         commit(REMOVE_TOKEN)
         commit(REMOVE_USER)

    },

    //自动登录请求
    async autoLogin({commit, state}) {
        const {user, token} = state;
        //发送自动登录的前提是 有token同时没有user
        if (token && !user.id) {
            const result = await reqAutoLogin();
            if (result.code === 0) {
                commit(SAVE_USER, result.data)
            }
        }

    },

    [SAVE_USER]({commit}, user) {//保存token和user
        const {token} = user;
        localStorage.setItem("token_key", token);
        commit(SAVE_TOKEN, token);
        //因为token已经单独保存了,所以user里面就不需要token了
        delete user.token;
        commit(SAVE_USER, user);

    },
    //更新地址的方法
    async [RECEIVE_ADDRESS]({commit, state}) {
        const {latitude, longitude} = state;
        const result = await reqAddress(latitude + "," + longitude);
        if (result.code === 0) {
            commit(RECEIVE_ADDRESS, {AddressData: result.data})
        }
    },

    //更新地址的方法
    async [RECEIVE_CATEGORYS]({commit}) {

        const result = await reqFoodCategoryList();
        if (result.code === 0) {
            commit(RECEIVE_CATEGORYS, {categoryList: result.data})
        }
    },

    //更新商家列表的方法
    async [RECEIVE_SHOPS]({commit, state}) {
        const {latitude, longitude} = state;
        const result = await reqStoreList({latitude, longitude});
        if (result.code === 0) {
            commit(RECEIVE_SHOPS, {storeList: result.data})
        }
    }


}