<template>
  <div>
    {{ title }}
    <span>{{ text }} &nbsp;<i class="iconfont iconjiantou1"></i></span>
  </div>
</template>

<script>
export default {
  props: ["title", "text"],
};
</script>

<style lang="less" scoped>
div {
  margin-left: 15/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  width: 345/360 * 100vw;
  height: 50/360 * 100vw;
  line-height: 50/360 * 100vw;
  font-size: 16/360 * 100vw;
  span {
    float: right;
    margin-right: 15/360 * 100vw;
    font-size: 13px;
    color: rgba(148, 148, 148, 0.866666666666667);
  }
}
</style>