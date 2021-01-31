//直接更新状态的多个方法对象
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,SAVE_USER,SAVE_TOKEN,REMOVE_TOKEN,REMOVE_USER} from  "./mutations_types"

export default {

    //清除user
    [REMOVE_USER](state){
        state.user = {};
    },

    //清除token
    [REMOVE_TOKEN](state){
        state.token = ""
    },
    //保存用户信息
    [SAVE_USER](state,userObj){
        state.user = userObj;
    },
    //保存token信息
    [SAVE_TOKEN](state,token){
        state.token = token;
    },

    //保存地址信息
    [RECEIVE_ADDRESS](state,AddressData){
        state.address = AddressData.AddressData
    },

    //更新食品分类信息
    [RECEIVE_CATEGORYS](state,data){
        state.categorys = data.categoryList
    } ,

    //更新商家分类信息
    [RECEIVE_SHOPS](state,data){
        state.shops = data.storeList;
    }

}


