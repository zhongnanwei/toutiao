//递归主组件
<template>
  <div class="container">
    <div class="box">
      <img
        v-if="commentData.user.head_img"
        :src="commentData.user.head_img"
        alt=""
      />
      <img v-else src="../assets/zhuzui.jpeg" alt="" />
      <div class="user">
        <p>{{ commentData.user.nickname }}</p>
        <span>{{ commentData.create_date.split("T")[0] }}</span>
      </div>
      <span>回复</span>
    </div>
    <Parent :parentData="commentData.parent" v-if="commentData.parent"></Parent>
    <p>{{ commentData.content }}</p>
  </div>
</template>

<script>
import Parent from "./parent.vue";
export default {
  props: ["commentData"],
  components: { Parent },
};
</script>

<style lang="less" scoped>
.container {
  padding: 15 /360 * 100vw;
  font-size: 16 /360 * 100vw;
  border-bottom: 1px solid #ccc;
  .box {
    display: flex;
    align-items: center;
    height: 40 /360 * 100vw;
    img {
      width: 35 /360 * 100vw;
      height: 35 /360 * 100vw;
      border-radius: 50%;
    }
    .user {
      flex: 1;
      margin-left: 10 /360 * 100vw;
      p {
        margin-top: 0;
        font-size: 16 /360 * 100vw;
      }
    }
    span {
      font-size: 13 /360 * 100vw;
      color: #888;
    }
  }
  p {
    margin-top: 10 /360 * 100vw;
  }
}
</style>