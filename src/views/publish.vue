<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" class="content">
        <VueEditor v-model="form.content" :editorToolbar="customBar" />
      </el-form-item>

      <el-form-item label="分类">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in categoryList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group></el-form-item
      >

      <el-form-item label="封面">
        <el-upload
          :file-list="form.cover"
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
            Authorization: token,
          }"
          :on-success="coverSuccess"
          :on-remove="coverRemove"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      res.data.data.splice(0, 2);
      this.categoryList = res.data.data;
    });

    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        // 处理富文本框无法接受 div 的问题
        res.data.data.content = res.data.data.content.replace(/div/g, "p");
        // 处理分类选项多选框需要的数字数组
        // [{id: 666}] => [666]
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });

        // 处理封面图片的数据
        res.data.data.cover.map((img) => {
          // 解决了url 不全的问题
          if (!img.url.includes("http"))
            img.url = this.$axios.defaults.baseURL + img.url;

          img.uid = img.id;

          return img;
        });

        console.log(res.data.data.content);
        this.form = res.data.data;
      });
    }
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((num) => {
        return {
          id: num,
        };
      });
    },
  },
  data() {
    return {
      // 存放所有分类的数组
      categoryList: [],
      // 组件要求的数字组成的数组
      checkList: [],

      token: localStorage.getItem("token"),
      content: "",
      customBar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
    };
  },
  methods: {
    coverSuccess(res, file, fileList) {
      file.id = res.data.id;
      this.form.cover.push(file);
    },
    coverRemove(file, fileList) {
      this.form.cover = fileList;
    },
    onSubmit() {
      this.$axios({
        method: "post",
        url: "/post",
        data: this.form,
      }).then((res) => {
        // 发布成功后跳转会文章列表页
        this.$router.push("/article");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  /deep/ .el-form-item__content {
    line-height: 1;
  }
}
</style>