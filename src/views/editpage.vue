<template>
  <div>
    <Wrap></Wrap>
    <Title title="编辑资料"></Title>
    <div class="content">
      <img
        v-if="userInfo.head_img"
        :src="baseURL + userInfo.head_img"
        alt=""
        class="avatar"
      />
      <img v-else src="../assets/meinv.jpeg" alt="" class="avatar" />
    </div>
    <UserInfo
      title="昵称"
      :text="userInfo.nickname || userInfo.username"
    ></UserInfo>
    <UserInfo title="密码" :text="userInfo.password"></UserInfo>
    <UserInfo title="性别" v-if="userInfo.gender" text="男"></UserInfo>
    <UserInfo title="性别" v-else text="女"></UserInfo>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
import Title from "../components/title.vue";
import UserInfo from "../components/userInfo.vue";
export default {
  components: { Wrap, Title, UserInfo },
  data() {
    return {
      baseURL: "http://localhost:3000",
      userInfo: {},
    };
  },
  methods: {},
  created() {
    const Authorization = localStorage.getItem("token");
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "http://localhost:3000/user/" + localStorage.getItem("userId"),
      headers: { Authorization },
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      const { message, data } = res.data;
      if (message === "获取成功") {
        this.userInfo = data;
        const password = this.userInfo.password;
        this.userInfo.password = password.replace(password, "******");
      }
    });
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 40 /360 * 100vw;
  height: 120 /360 * 100vw;
  text-align: center;
  .avatar {
    width: 70 /360 * 100vw;
    height: 70 /360 * 100vw;
    border-radius: 50%;
  }
}
</style>