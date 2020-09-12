<template>
  <div>
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg"/>
        </van-swipe-item>
        <van-swipe-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-steps direction="vertical" :active="3">
        <van-step>验证账户</van-step>
        <van-step>提交订单,系统审核订单</van-step>
        <van-step>发赠品,收货后返款</van-step>
      </van-steps>
    </div>
    <div>
      <van-row type="flex" justify="center" gutter=20>
        <van-col>
          <van-uploader :after-read="afterRead" />
        </van-col>
        <van-col>
          <van-uploader :after-read="afterRead" />
        </van-col>
      </van-row>
    </div>
    <div>
      <van-row type="flex" justify="center" gutter="20">
        <van-col><van-button type="primary">提交验证</van-button></van-col>
        <van-col><van-button type="default">放弃任务</van-button></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    };
  }
};
</script>
<style scoped>
</style>