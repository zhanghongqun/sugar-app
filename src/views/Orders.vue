<template>
  <div>
    <van-tabs v-model="activeName">
      <van-tab title="天猫淘宝" name="a">
        <van-sticky>
          <div class="m-header">
            <van-row type="flex">
              <van-col span="6">
                <span>领取时间</span>
              </van-col>
              <van-col span="6">
                <span>奖励</span>
              </van-col>
              <van-col span="6">
                <span>订单状态</span>
              </van-col>
              <van-col span="6">
                <span>返款状态</span>
              </van-col>
            </van-row>
          </div>
        </van-sticky>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-row class="row-border" v-for="item in list" :key="item">
            <van-col span="6">
              <span>{{item.create}}</span>
            </van-col>
            <van-col span="6">
              <span>{{item.reward}}</span>
            </van-col>
            <van-col span="6">
              <span>{{item.status}}</span>
            </van-col>
            <van-col span="6">
              <span>{{item.refundStatus}}</span>
            </van-col>
          </van-row>
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        </van-list>
      </van-tab>
      <!-- <van-tab title="京东" name="b">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import { orders } from "@/api/task";
export default {
  data() {
    return {
      activeName: "a",
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let customer=this.$store.getters.session.id
      orders(customer).then(res => {
        console.log(res)
        this.list = res;
        this.loading = false;
        this.finished = true;
      });
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  }
};
</script>

<style scoped>
.m-header {
  height: 50px;
  line-height: 50px;
  background:#07C160;
  color: #fff;
}
.row-border {
  border-bottom: 1px solid #eee;
  line-height: 35px;
}
</style>