<template>
  <div class="inputWrapper">
    <input :type="type" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: ["type", "placeholder"],
};
</script>

<style lang="less">
.inputWrapper {
  padding-bottom: 16/360 * 100vw;
  input {
    width: 100%;
    height: 48/360 * 100vw;
    line-height: 48/360 * 100vw;
    font-size: 18/360 * 100vw;
    border: none;
    outline: none;
    border-bottom: 2px solid #333;
  }
}
</style>