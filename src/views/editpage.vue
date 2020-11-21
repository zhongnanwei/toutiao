<template>
  <div>
    <Wrap></Wrap>
    <Title title="编辑资料"></Title>
    <div class="content">
      <img
        v-if="userInfo.head_img"
        :src="$axios.defaults.baseURL + userInfo.head_img"
        alt=""
        class="avatar"
      />
      <img v-else src="../assets/meinv.jpeg" alt="" class="avatar" />
    </div>
    <UserInfo
      title="昵称"
      :text="userInfo.nickname"
      @click.native="
        showNickName = true;
        value = userInfo.nickname;
      "
    ></UserInfo>
    <UserInfo
      title="密码"
      text="******"
      @click.native="showPassword = true"
    ></UserInfo>
    <UserInfo
      title="性别"
      :text="userInfo.gender == 1 ? '男' : '女'"
      @click.native="showGender = true"
    ></UserInfo>

    <van-dialog
      v-model="showNickName"
      title="修改昵称"
      show-cancel-button
      @confirm="setUserInfo('nickname')"
    >
      <van-field v-model="value" placeholder="请输入昵称" />
    </van-dialog>

    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="setUserInfo('password')"
    >
      <van-field v-model="value" placeholder="请输入密码" type="password" />
    </van-dialog>

    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="setUserInfo('gender')"
    />
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
      userInfo: {},
      showNickName: false,
      showPassword: false,
      showGender: false,
      actions: [{ name: "男" }, { name: "女" }],
      value: "",
    };
  },
  methods: {
    getUserInfo() {
      const Authorization = localStorage.getItem("token");
      // axios 使用方式
      this.$axios({
        method: "get",
        url: "/user/" + localStorage.getItem("userId"),
        headers: { Authorization },
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        const { message, data } = res.data;
        if (message === "获取成功") this.userInfo = data;
      });
    },
    setUserInfo(userInfo) {
      const Authorization = localStorage.getItem("token");
      // axios 使用方式
      this.$axios({
        method: "post",
        url: "/user_update/" + localStorage.getItem("userId"),
        headers: { Authorization },
        data: {
          [userInfo]: this.value,
        },
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        console.log(res);
        this.getUserInfo();
      });
    },
  },
  created() {
    this.getUserInfo();
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