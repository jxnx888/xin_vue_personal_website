/**
 * getters.js  顾名思义 取用，不做修改
 */
import {
    CURRENT_LANGUAGE,
    RECRUIT_SCROLLY
} from "./mutation-type";

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
    }
}
