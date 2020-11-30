<template>
  <div>
    <Title title="精彩跟帖"></Title>

    <CommentMain
      :commentData="parentData"
      v-for="(parentData, index) in commentList"
      :key="index"
    ></CommentMain>
    <div class="bottom">我也是有底线的</div>
  </div>
</template>

<script>
import Title from "../components/title.vue";
import CommentMain from "../components/main.vue";
export default {
  components: {
    Title,
    CommentMain,
  },
  data() {
    return {
      commentList: [],
    };
  },
  created() {
    this.$axios({
      url: "/post_comment/" + this.$route.params.id,
    }).then((res) => {
      this.commentList = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.bottom {
  margin: 30 /360 * 100vw 0;
  font-size: 13 /360 * 100vw;
  text-align: center;
  color: #888;
}
</style>