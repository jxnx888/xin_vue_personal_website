// 引入mutation-type
import {
    CURRENT_LANGUAGE
} from './mutation-type'

// 引入本地存储
import {
    getLocalStore,
} from '../config/global'
export default {
    // 注意:外界传值的参数一定要和定义的参数一致 例如 goodsID  isCheckedAll

    [CURRENT_LANGUAGE](state) {
        // 2.1 先存本地取购物车数据
        let language = getLocalStore('language') ||  'en_us';
        if (language) {
            // 2.1 如何购物车有数据那么就把它通过对象的方式赋值给store
            state.language = language;
        }
    },

}