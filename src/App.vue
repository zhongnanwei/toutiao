<template>
  <keep-alive include="home">
  <router-view />
  </keep-alive>
</template>

<script>
export default {
  //点击到新页面时可以使页面内容在顶部显示
  updated() {
    window.scroll(0, 0);
  },
};
</script>
<style lang="less">
@import url("./assets/font.css");
@import url("./assets/reset.css");
</style>
