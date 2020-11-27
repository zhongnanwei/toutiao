<template>
  <div class="header">
    <div class="logo">
      <span class="iconfont iconjiantou" @click="$router.back()"></span>
    </div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="less" scoped>
.header {
  width: 100vw;
  height: 49/360 * 100vw;
  line-height: 49/360 * 100vw;
  margin-bottom: 5 /360 * 100vw;
  .logo {
    float: left;
    .iconfont {
      margin-left: 18/360 * 100vw;
      font-size: 15/360 * 100vw;
    }
  }
  span {
    margin-left: 115px;
    font-size: 14/360 * 100vw;
    font-weight: 700;
    color: #333333;
  }
}
</style>