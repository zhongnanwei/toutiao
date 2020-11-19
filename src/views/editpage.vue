<template>
  <div>
    <Wrap></Wrap>
    <Title title="编辑资料"></Title>
    <div class="content"></div>
    <UserInfo title="我的关注" text="关注的用户"></UserInfo>
    <UserInfo title="我的跟帖" text="跟帖/回复"></UserInfo>
    <UserInfo title="我的收藏" text="文章/视频"></UserInfo>
  </div>
</template>

<script>
import Wrap from "../components/wrap.vue";
import Title from "../components/title.vue";
import UserInfo from "../components/userInfo.vue";
export default {
  components: { Wrap, Title, UserInfo },
  methods: {},
};
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100px;
}
</style>