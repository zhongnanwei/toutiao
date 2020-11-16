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
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 24/360 * 100vw;
  background-color: rgba(117, 117, 117, 1);
  border-radius: 0px;
}
.bottom {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100vw;
  height: 48/360 * 100vw;
  background-color: rgba(0, 0, 0, 1);
}
</style>