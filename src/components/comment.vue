<template>
  <div class="content">
    <span
      >{{ commentList.create_date.split("T")[0] }} &nbsp;{{
        commentList.create_date.split("T")[1].split(".")[0]
      }}</span
    >
    <div class="parent_comment" v-if="commentList.parent">
      <span
        >回复：
        {{
          commentList.parent.user.nickname || commentList.parent.user.username
        }}</span
      >
      <p>{{ commentList.parent.content }}</p>
    </div>
    <p>{{ commentList.content }}</p>
    <span>{{ commentList.post.title }}</span>
  </div>
</template>

<script>
export default {
  props: ["commentList"],
};
</script>

<style lang="less" scoped>
.content {
  padding: 10 /360 * 100vw 15 /360 * 100vw;
  border-bottom: 1px solid #d7d7d7;
  .parent_comment {
    background-color: #e4e4e4;
    padding: 10 /360 * 100vw;
    margin-top: 10 /360 * 100vw;
    p {
      color: #888;
    }
  }
  span {
    display: inline-block;
    width: 260 /360 * 100vw;
    font-size: 13 /360 * 100vw;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p {
    margin: 10 /360 * 100vw 0;
    font-size: 16 /360 * 100vw;
    color: #333;
  }
}
</style>