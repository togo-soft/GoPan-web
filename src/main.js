// dependencies
import jQuery from 'jquery'
window.jQuery = jQuery;
window.$ = jQuery;

// core
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// theme
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

// addition
import Axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlightjs'
import VueClipboard from 'vue-clipboard2'

// use plugins
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

Vue.config.productionTip = false;
Vue.prototype.$ajax = Axios;
Vue.prototype.client = 'http://192.168.3.7:8080'; // 本(客户端)服务地址
Vue.prototype.server = 'http://192.168.3.23:7125'; // 服务端地址
Vue.prototype.storage = 'http://192.168.3.23:8080'; //存储服务器地址

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
