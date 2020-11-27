<template>
  <div>
    <Title title="我的收藏"></Title>
    <PostItem
      :postData="postData"
      v-for="postData in postList"
      :key="postData.id"
    />
  </div>
</template>

<script>
import Title from "../components/title.vue";
import PostItem from "../components/postItem.vue";
export default {
  components: {
    Title,
    PostItem,
  },
  data() {
    return {
      postList: [],
    };
  },
  created() {
    this.$axios({
      url: "/user_star",
    }).then((res) => {
      this.postList = res.data.data;
    });
  },
};
</script>

<style>
</style>