/** 
   首页
   Arthas
*/
<template>
  <div>
    <header>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>搜索新闻
      </div>
      <router-link class="user" to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </header>
    <van-tabs
      sticky
      background="#e4e4e4"
      line-width="0"
      v-model="activeCategoryIndex"
    >
      <van-tab v-for="post in categoryList" :key="post.id" :title="post.name">
        <van-list
          @load="loadMore"
          :immediate-check="false"
          v-model="post.loading"
          :finished="post.finish"
          finished-text="别拉啦，到底啦"
        >
          <PostItem
            :postData="postData"
            v-for="postData in post.postList"
            :key="postData.id"
          />
        </van-list>
      </van-tab>
      <div class="banner">
        <span
          class="iconfont iconjiantou1"
          @click="$router.push('/banner')"
        ></span>
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
      activeCategoryIndex: 0,
      categoryList: [],
    };
  },
  methods: {
    getPost() {

      this.$axios({
        method: "get",
        url: "/post",
        params: {
          category: this.currentCategory.id,
          pageIndex: this.currentCategory.pageIndex,
          pageSize: this.currentCategory.pageSize,
        },
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        this.currentCategory.postList = [
          ...this.currentCategory.postList,
          ...res.data.data,
        ];
        //回调后设置禁止往下加载
        this.currentCategory.loading = false;
        //当到底时，设置到底
        if (res.data.data.length < this.currentCategory.pageSize)
          this.currentCategory.finish = true;
      });
    },
    loadMore() {

      this.currentCategory.pageIndex++;
      this.getPost();
    },
  },
  computed:{
     currentCategory(){
       return this.categoryList[this.activeCategoryIndex];
     }
  },
  watch: {
    activeCategoryIndex() {

      if (this.currentCategory.postList.length == 0) this.getPost();
    },
  },
  created() {
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/category",
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      this.categoryList = res.data.data.map((item) => {
        return {
          ...item,
          postList: [],
          pageIndex: 1,
          pageSize: 5,
          //加载参数
          loading: false,
          //首页完成
          finish: false,
        };
      });
      this.getPost();
    });
  },
};
</script>

<style lang="less" scoped>
header {
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
  width: 45px;
  height: 44px;
  z-index: 1000;
  background-color: #e4e4e4;
  line-height: 44px;
  text-align: center;
}
</style>