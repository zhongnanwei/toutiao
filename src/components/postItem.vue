<template>
  <div @click="$router.push('/post_detail/' + postData.id)">
    <div
      v-if="postData.type == 1 && postData.cover.length < 3"
      class="singlePic"
    >
      <div class="content">
        <p>{{ postData.title }}</p>
        <span
          >{{ postData.user.nickname }}&nbsp;{{
            postData.comment_length
          }}跟帖</span
        >
      </div>
      <div class="image">
        <img
          v-if="postData.cover[0].url"
          :src="postData.cover[0].url | imgUrl"
          alt=""
        />
      </div>
    </div>
    <div
      v-if="postData.type == 1 && postData.cover.length >= 3"
      class="morePic"
    >
      <p>{{ postData.title }}</p>
      <ul>
        <li><img :src="postData.cover[0].url | imgUrl" alt="" /></li>
        <li><img :src="postData.cover[1].url | imgUrl" alt="" /></li>
        <li><img :src="postData.cover[2].url | imgUrl" alt="" /></li>
      </ul>
      <span
        >{{ postData.user.nickname }}&nbsp;{{
          postData.comment_length
        }}跟帖</span
      >
    </div>
    <div v-if="postData.type == 2" class="videoType">
      <p>{{ postData.title }}</p>
      <div class="video">
        <img
          v-if="postData.cover[0].url"
          :src="postData.cover[0].url | imgUrl"
          alt=""
        />
        <span class="iconfont iconshipin"></span>
      </div>
      <span
        >{{ postData.user.nickname }}&nbsp;{{
          postData.comment_length
        }}跟帖</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["postData"],
};
</script>

<style lang="less" scoped>
.singlePic {
  display: flex;
  justify-content: space-between;
  padding: 0 10/360 * 100vw;
  height: 100 /360 * 100vw;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 70/360 * 100vw;
    justify-content: space-between;
  }
  .image {
    width: 112/360 * 100vw;
    height: 74/360 * 100vw;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    font-size: 16 /360 * 100vw;
  }
  span {
    font-size: 13 /360 * 100vw;
    color: #868686;
  }
}
.morePic {
  padding: 10/360 * 100vw;
  border-bottom: 1px solid #ccc;
  p {
    margin-top: 10 /360 * 100vw;
    font-size: 16 /360 * 100vw;
  }
  ul {
    margin: 10 /360 * 100vw 0;
    display: flex;
    width: 100%;
    height: 74 /360 * 100vw;
    justify-content: space-between;
    li {
      width: 33%;
      height: 74 /360 * 100vw;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  span {
    font-size: 13 /360 * 100vw;
    color: #868686;
  }
}
.videoType {
  padding: 10/360 * 100vw;
  border-bottom: 1px solid #ccc;
  p {
    margin-top: 6 /360 * 100vw;
    font-size: 16 /360 * 100vw;
  }
  .video {
    width: 100%;
    margin: 10 /360 * 100vw 0;
    height: 170 /360 * 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      position: absolute;
      font-size: 46 /360 * 100vw;
      color: #fff;
      background-color: #333;
      opacity: 0.6;
      border-radius: 50%;
    }
  }
  span {
    font-size: 13 /360 * 100vw;
    color: #868686;
  }
}
</style>