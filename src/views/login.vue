<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <InputBar type="text" placeholder="用户名 / 手机号码"></InputBar>
    <InputBar type="password" placeholder="密码"></InputBar>
    <div class="btnSubmit">
      <button>登录</button>
    </div>
    <Wrap></Wrap>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
import InputBar from "../components/inputBar.vue";
export default {
  components: { Wrap, InputBar },
};
</script>

<style lang="less" scoped>
.container {
  padding: 24/360 * 100vw;
}
.btnClose {
  margin-top: 24/360 * 100vw;
  .iconfont {
    font-size: 28/360 * 100vw;
  }
}
.logo {
  text-align: center;
  .iconfont {
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}
.btnSubmit {
  padding-top: 26/360 * 100vw;
  button {
    width: 100%;
    // height: 48/360*100vw;
    line-height: 48/360 * 100vw;
    font-size: 18/360 * 100vw;
    background: #cc3300;
    color: white;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
  }
}
</style>