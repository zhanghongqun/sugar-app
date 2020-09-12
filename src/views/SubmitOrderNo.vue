<template>
  <div style="overflow:scroll;">
    <div>
      <van-row type="flex" justify="center" gutter="10">
        <van-col span="12">
          <van-field placeholder="康丰按摩椅" v-model="task.searchKeyword" />
        </van-col>
        <van-col>
          <van-button
            type="primary"
            v-clipboard:copy="task.searchKeyword"
            v-clipboard:success="onCopy"
          >点击复制</van-button>
        </van-col>
      </van-row>
    </div>
    <div style="text-align:left;">
      <p style="color:darkgray">1. 复制关键词后,打开手机淘宝搜索关键词，找到下面的宝贝,并加入购物车</p>
    </div>
    <div>
      <van-image v-bind:src="task.productPic" />
    </div>
    <div style="text-align:left;">
      <p style="color:darkgray">2. 参照下图,核对订单产品和订单金额</p>
    </div>
    <div>
      <van-image v-bind:src="task.orderPic" />
    </div>
    <div style="text-align:left;">
      <p style="color:darkgray">3. 确认后,留言XX,提交订单,不要付款</p>
    </div>
    <div>
      <van-row type="flex" justify="center" gutter="10">
        <van-col span="11">
          <van-field placeholder="请输入订单编号" v-model="orderNo" />
        </van-col>
        <van-col>
          <van-button type="primary" @click="submitOrderNo">提交订单</van-button>
        </van-col>
      </van-row>
    </div>
    <div style="text-align:left;">
      <p style="color:darkgray">4. 提交订单后,系统将会审核您的订单</p>
    </div>

    <div class="tips">
      <p class="tishi">友情提示:</p>
      <ul>
        <li>1. 下单禁止使用优惠券,付款金额要和任务一直</li>
        <li>2. XX为赠品编号,具体编号请查看赠品列表</li>
        <li>3. 确定留言后再下单,无留言会随机发送赠品</li>
        <li>4. 拍下后,请立即复制订单号,进行上面的提交</li>
        <li>5. 订单提交后禁止重拍,重拍无效</li>
      </ul>
    </div>
    <div>
      <van-button type="default" @click="abandon">放弃任务</van-button>
    </div>
    <div style="margin-bottom:130px"></div>
  </div>
</template>
<script>
import { fetchTask, abandon, submitProcess } from "@/api/task";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      task: { searchKeyword: "" },
      orderNo: ""
    };
  },
  computed: {},
  created() {
    fetchTask(this.$route.params.taskId).then(res => {
      let session = this.$store.getters.session;
      this.task = res;
    });
  },
  methods: {
    abandon() {
      let session = this.$store.getters.session;
      abandon(session.id, session.process.id).then(res => {
        session.process = null;
        this.$store.commit("setSession", session);
        this.$router.push({
          name: "Home",
          params: {}
        });
      });
    },
    submitOrderNo() {
      let submitParams = {};
      let session = this.$store.getters.session;

      submitParams.orderNo = this.orderNo;
      submitParams.customerId = session.id;
      if (!this.orderNo) {
        Dialog({ message: "请填写有效的订单号" });
        return
      }
      submitProcess(submitParams).then(res => {

        this.$router.push({
          name: "SubmitOrderPic",
          params: { taskId: this.$route.params.taskId }
        });
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
  text-align: left;
  border: 1px solid #f2f2f2;
  border-radius: 25px;
  background: #ffffff;
}
.tishi {
  text-align: left;
  color: red;
}
</style>