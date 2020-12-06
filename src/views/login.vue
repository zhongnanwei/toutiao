<template>
  <el-row type="flex" justify="center" align="middle" class="wrapper">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            //触发条件
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名不得少于3位",
            //触发条件
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            //触发条件
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        method: "post",
        url: "/login",
        data: this.form,
      }).then((res) => {
        console.log(res);
        if (res.data.message == "登录成功") {
          this.$message.success("登录成功");
          localStorage.setItem("token", res.data.data.token);
          this.$router.push("/article");
        }
      });
    },
    reset() {
      (this.form.username = ""), (this.form.password = "");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  background: url(../assets/nice.jpg) 0 0 ~"/" 100% 100%;
}
</style>