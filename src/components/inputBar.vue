<template>
  <div class="inputWrapper">
    <input
      :class="{ error: !isOk }"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      :pattern="pattern"
      @blur="showErrMsg"
    />
  </div>
</template>

<script>
export default {
  props: ["type", "placeholder", "pattern", "errMsg"],
  data() {
    return {
      value: "",
      isOk: true,
      isShow: false,
    };
  },
  methods: {
    showErrMsg() {
      if (!this.isOk) this.$toast.fail(this.errMsg);
    },
  },
  watch: {
    value(newVal) {
      this.isOk = this.pattern.test(newVal);
    },
  },
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
    background-color: inherit;
    border-bottom: 2px solid #333;
  }
  span {
    color: red;
    font-size: 12/360 * 100vw;
  }
  .error {
    border-color: red;
  }
}
</style>