import {
    CURRENT_LANGUAGE
} from "./mutation-type";

// 引入本地存储
import {
    getLocalStore,
    // setLocalStore,
    // removeLocalStore
} from '../config/global'

export default {
    // 1. 当前的全局语言参数
    [CURRENT_LANGUAGE](state){
        let current_lang = state.language || getLocalStore('locale') || 'en_us' ;
        return current_lang;
    }
}
