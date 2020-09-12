<template>
     <div>
      <van-tabs v-model="activeName">
        <van-tab title="天猫淘宝" name="a">
          <van-sticky>
            <div class="m-header">
              <van-row type="flex">
                <van-col span="8">
                  <span>返款时间</span>
                </van-col>
                <van-col span="8">
                  <span>订单ID</span>
                </van-col>
                <van-col span="8">
                  <span>返款金额</span>
                </van-col>
              </van-row>
            </div>
          </van-sticky>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row class="row-border" v-for="item in list" :key="item">
              <van-col span="8">
                <span>2020-12-12</span>
              </van-col>
              <van-col span="8">
                <span>20201020</span>
              </van-col>
              <van-col span="8">
                <span>100</span>
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
     
    }
  }
};
</script>
<style scoped>
.m-header {
  height: 50px;
  line-height: 50px;
  background: #07C160;
  color: #fff;
}
.row-border {
  border-bottom: 1px solid #eee;
  line-height: 35px;
}
</style>