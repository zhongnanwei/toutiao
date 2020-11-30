// 递归父组件
<template>
  <div>
    <div class="box">
      <Parent :parentData="parentData.parent" v-if="parentData.parent"></Parent>
      <div class="user">
        <p>{{ parentData.user.nickname }}</p>
        <span class="time">{{ parentData.create_date.split("T")[0] }}</span>
        <span>回复</span>
      </div>
      <div class="content">{{ parentData.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Parent",
  props: ["parentData"],
};
</script>

<style lang="less" scoped>
.box {
  border: 1px solid #e4e4e4;
  padding: 2px;
  margin: 2px;
  .user {
    display: flex;
    padding: 10 /360 * 100vw;
    p {
      font-size: 16 /360 * 100vw;
    }
    .time {
      flex: 1;
      margin-left: 10 /360 * 100vw;
    }
    span {
      font-size: 13 /360 * 100vw;
      color: #888;
    }
  }
  .content {
    padding: 10 /360 * 100vw;
  }
}
</style>