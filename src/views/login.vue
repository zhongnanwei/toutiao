<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <InputBar
      type="text"
      placeholder="用户名"
      :pattern="/^.{6}$/"
      errMsg="请输入正确用户名(6位字母，数字或者文字)"
      @setValue="setUserName"
    ></InputBar>
    <InputBar
      type="password"
      placeholder="密码"
      :pattern="/^\d{6,12}$/"
      errMsg="请输入合法密码(6-12位数字)"
      @setValue="setPassword"
    ></InputBar>
    <div class="btnSubmit">
      <button @click="login">登录</button>
    </div>
    <router-link class="register" to="register">
      还没账号啊? 赶紧去注册一个吧
    </router-link>
  </div>
</template>

<script>
import InputBar from "../components/inputBar.vue";
export default {
  components: { InputBar },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    setUserName(newVal) {
      this.username = newVal;
    },
    setPassword(newVal) {
      this.password = newVal;
    },
    login() {
      // axios 使用方式
      this.$axios({
        method: "post",
        url: "/login",
        // jq 的 type 变成了 method
        data: {
          username: this.username,
          password: this.password,
        },
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        console.log(res);
        if (res.data.message === "登录成功") {
          this.$toast.success(res.data.message);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userId", res.data.data.user.id);
          this.$router.replace({ path: "/personal" });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 24/360 * 100vw;
}
.btnClose {
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
    line-height: 48/360 * 100vw;
    font-size: 18/360 * 100vw;
    margin-bottom: 30 /360 * 100vw;
    background: #cc3300;
    color: white;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
  }
}
.register {
  margin-left: 65 /360 * 100vw;
  color: #cc3300;
  font-size: 12/360 * 100vw;
}
</style>