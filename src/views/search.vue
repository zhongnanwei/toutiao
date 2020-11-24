<template>
  <div class="search">
    <header>
      <span class="iconfont iconjiantou" @click="$router.back()"></span>
      <van-search
        v-model="value"
        background="#f2f2f2"
        placeholder="请输入搜索关键词"
        shape="round"
      />
      <span @click="search(value)">搜索</span>
    </header>
    <div class="history">
      <h3>历史记录</h3>
      <ul>
        <li
          v-for="(history, index) in historyList"
          :key="index"
          @click="search(history)"
        >
          {{ history }}
        </li>
      </ul>
    </div>
    <div class="hot">
      <h3>热门搜索</h3>
      <ul>
        <li>办公室小野否认解散</li>
        <li>办公室小野否认解散</li>
        <li>办公室小野否认解散</li>
        <li>办公室小野否认解散</li>
        <li>办公室小野否认解散</li>
        <li>办公室小野否认解散</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      historyList: [],
    };
  },
  methods: {
    search(keyword) {
      if (!this.historyList.includes(this.value))
        this.historyList.push(this.value);
      this.$axios({
        method: "get",
        url: "/post_search",
        data: {
          keyword,
        },
      }).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.$axios({
      method: "get",
      url: "/post_search_recommend",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="less" scoped>
.search {
  padding: 0 20 /360 * 100vw;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-search {
      flex: 1;
    }
    span {
      font-size: 16 /360 * 100vw;
    }
  }
  .history {
    padding: 20/360 * 100vw 0;
    flex-direction: column;
    justify-content: space-evenly;
    border-bottom: 1px solid #ccc;
    ul {
      margin-top: 20 /360 * 100vw;
      li {
        float: left;
        height: 12 /360 * 100vw;
        margin-bottom: 20 /360 * 100vw;
        margin-right: 20 /360 * 100vw;
      }
    }
  }
  .hot {
    margin-top: 20 /360 * 100vw;
    ul {
      margin-top: 20 /360 * 100vw;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        height: 30 /360 * 100vw;
        font-size: 13 /360 * 100vw;
      }
    }
  }
}
</style>