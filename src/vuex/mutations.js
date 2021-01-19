/**
 * mutation.js state数据的修改操作
 * 仅有mutation中定义的函数方法，才有权利修改state中的数据
 * 引入mutation-types.js 操作里面定义的常用变量
 * 不能使用异步代码，例如setTimeout，如果异步，需要在action中来操作mutation
 * eg: addFn(state){
 *        state.count ++
 *    }
 * eg: addNFn(state,param){
 *        state.count += param
 *    }
 * 触发方式：
 * 1: this.$store.commit("add");
 * 2: this.$store.commit("add",param);
 */
import {
    CURRENT_LANGUAGE,
    RECRUIT_SCROLLY
} from './mutation-type'

// 引入本地存储
import {getLocalStore} from '../config/global'
export default {
    [CURRENT_LANGUAGE](state) {
        let language = getLocalStore('locale') ||  'en_us';
        if (language) {
            state.locale = language;
        }
    },
    [RECRUIT_SCROLLY](state,recruitScrollY) {
        state.recruitScrollY = recruitScrollY;
    },
    /*
    //方法可以这么写 调用该方法，在组件方法中 this.$store.commit('addFn') //commit 作用就是调用某个mutation
    addFn(state){
        state.count ++
    }
    //方法可以这么写 调用该方法，在组件方法中 this.$store.commit('addNFn',3)
    addNFn(state,step){
        state.count += step
    }*/
}
