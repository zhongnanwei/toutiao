<template>
  <div>
    <Title title="栏目管理"></Title>
    <div class="line"><span>点击删除以下频道</span></div>
    <div class="channel">
      <ul>
        <li v-for="(item, index) in focused" :key="index">
          <span @click="deactive(index)">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="line"><span>点击添加以下频道</span></div>
    <div class="channel">
      <ul>
        <li v-for="(item, index) in unfocused" :key="index">
          <span @click="active(index)">{{ item.name }}</span>
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
    if (localStorage.getItem("follow")) {
      this.focused = JSON.parse(localStorage.getItem("follow"));
      if(localStorage.getItem("unfollow"))
      this.unfocused =JSON.parse(localStorage.getItem("unfollow"));
    } else {
      this.$axios({
        method: "get",
        url: "/category",
        // 这里注意,成功回调 不再是 success
      }).then((res) => {
        this.focused = res.data.data;
      });
    }
  },
  methods: {
    deactive(index) {
      this.unfocused.push(this.focused[index]);
      this.focused.splice(index, 1);
    },
    active(index) {
      this.focused.push(this.unfocused[index]);
      this.unfocused.splice(index, 1);
    },
  },
  watch: {
    focused() {
      localStorage.setItem("follow", JSON.stringify(this.focused));
    },
    unfocused() {
      localStorage.setItem("unfollow", JSON.stringify(this.unfocused));
    },
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