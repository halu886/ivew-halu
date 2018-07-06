import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import axios from 'axios';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';

axios.defaults.baseURL = 'http://halu886.cn:8080/PDCAProject/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.interceptors.response.use((response) => {
    // console.log(21);
    return response;
}, (e) => {
    let state = e.response ? e.response.status || '' : '';
    let name = '';
    if (state === 500) {
        name = 'error-500';
    } else if (state === 403) {
        name = 'error-403';
    } else if (state === 401) {
        name = 'error-401';
    } else if (state === 404) {
        name = 'error-404';
    }
    if (name) {
        vue.$router.push({
            name: name
        });
        return Promise.reject(e);
    }
    return Promise.reject(e);
});
Vue.prototype.$axios = axios;
Vue.use(VueI18n);
Vue.use(iView);
// Vue.use('/api')

let vue = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
