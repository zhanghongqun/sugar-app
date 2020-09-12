import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Orders from "../views/Orders.vue";
import Refunds from "../views/Refunds.vue";
import Verfiy from "../views/Verify.vue";
import SubmitOrderNo from "../views/SubmitOrderNo.vue";
import SubmitOrderPic from "../views/SubmitOrderPic.vue";
import SubmitIdentify from "../views/SubmitIdentify.vue";
import Author from "../views/Author.vue";
import { getJsConfig } from "@/api/wx";
import store from "../store";
import wx from "weixin-js-sdk";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/mine",
    name: "Mine",
    component: () =>
      import("../views/Mine.vue")
  },
  {
    path: "/auth",
    name: "Author",
    component: Author
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders
  },
  {
    path: "/refunds",
    name: "Refunds",
    component: Refunds
  },
  {
    path: "/verify",
    name: "Verfiy",
    component: Verfiy
  },
  {
    path: "/submitorderno",
    name: "SubmitOrderNo",
    component: SubmitOrderNo
  },
  {
    path: "/submitorderpic",
    name: "SubmitOrderPic",
    component: SubmitOrderPic
  },
  {
    path: "/submitidentify",
    name: "SubmitIdentify",
    component: SubmitIdentify
  }
];


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  routes
});




router.beforeEach((to, form, next) => {
  //   next()


  if (to.path == '/auth' && store.state.session.id) {
    next('/Home')
  }
  if (to.path == '/auth' && !store.state.session.id) {
    next()
  }
  if (store.state.session.id) {
    next();
  }
  else {
    next("/auth")
  }
})


/*
JSSDK 签名
*/
router.afterEach(to => {
  let url = window.location.href.split("#")[0];
  getJsConfig(url).then(res => {
    wx.config({
      //debug: true,
      appId: res.appid,
      nonceStr: res.nonceStr,
      signature: res.signature,
      timestamp: res.timestamp,
      jsApiList: ["getLocation", "hideAllNonBaseMenuItem", "getNetworkType"]
    });
    // wx.getLocation({
    //   type: "wgs84",
    //   success: function(res) {
    //     var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //     var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //     var speed = res.speed; // 速度，以米/每秒计
    //     var accuracy = res.accuracy; // 位置精度
    //   }
    // });
    // wx.hideAllNonBaseMenuItem();
  });

})
export default router;
