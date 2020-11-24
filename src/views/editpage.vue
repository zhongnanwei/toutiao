<template>
  <div>
    <Title title="编辑资料"></Title>
    <div class="content">
      <van-uploader :after-read="afterRead" multiple>
        <img
          v-if="userInfo.head_img"
          :src="$axios.defaults.baseURL + userInfo.head_img"
          alt=""
          class="avatar"
        />
        <img v-else src="../assets/meinv.jpeg" alt="" class="avatar" />
      </van-uploader>
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
      @confirm="setUserInfo({ nickname: value })"
    >
      <van-field v-model="value" placeholder="请输入昵称" />
    </van-dialog>

    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="setUserInfo({ password: value })"
    >
      <van-field v-model="value" placeholder="请输入密码" type="password" />
    </van-dialog>

    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="editSex"
    />
  </div>
</template>

<script>
import Title from "../components/title.vue";
import UserInfo from "../components/userInfo.vue";
export default {
  components: {Title, UserInfo },
  data() {
    return {
      userInfo: {},
      showNickName: false,
      showPassword: false,
      showGender: false,
      actions: [
        { name: "男", gender: "1" },
        { name: "女", gender: "0" },
      ],
      value: "",
      fileList: [],
    };
  },
  methods: {
    getUserInfo() {
      this.$axios({
        method: "get",
        url: "/user/" + localStorage.getItem("userId"),
      }).then((res) => {
        const { message, data } = res.data;
        if (message === "获取成功") this.userInfo = data;
      });
    },
    editSex(user) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.setUserInfo({ gender: user.gender });
    },
    setUserInfo(data) {
      // axios 使用方式
      this.$axios({
        method: "post",
        url: "/user_update/" + localStorage.getItem("userId"),
        data,
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        this.getUserInfo();
      });
    },
    afterRead(fileObj) {
      const form = new FormData();
      form.append("file", fileObj.file);
      this.$axios({
        method: "post",
        url: "/upload",
        data: form,
      }).then((res) => {
        this.setUserInfo({ head_img: res.data.data.url });
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