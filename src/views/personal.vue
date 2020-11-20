<template>
  <div>
    <Wrap></Wrap>
    <header>
      <img
        v-if="userInfo.head_img"
        :src="baseURL + userInfo.head_img"
        alt=""
        class="avatar"
      />
      <img v-else src="../assets/meinv.jpeg" alt="" class="avatar" />
      <div class="info">
        <div class="name">
          <span
            class="iconfont"
            :class="{
              iconxingbienan: userInfo.gender === 1,
              iconxingbienv: userInfo.gender === 0,
            }"
          ></span>
          {{ userInfo.nickname || userInfo.username }}
        </div>
        <div class="date">{{ userInfo.create_date }}</div>
      </div>
      <router-link to="/editpage">
          <span class="iconfont iconjiantou1"></span>
      </router-link>
    </header>
    <div class="line"></div>
    <UserInfo
      title="我的关注"
      text="关注的用户"
      @click.native="logText"
    ></UserInfo>
    <UserInfo title="我的跟帖" text="跟帖/回复"></UserInfo>
    <UserInfo title="我的收藏" text="文章/视频"></UserInfo>
    <UserInfo title="设置"></UserInfo>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
import UserInfo from "../components/userInfo.vue";
export default {
  components: { Wrap, UserInfo },
  data() {
    return {
      baseURL: "http://localhost:3000",
      userInfo: {},
    };
  },
  methods: {
    logText() {
      console.log(1);
    },
  },
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
        this.userInfo.create_date = this.userInfo.create_date.split("T")[0];
      }
    });
  },
};
</script>

<style lang="less" scoped>
header {
  margin-top: 24 /360 * 100vw;
  display: flex;
  padding: 24 /360 * 100vw 20 /360 * 100vw;
  align-items: center;
  border-bottom: 5 /360 * 100vw solid #e4e4e4;
  .avatar {
    width: 70 /360 * 100vw;
    height: 70 /360 * 100vw;
    border-radius: 50%;
  }
  .info {
    flex-grow: 1;
    padding-left: 10 /360 * 100vw;
    .name {
      .iconxingbienan {
        color: #76baeb;
      }
      .iconxingbienv {
        color: pink;
      }
      color: #333;
      font-size: 16 /360 * 100vw;
    }
    .date {
      font-size: 14 /360 * 100vw;
      color: #888;
      margin-top: 6 /360 * 100vw;
    }
  }
}
.line {
  width: 100vw;
  height: 5/360 * 100vw;
  background-color: rgba(228, 228, 228, 1);
}
</style>