<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}文章</h3>
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select multiple v-model="model.categories" placeholder="请选择文章分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="正文">
        <!-- <el-input v-model="model.body"></el-input> -->
        <mavon-editor ref=md v-model="model.body" @imgAdd="$imgAdd" />
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
    id: { require: true }
  },
  data() {
    return {
      categories: [],
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/rest/articles", this.model);
      } else {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      }
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message
        });

        this.$router.push("/articles/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      const res = await this.$http.post('/upload', formdata)
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      this.$refs.md.$img2Url(pos, res.data.url);

      // axios({
      //   url: "",
      //   method: "post",
      //   data: formdata,
      //   headers: { "Content-Type": "multipart/form-data" }
      // }).then(url => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   // $vm.$img2Url 详情见本页末尾
      //   $vm.$img2Url(pos, url);
      // });
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetchDetail();
  }
};
</script> 