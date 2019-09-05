<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}用户</h3>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {require: true}
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post('/rest/users', this.model)
      } else {
        res = await this.$http.put(`/rest/users/${this.id}`, this.model)
      }
      if (res.data.status === 0) {
        this.$message({
          type: 'success',
          message: res.data.message
        })

        this.$router.push('/users/list')
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/rest/users/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetchDetail()
  }
}
</script> 