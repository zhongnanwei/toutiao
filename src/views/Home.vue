<template>
  <div>
    <Wrap></Wrap>
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
    <ul class="toptab">
      <li>关注</li>
      <li>头条</li>
      <li>娱乐</li>
      <li>体育</li>
      <li>汽车</li>
      <li>房产</li>
      <li><span class="iconfont iconjiantou1" @click="jumpToBanner"></span></li>
    </ul>
    <main>
      <ul>
        <li v-for="(item, index) in postList" :key="index">
          <p>{{ item.title }}</p>
          <dd class="picture">
            <dl v-for="(img, idx) in item.cover" :key="idx">
              <img :src="img.url" alt="" />
            </dl>
          </dd>
          <span>{{ item.user.nickname }}</span>
          <label>{{ item.open }}</label>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
export default {
  components: { Wrap },
  data() {
    return {
      postList: [],
    };
  },
  methods: {
    jumpToBanner() {
      this.$router.push({ path: "banner" });
    },
  },
  created() {
    const Authorization = localStorage.getItem("token");
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/post?pageSize=3",
      headers: { Authorization },
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      console.log(res.data.data);
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
ul.toptab {
  position: absolute;
  left: 0px;
  top: 73/360 * 100vw;
  width: 100vw;
  height: 43/360 * 100vw;
  background-color: rgba(228, 228, 228, 1);
  display: flex;
  li {
    flex: 1;
    text-align: center;
    line-height: 43/360 * 100vw;
    font-size: 16/360 * 100vw;
    span {
      font-size: 21/360 * 100vw;
    }
  }
}
main {
  margin-top: 11.94444444vw;
  ul {
    li {
      width: 100vw;
      height: 150 /360 * 100vw;
      padding: 10 /360 * 100vw;
      dd {
        height: 80/360 * 100vw;
        dl {
          height: 80 /360 * 100vw;
          width: 100 /360 * 100vw;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>