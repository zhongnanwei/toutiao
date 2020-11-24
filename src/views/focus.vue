<template>
  <div>
    <Title title="我的关注"></Title>
    <ul>
      <li v-for="item in userInfo" :key="item.id">
        <img
          v-if="item.head_img"
          :src="$axios.defaults.baseURL + item.head_img"
          alt=""
          class="avatar"
        />
        <img v-else src="../assets/meinv.jpeg" alt="" class="avatar" />
        <div class="info">
          <div class="name">
            <span>{{ item.nickname }}</span>
          </div>
          <div class="date">{{ item.create_date.split("T")[0] }}</div>
        </div>
        <div class="cancel-focus" @click="cancelFocus(item.id)">取消关注</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Title from "../components/title.vue";
export default {
  components: {  Title },
  data() {
    return {
      userInfo: [],
    };
  },
  methods: {
    cancelFocus(id) {
      this.$axios({
        method: "get",
        url: "/user_unfollow/" + id,
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        this.$toast.success(res.data.message);
      });
    },
    initFocus() {
      this.$axios({
        method: "get",
        url: "/user_follows",
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        if (res.status === 200) {
          this.userInfo = res.data.data;
        }
      });
    },
  },
  created() {
    this.initFocus();
  },
};
</script>

<style lang="less" scoped>
ul {
  margin-top: 10 /360 * 100vw;
  li {
    display: flex;
    padding: 14 /360 * 100vw 20 /360 * 100vw;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .avatar {
      width: 40 /360 * 100vw;
      height: 40 /360 * 100vw;
      border-radius: 50%;
    }
    .info {
      flex-grow: 1;
      padding-left: 10 /360 * 100vw;
      .name {
        color: #333;
        font-size: 16 /360 * 100vw;
      }
      .date {
        font-size: 14 /360 * 100vw;
        color: #888;
        margin-top: 6 /360 * 100vw;
      }
    }
    .cancel-focus {
      width: 73/360 * 100vw;
      height: 30/360 * 100vw;
      background-color: rgba(153, 153, 153, 0.2);
      text-align: center;
      line-height: 30/360 * 100vw;
      border-radius: 15/360 * 100vw;
    }
  }
}
</style>