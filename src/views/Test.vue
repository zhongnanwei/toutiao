<template>
  <div>
    <PostItem
      :postData="postData"
      v-for="postData in postList"
      :key="postData.id"
    />
  </div>
</template>

<script>
import PostItem from "../components/postItem.vue";
export default {
  components: {
    PostItem,
  },
  data() {
    return {
      postList: [],
    };
  },
  created() {
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/post",
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      console.log(res);
      this.postList = res.data.data;
    });
  },
};
</script>

<style>
</style>