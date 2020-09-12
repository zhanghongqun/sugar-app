<template>
  <div>
    <div class="card">
      <van-row style="margin-top:15px"></van-row>
      <van-row type="flex" align="center">
        <van-col span="6">
          <van-image width="50" height="50" round v-bind:src="customerHeadImg" />
        </van-col>
        <van-col>
          <van-row>
            <van-col>
              <span style="font-weight:bold;font-size:16px">{{customer.name}}</span>
            </van-col>
          </van-row>
          <van-row gutter="3">
            <van-col>
              <van-tag type="success">积分:{{customer.point}}</van-tag>
            </van-col>
            <van-col>
              <van-tag type="success">任务数:{{customer.taskCount}}</van-tag>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div class="card">
      <van-grid :column-num="3">
        <van-grid-item icon="photo-o" text="我的任务" @click="toHome" />
        <van-grid-item icon="photo-o" text="订单记录" to="/orders" />
        <van-grid-item icon="photo-o" text="返款记录" to="/refunds" />
      </van-grid>
    </div>

    <van-button style="margin-top:10px" type="primary">确认收货10分钟后,点击申请返款</van-button>

    <div class="tips">
      <p class="tishi">友情提示:</p>
      <ul>
        <li>1. 首次参与活动将自动绑定账户</li>
        <li>2. 务必使用绑定账户参与活动，负责自动拉黑</li>
        <li>3. 禁止提前确认收货,否则自动拉黑</li>
        <li>4. 货品签收后10分钟点击按钮确认收货</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { orders } from "@/api/task";

import { getCustomerById } from "@/api/customer";
import { jumpToStep } from "@/utils/redirect";
export default {
  data() {
    return {
      customer: {}
    };
  },
  computed: {
    customerHeadImg() {
      return this.$store.getters.session.headImage;
    }
  },
  methods: {
    toHome() {
      this.$router.push({
        name: "Home",
        params: {}
      });
    }
  },
  created() {
    getCustomerById(this.$store.getters.session.id).then(res => {
      this.customer = res;
      this.$store.commit("setSession", res);
    });
  }
};
</script>


<style scoped>
.tips {
  padding-left: 20px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 20px;
  text-align: left;
  border: 1px solid #f2f2f2;
  border-radius: 25px;
  background: #ffffff;
  font-size: 11px;
}

.card {
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 5px;
  text-align: center;
  border: 1px solid #f2f2f2;
  border-radius: 25px;
  background: #ffffff;
  font-size: 11px;
}

.tishi {
  text-align: left;
  color: red;
}
</style>