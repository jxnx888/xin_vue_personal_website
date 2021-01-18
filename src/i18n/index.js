import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

// 引入各个语言配置文件
import zh_cn from './config/zh_cn';
import en_us from './config/en_us';

import {getLocalStore} from '../config/global'

// 创建vue-i18n实例i18n
const i18n = new VueI18n({
    // 设置默认语言
    locale: getLocalStore('locale') || 'en_us', // 语言标识
    // 添加多语言（每一个语言标示对应一个语言文件）
    messages: {
        zh_cn,
        en_us,
    }
})
// 暴露i18n
export default i18n;
