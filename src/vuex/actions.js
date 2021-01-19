/**
 * action.js  调用mutation方法对数据进行操作
 * 这里可以对数据进行一些复杂的操作，对mutation中的多个数据可以同时操作，而mutation中只是简单的数据操作
 * mutation中不能使用异步操作，所以可以在action中触发mutation来实现异步操作
 * 在action中，不能直接修改state中的数据，必须通过context.commit 来触发某个mutation才能修改
 * eg: addAsync(context){ //context 相当于store实例
 *     setTimeout(()=>{
 *         context.commit("add“)
 *     },1000)
 * }
 * eg: addAsync(context,param){ //context 相当于store实例
 *     setTimeout(()=>{
 *         context.commit("add“,param)
 *     },1000)
 * }
 * 触发方式：
 * 1: this.$store.dispatch("addAsync")
 * 2: this.$store.dispatch("addAsync",param)
 */
/*import {
    USER_INFO
} from './mutation-type'
import {
    getLocalStore,
    setLocalStore
} from './../config/global'*/

export default {

   /* // 1.同步用户信息
    syncuserInfo({
        commit,
    }, userInfo) {
        commit(USER_INFO, {
            userInfo
        });
    },
    // 2.如果本地存在Token 那么就自动登录
    autoLogin({
        commit
    }) {
        // 2.1 从本地获取
        let userInfo = getLocalStore('userInfo');
        if (userInfo) {
            commit(USER_INFO, {
                userInfo
            });
        }
    },
    setLanguage({
        commit
    }, language) {
        commit("SET_LANGUAGE", language);
    }*/
}
