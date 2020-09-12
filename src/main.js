import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from 'vant';
import 'vant/lib/index.css';

import wx from 'weixin-js-sdk'

Vue.use(Vant);

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
  created: function () {
    // let session =localStorage.getItem('session')
    // if (session != null) {
    //   this.$store.commit('setSession',  JSON.parse(session))
    // }
  }
}).$mount("#app");
