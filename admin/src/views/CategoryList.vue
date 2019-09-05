<template>
  <div class="page-cat-list">
    <h3>分类列表</h3>
    <el-table :data="model" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="280"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="() => $router.push(`/categories/create/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/categories");
      this.model = res.data;
    },
    async del(row) {
      const res = await this.$http.delete(`/rest/categories/${row._id}`);
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>