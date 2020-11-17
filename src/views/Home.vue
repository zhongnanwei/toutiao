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
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </header>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
export default {
  components: { Wrap },
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
</style>