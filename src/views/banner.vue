<template>
  <div>
    <Title title="栏目管理"></Title>
    <div class="line"><span>点击删除以下频道</span></div>
    <div class="channel">
      <ul>
        <li v-for="(item, index) in focused" :key="index">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="line"><span>点击添加以下频道</span></div>
    <div class="channel">
      <ul>
        <li v-for="(item, index) in unfocused" :key="index">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../components/title.vue";
export default {
  components: {
    Title,
  },
  data() {
    return {
      focused: [],
      unfocused: [],
    };
  },
  created() {
    // axios 使用方式
    this.$axios({
      method: "get",
      url: "/category",
      // 这里注意,成功回调 不再是 success
    }).then((res) => {
      if (res.status === 200) {
        res.data.data.forEach((item) => {
          if (item.is_top) {
            if (item.name != "关注") this.focused.push(item);
          } else {
            this.unfocused.push(item);
          }
        });
      }
    });
  },
};
</script>

<style lang="less" scoped>
.line {
  height: 20 /360 * 100vw;
  background-color: #e4e4e4;
  line-height: 20 /360 * 100vw;
  span {
    margin-left: 10/360 * 100vw;
    color: #868686;
  }
}
.channel {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: 50/360 * 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: block;
        width: 70 /360 * 100vw;
        height: 35 /360 * 100vw;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 35 /360 * 100vw;
        font-size: 4.44444444vw;
      }
    }
  }
}
</style>