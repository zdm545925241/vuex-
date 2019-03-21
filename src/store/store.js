import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shopList: [],
    },
    mutations: {
        changeList(state, str) {
            state.shopList = str
        },
        deleteList(state, index) {
            state.shopList.splice(index, 1);
        },
        updateList(state, data) {
            //index为操作第几个元素，key为要改变的key,value为新的值 
            const { index, key, value } = data;
            state.shopList[index][key] = value;
        }
    },
    ations: {
        getUpdateList(context, str) {
            context('updateList', str);
        }
    }
})