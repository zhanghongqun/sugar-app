<template>
  <div>
    <div></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card class="card" v-for="item in list" :key="item.id" :thumb="item.introducePic">
        <div style="text-align:left" slot="title">
          <p>
            <span style="font-weight:bold">任务要求:</span>
            {{item.description}}
          </p>
          <p>
            <span style="font-weight:bold">您将收获:</span>
            {{item.reward}}
          </p>
          <p>
            <span style="font-weight:bold">返现金额:</span>
          </p>
        </div>

        <div slot="footer">
          <van-button
            v-show="audit==false"
            size="small"
            @click="receive(item.id)"
            type="primary"
          >立即领取</van-button>
          <van-button v-show="audit==true" size="small" type="primary">审核中</van-button>
        </div>
      </van-card>
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    </van-list>
  </div>
</template>
<style>
p {
  margin: 0 0;
}
body {
  font-family: Helvetica;
}
</style>
<script>
import { fetchList, receiveTask } from "@/api/task";
import { getJsConfig } from "@/api/wx";
import { jumpToStep } from "@/utils/redirect";
import wx from "weixin-js-sdk";
import { Dialog } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      networkType: "",
      audit: false
    };
  },
  created() {
     jumpToStep()
  },
  computed: {},
  methods: {
    receive(id) {
      let self = this;
      wx.getNetworkType({
        success: function(res) {
          if (res.networkType === "wifi") {
            Dialog({ message: "请在移动网络中接受任务" });
            return;
          }
          let customerId = self.$store.getters.session.id;
          //获取当前用户的唯一ID
          receiveTask(customerId, id).then(res => {
            let session = self.$store.getters.session;
            session.process = res;
            self.$store.commit("setSession", session);
            self.$router.push({
              name: "SubmitIdentify",
              params: { taskId: id }
            });
          });
        }
      });
    },

    onLoad() {
      let customerId = this.$store.getters.session.id;
      fetchList(customerId).then(res => {
        console.log(res[0])
        if (res.length > 0 && res[0].processStatus === 20) {
          this.audit = true;
        }
        this.list = res;
        this.finished = true;
      });
    }
  }
};
</script>

<style scoped>
</style>