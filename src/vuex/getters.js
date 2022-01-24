/**
 * getters.js  顾名思义 取用,包装作用，不做修改
 * 1. 用于对store中的数据进行加工处理，形成新的数据。
 * 2. store中数据发生变化，getter的数据也会跟着变化
 * eg: showNum(state){
 *     return '当前最新的数量是【‘+state.count+’】'
 * }
 */
import {
    CURRENT_LANGUAGE, MOBILE_DRAWER_OPENED,
    RECRUIT_SCROLLY
} from './mutation-type'

// 引入本地存储
import {getLocalStore} from '../config/global'

export default {
    // 1. 当前的全局语言参数
    [CURRENT_LANGUAGE](state){
        let current_lang = state.locale || getLocalStore('locale') || 'en_us' ;
        return current_lang;
    },
    // 2. 当前的全局语言参数
    [RECRUIT_SCROLLY](state){
        let scrolly = state.recruitScrollY || 0;
        return scrolly;
    },
    // 3. 移动端菜单是否打开
    [MOBILE_DRAWER_OPENED](state){
        let mobileDrawerOpened = state.mobileDrawerOpened || false;
        return mobileDrawerOpened;
    }
}
