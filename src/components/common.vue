<template>
  <div>
    <div class="top"></div>
    <div class="body"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.top {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 24px;
  background-color: rgba(117, 117, 117, 1);
  border-radius: 0px;
}
.body {
  width: 100vw;
  height: 100vh;
  background-color: rgba(242, 242, 242, 1);
}
.bottom {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100vw;
  height: 48px;
  background-color: rgba(0, 0, 0, 1);
}
</style>