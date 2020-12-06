<template>
  <main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" width="100" prop="id"></el-table-column>
      <el-table-column label="标题" width="500" prop="title"> </el-table-column>
      <el-table-column
        label="作者"
        width="180"
        prop="user.nickname"
      ></el-table-column>
      <el-table-column label="缩略图" width="200">
        <template slot-scope="scope">
          <img
            v-if="scope.row.cover.length > 0"
            :src="scope.row.cover[0].url"
            class="thumbnail"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="$router.push('/postarticle?id=' + scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[3, 4, 5, 6]"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize: 3,
    };
  },
  methods: {
    currentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.loadPage();
    },
    sizeChange(size) {
      this.pageSize = size;
      this.loadPage();
    },
    loadPage() {
      this.$axios({
        url: "/post",
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        },
      }).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="less" scoped>
.thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
.block {
  margin-top: 30px;
  background-color: #fff;
  text-align: center;
}
</style>