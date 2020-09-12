<template>
  <div></div>
</template>


<script>
import { getCustomerByCode, getCustomerById } from "@/api/customer";
import { getJsConfig } from "@/api/wx";
import wx from "weixin-js-sdk";
import { Col } from "vant";
import { jumpToStep } from "@/utils/redirect";
export default {
  created() {
    if (!sessionStorage.getItem("session")) {
      this.auth();
    } else {
      jumpToStep();
      //   getCustomerById(JSON.parse(sessionStorage.getItem("session")).id).then(
      //     res => {

      //     }
      //   );
    }
  },
  methods: {
    getUrlParam(id) {
      let reg = new RegExp("(^|&)" + id + "=([^&]*)(&|$)");
      let target = window.location.search.substr(1).match(reg);
      if (target != null) {
        return unescape(target[2]);
      }
      return null;
    },
    auth() {
      //this.initWxConfig();
      const redirectURL = encodeURI("http://app.sugar3.shop");
      let code = this.getUrlParam("code");
      if (code == null) {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa348ffc7dc8eabeb" +
          "&redirect_uri=" +
          redirectURL +
          "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      } else {
        getCustomerByCode(code).then(res => {
          this.$store.commit("setSession", res);
          jumpToStep();
        });
      }
    }
  }
};
</script>