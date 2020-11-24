<template>
  <div>
    <header>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <span class="iconfont iconsearch"></span>搜索新闻
      </div>
      <router-link class="user" to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </header>
    <van-tabs sticky background="#e4e4e4" line-width="0">
      <van-tab v-for="post in categoryList" :key="post.id" :title="post.name">
        <PostItem
          :postData="postData"
          v-for="postData in postList"
          :key="postData.id"
        />
      </van-tab>
      <div class="banner">
        <span class="iconfont iconjiantou1" @click="jumpToBanner"></span>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import PostItem from "../components/postItem.vue";
export default {
  components: { PostItem },
  data() {
    return {
      categoryList: [],
      postList: [],
    };
  },
  methods: {
    jumpToBanner() {
      this.$router.push({ path: "banner" });
    },
  },
  created() {
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/category",
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      this.categoryList = res.data.data;
    });
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/post",
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      this.postList = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
header {
  margin-top: 24/360 * 100vw;
  width: 100vw;
  height: 49/360 * 100vw;
  padding-top: 1px;
  line-height: 49/360 * 100vw;
  background-color: rgba(255, 0, 0, 1);
  border: none;
  overflow: hidden;
  .logo {
    float: left;
    margin-left: 8/360 * 100vw;
    .iconfont {
      font-size: 54/360 * 100vw;
      color: #fff;
    }
  }
  .search {
    float: left;
    margin-left: 10/360 * 100vw;
    width: 210/360 * 100vw;
    height: 34/360 * 100vw;
    margin-top: 7/360 * 100vw;
    background-color: rgba(242, 242, 242, 0.7);
    border-radius: 50/360 * 100vw;
    color: #fff;
    text-align: center;
    line-height: 34/360 * 100vw;
    font-size: 14/360 * 100vw;
  }
  .user {
    float: right;
    margin-right: 18/360 * 100vw;
    .iconfont {
      font-size: 32/360 * 100vw;
      color: #eee;
    }
  }
}
.banner {
  position: absolute;
  right: 0;
  top: 0;
  width: 45 /360 * 100vw;
  height: 44 /360 * 100vw;
  z-index: 1000;
  background-color: #e4e4e4;
  line-height: 44 /360 * 100vw;
  text-align: center;
}
</style>