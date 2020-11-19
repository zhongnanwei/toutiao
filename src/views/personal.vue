<template>
  <div>
    <Wrap></Wrap>
    <header></header>
    <div class="line"></div>
    <UserInfo title="我的关注" text="关注的用户"></UserInfo>
    <UserInfo title="我的跟帖" text="跟帖/回复"></UserInfo>
    <UserInfo title="我的收藏" text="文章/视频"></UserInfo>
    <UserInfo title="设置"></UserInfo>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
import UserInfo from "../components/userInfo.vue";
export default {
  components: { Wrap, UserInfo },
  methods: {},
};
</script>

<style lang="less" scoped>
header {
  margin-top: 24/360 * 100vw;
  height: 120/360 * 100vw;
  width: 100vw;
}
.line {
  width: 100vw;
  height: 5/360 * 100vw;
  background-color: rgba(228, 228, 228, 1);
}
</style>