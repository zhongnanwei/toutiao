<template>
  <div>
    <div v-if="postData.type == 1" class="article">
      <header>
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
        <div
          class="isfollow"
          :class="{ unfollow: !postData.has_follow }"
          @click="changeFollow"
        >
          {{ postData.has_follow ? "已关注" : "关注" }}
        </div>
      </header>
      <div class="info">
        <p>{{ postData.title }}</p>
        <span
          >{{ postData.user.nickname }}&nbsp; &nbsp;
          {{ postData.create_date }}</span
        >
      </div>
      <div class="content" v-html="postData.content"></div>
    </div>
    <div class="video" v-if="postData.type == 2">
      <video
        controls
        preload="auto"
        poster="https://timgmb01.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=13e00a6373de7a1a7b0dc83df25a8289&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fb856dcd6884d81c688088626a9b8da60.jpeg"
        src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
      ></video>
      <div class="content">
        <div class="info">
          <img class="head_img" :src="postData.user.head_img | imgUrl" alt="" />
          <span>{{ postData.user.nickname }}</span>
          <div
            class="isfollow"
            :class="{ unfollow: !postData.has_follow }"
            @click="changeFollow"
          >
            {{ postData.has_follow ? "已关注" : "关注" }}
          </div>
        </div>
        <p>{{ postData.title }}</p>
      </div>
    </div>
    <div class="bar">
      <div class="icon" :class="{ like: postData.has_like }" @click="giveLike">
        <span class="iconfont icondianzan"></span>
        &nbsp; &nbsp;{{ postData.like_length }}
      </div>
      <div class="icon">
        <span class="iconfont iconweixin"></span>
        &nbsp; &nbsp;微信
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: [],
    };
  },
  methods: {
    changeFollow() {
      const url = this.postData.has_follow
        ? "/user_unfollow/"
        : "/user_follows/";
      this.$axios({
        url: url + this.postData.user.id,
      }).then((res) => {
        this.$toast(res.data.message);
        this.postData.has_follow = !this.postData.has_follow;
      });
    },
    giveLike() {
    if(!this.postData.has_like){
        this.postData.like_length++
    }else{
        this.postData.like_length--;
    }
      this.$axios({
        url: "/post_like/" + this.postData.id,
      }).then((res) => {
        this.postData.has_like=!this.postData.has_like;
      });
    },
  },
  created() {
    this.$axios({
      url: "/post/" + this.$route.params.id,
    }).then((res) => {
      this.postData = res.data.data;
      this.postData.create_date = this.postData.create_date.split("T")[0];
    });
  },
};
</script>

<style lang="less" scoped>
.article {
  padding: 0 20 /360 * 100vw;
  header {
    height: 50 /360 * 100vw;
    display: flex;

    align-items: center;
    .iconnew {
      flex: 1;
      margin-left: 10 /360 * 100vw;
      font-size: 54 /360 * 100vw;
    }
    .isfollow {
      padding: 6 /360 * 100vw 12 /360 * 100vw;
      border: 1px solid rgba(215, 215, 215, 1);
      border-radius: 31 /360 * 100vw;
      &.unfollow {
        background-color: red;
        color: #fff;
      }
    }
  }
  .info {
    p {
      font-size: 20 /360 * 100vw;
      font-weight: 700;
      margin-bottom: 10 /360 * 100vw;
    }
    span {
      color: #868686;
    }
  }
  .content {
    margin-top: 10 /360 * 100vw;
    /deep/ img {
      max-width: 100%;
      margin-bottom: 10 /360 * 100vw;
    }
    /deep/ span {
      font-size: 14 /360 * 100vw;
      color: #333;
    }
    /deep/ p {
      font-size: 14 /360 * 100vw;
      margin-top: 10 /360 * 100vw;
    }
  }
}
.video {
  video {
    width: 100%;
  }
  .content {
    padding: 0 10 /360 * 100vw;
    .info {
      height: 60 /360 * 100vw;
      display: flex;
      align-items: center;
      .head_img {
        width: 30 /360 * 100vw;
        height: 30 /360 * 100vw;
        border-radius: 50%;
      }
      span {
        margin-left: 10 /360 * 100vw;
        flex: 1;
        color: #868686;
      }
      .isfollow {
        padding: 6 /360 * 100vw 12 /360 * 100vw;
        border: 1px solid rgba(215, 215, 215, 1);
        border-radius: 31 /360 * 100vw;
        &.unfollow {
          background-color: red;
          color: #fff;
        }
      }
    }
    p {
      font-size: 16 /360 * 100vw;
    }
  }
}
.bar {
  height: 50 /360 * 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  .like {
    color: red;
  }
  .iconweixin {
    color: #00c800;
  }
}
</style>