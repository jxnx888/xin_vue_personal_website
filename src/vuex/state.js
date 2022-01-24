/**
 * state.js 相当于数据库
 * 定义了应用数据结构，一些数据的初始状态
 */
// 引入本地存储
import {getLocalStore} from '../config/global'

export default {
    locale: getLocalStore('locale') || 'en_us', // 语言标识
    recruitScrollY:0, //默认滚动距离
    mobileDrawerOpened: false
}
