<template>
  <div>
    <div class="top"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.top {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 6.667vw;
  background-color: rgba(117, 117, 117, 1);
}
.bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 48/360 * 100vw;
  background-color: rgba(0, 0, 0, 1);
}
</style>