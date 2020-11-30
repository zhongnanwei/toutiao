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
        :poster="postData.cover[0].url | imgUrl"
        src="https://video.pearvideo.com/mp4/adshort/20201113/cont-1706965-15482774_adpkg-ad_hd.mp4"
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
    <div class="line"></div>
    <div class="comment">
      <p>精彩跟帖</p>
      <div class="nocomment" v-if="postData.comment_length == 0">
        <span>暂无跟帖，抢占沙发</span>
      </div>
      <div class="havecomment" v-if="postData.comment_length > 0">
        <CommentMain
          :commentData="parentData"
          v-for="(parentData, index) in commentList"
          :key="index"
        ></CommentMain>
        <div
          class="more"
          @click="$router.push('/post_comment/' + $route.params.id)"
        >
          更多跟帖<span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
    <div class="deactive" v-if="deactive">
      <input
        type="text"
        placeholder="写跟帖"
        @click="deactive = false"
        @blur="deactive = true"
      />
      <div class="message">
        <span class="iconfont iconpinglun-"></span>
        <div v-if="postData.comment_length" class="num">
          {{ postData.comment_length }}
        </div>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <div class="active" v-else>
      <textarea rows="3" autofocus></textarea>
      <div class="btn">发送</div>
    </div>
  </div>
</template>

<script>
import CommentMain from "../components/main.vue";
export default {
  components: { CommentMain },
  data() {
    return {
      postData: [],
      commentList: [],
      deactive: true,
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
      this.$axios({
        url: "/post_like/" + this.postData.id,
      }).then((res) => {
        this.postData.has_like = !this.postData.has_like;
        this.postData.has_like
          ? this.postData.like_length++
          : this.postData.like_length--;
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
    this.$axios({
      url: "/post_comment/" + this.$route.params.id,
    }).then((res) => {
      this.commentList = res.data.data;
      this.commentList.length = 3;
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
  margin-bottom: 20 /360 * 100vw;
  .like {
    color: red;
  }
  .iconweixin {
    color: #00c800;
  }
}
.line {
  height: 10 /360 * 100vw;
  background-color: #e4e4e4;
}
.comment {
  padding: 20 /360 * 100vw;
  margin-bottom: 70 /360 * 100vw;
  border-bottom: 2px solid #d7d7d7;
  p {
    font-size: 20 /360 * 100vw;
    text-align: center;
  }
  .nocomment {
    margin: 20 /360 * 100vw 0;
    text-align: center;
    span {
      font-size: 14 /360 * 100vw;
      color: #aeaeae;
    }
  }
}
.deactive {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #f2f2f2;
  height: 70 /360 * 100vw;
  display: flex;
  align-items: center;
  padding: 0 20 /360 * 100vw;
  input {
    width: 161 /360 * 100vw;
    height: 32 /360 * 100vw;
    background-color: #d7d7d7;
    border-radius: 16 /360 * 100vw;
    padding-left: 20 /360 * 100vw;
    border: none;
  }
  .message {
    position: relative;
    .num {
      position: absolute;
      top: -5px;
      left: 30 /360 * 100vw;
      height: 14 /360 * 100vw;
      line-height: 14 /360 * 100vw;
      border-radius: 12 /360 * 100vw;
      font-size: 12 /360 * 100vw;
      background: red;
      color: #fff;
      padding: 0 4px;
    }
  }
  span {
    margin-left: 20 /360 * 100vw;
    font-size: 23 /360 * 100vw;
  }
}
.active {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #f2f2f2;
  align-items: flex-end;
  padding: 10 /360 * 100vw;
  textarea {
    width: 260 /360 * 100vw;
    height: 90 /360 * 100vw;
    background: #d7d7d7;
    border: none;
    outline: none;
    border-radius: 10 /360 * 100vw;
    padding: 10 /360 * 100vw;
    box-sizing: border-box;
  }
  .btn {
    background: red;
    color: #fff;
    font-size: 16 /360 * 100vw;
    height: 26 /360 * 100vw;
    line-height: 26 /360 * 100vw;
    border-radius: 13 /360 * 100vw;
    padding: 0 14 /360 * 100vw;
    margin-left: 10 /360 * 100vw;
  }
}
.more {
  padding: 30 /360 * 100vw;
  text-align: center;
  font-size: 16 /360 * 100vw;
  color: #888;
}
</style>