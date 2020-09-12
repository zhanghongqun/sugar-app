<template>
  <div style="overflow:scroll;">
    <div>
      <p class="tishi">友情提示:</p>
      <ul>
        <li>1.审核通过，请付款，平台会安排发货，收到后，五星好评即可。</li>
        <li>2.审核失败在个人中心会显示订单关闭，请放弃任务，重新接活动。</li>
        <li>3.审核失败，且已经付款，请放弃任务，并立即申请退款，审核失败的不会返款。</li>
        <li>4.提交订单后进入审核，禁止重拍，重拍无效。</li>
        <li>5.收到产品后，确认收货，24小时内系统自动返款到微信零钱。</li>
      </ul>
    </div>
    <div>
      <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="1"></van-uploader>
    </div>

    <div style="margin-top:10px">
      <van-button type="primary" @click="submitOrderPic">上传订单</van-button>
    </div>

    <div style="margin-top:10px">
      <van-button type="default" @click="abandon">放弃任务</van-button>
    </div>

    <div style="margin-bottom:130px"></div>
  </div>
</template>
<script>
import { fetchTask, submitProcess } from "@/api/task";
import { upload } from "@/api/file";
import { Dialog } from "vant";
export default {
  data() {
    return { task: {}, fileList: [], url: "" };
  },
  created() {
    fetchTask(this.$route.params.taskId).then(res => {
      this.task = res;
      console.log(this.task);
    });
  },
  methods: {
    abandon() {
      let session = this.$store.getters.session;
      abandon(session.id, session.process.id).then(res => {
        session.process = null;
        this.$store.commit("setSession", session);
        this.$router.push({
          name: "/",
          params: {}
        });
      });
    },
    submitOrderPic() {
      let submitParams = {};
      submitParams.customerId = this.$store.getters.session.id;
      submitParams.orderPic = this.url;
      if (submitParams.orderPic === "") {
        Dialog({ message: "请上传有效的订单图片" });
        return;
      }
      submitProcess(submitParams).then(res => {
        this.$router.push({
          name: "Home",
          params: {}
        });
      });
    },
    afterRead(file) {
      const data = new FormData();
      data.append("file", file.file);
      file.status='uploading'
      upload(data).then(res => {
        console.log("图片 "+res)
         file.status='done'
        this.url = res;
      });
    },
    onCopy(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
div {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 10px;
}
p {
  margin-top: 10px;
  margin-bottom: 10px;
}
.tips {
  text-align: center;
  border: 1px solid #f2f2f2;
  border-radius: 25px;
  background: #ffffff;
}

ul {
  text-align: left;
  line-height: 22px;
}

.tishi {
  text-align: left;
  color: red;
}
</style>