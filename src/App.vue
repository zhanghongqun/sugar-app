<template>
  <div id="app">
    <van-nav-bar title="淘淘客栈" left-text="返回" left-arrow @click-left="onClickLeft" />
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item route="true" to="/" icon="home-o">首页</van-tabbar-item>

      <van-tabbar-item route="true" to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    document.title = "淘淘客栈";
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
