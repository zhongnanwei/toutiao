<template>
  <div class="search">
    <header>
      <span class="iconfont iconjiantou" @click="goback"></span>
      <van-search
        v-model="value"
        background="#f2f2f2"
        placeholder="请输入搜索关键词"
        shape="round"
      />
      <span @click="search(value)">搜索</span>
    </header>
    <div class="history" v-if="showhistory">
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
    <PostItem
      :postData="search"
      v-for="search in searchData"
      :key="search.id"
    />
  </div>
</template>

<script>
import PostItem from "../components/postItem.vue";
export default {
  components: {
    PostItem,
  },
  data() {
    return {
      value: "",
      historyList: [],
      searchData: [],
      showhistory: true,
    };
  },
  methods: {
    search(keyword) {
      //点击历史记录时可以将搜索显示在搜索框中
      this.value = keyword;
      if (!this.historyList.includes(keyword)) this.historyList.push(keyword);
      this.$axios({
        method: "get",
        url: "post_search",
        params: {
          keyword,
        },
      }).then((res) => {
        this.searchData = res.data.data;
        this.showhistory = false;
      });
    },
    goback() {
      if (this.searchData.length > 0) {
        this.searchData = [];
        this.showhistory = true;
      } else {
        this.$router.back();
      }
    },
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.searchData = [];
        this.showhistory = true;
      }
    },
    historyList() {
      localStorage.setItem("history", JSON.stringify(this.historyList));
    },
  },
  created() {
    if (localStorage.getItem("history"))
      this.historyList = JSON.parse(localStorage.getItem("history"));
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