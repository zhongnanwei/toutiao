<template>
  <div>
    <header @click="$router.push('/editpage')">
      <img
        v-if="userInfo.head_img"
        :src="$axios.defaults.baseURL + userInfo.head_img"
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

      <span class="iconfont iconjiantou1"></span>
    </header>
    <div class="line"></div>
    <UserInfo
      title="我的关注"
      text="关注的用户"
      @click.native="$router.push('/focus')"
    ></UserInfo>
    <UserInfo
      title="我的跟帖"
      text="跟帖/回复"
      @click.native="$router.push('/my_comment')"
    ></UserInfo>
    <UserInfo
      title="我的收藏"
      text="文章/视频"
      @click.native="$router.push('/star')"
    ></UserInfo>
    <UserInfo title="设置"></UserInfo>
  </div>
</template>

<script>
import UserInfo from "../components/userInfo.vue";
export default {
  components: { UserInfo },
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/user/" + localStorage.getItem("userId"),
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