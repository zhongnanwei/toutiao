<template>
  <el-container class="container">
    <el-aside width="200px">
      <h2>黑马头条</h2>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#000000"
        text-color="#f2f2f2"
        active-text-color="#fff"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
export default {};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #333333;
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #000000;
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  border-right: none;
}
</style>
