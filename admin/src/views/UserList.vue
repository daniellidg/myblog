<template>
  <div class="page-cat-list">
    <h3>用户列表</h3>
    <el-table :data="model" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="() => $router.push(`/users/create/${scope.row._id}`)"
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
      const res = await this.$http.get("/rest/users");
      this.model = res.data;
    },
    async del(row) {
      const res = await this.$http.delete(`/rest/users/${row._id}`);
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>