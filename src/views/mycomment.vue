<template>
  <div>
    <Title title="我的跟帖" />
    <div class="comment">
      <Comment
        :commentList="list"
        v-for="list in commentList"
        :key="list.id"
      ></Comment>
    </div>
  </div>
</template>

<script>
import Title from "../components/title.vue";
import Comment from "../components/comment.vue";
export default {
  components: {
    Title,
    Comment,
  },
  data() {
    return {
      commentList: [],
    };
  },
  created() {
    this.$axios({
      url: "/user_comments",
    }).then((res) => {
      this.commentList = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 20 /360 * 100vw;
}
</style>