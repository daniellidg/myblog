<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}分类</h3>
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input>
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
        res = await this.$http.post('/rest/categories', this.model)
      } else {
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model)
      }
      if (res.data.status === 0) {
        this.$message({
          type: 'success',
          message: res.data.message
        })

        this.$router.push('/categories/list')
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetchDetail()
  }
}
</script> 