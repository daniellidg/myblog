<template>
  <div>
    <div v-if="model.length > 0" class="main-content archive-page clearfix">
      <div class="categorys-item" v-for="item in model" :key="item._id">
        <div class="categorys-title" id="2017">{{item._id}}</div>
        <div class="post-lists">
          <div class="post-lists-body">
            <div class="post-list-item" v-for="article in item.list" :key="article.createdAt">
              <div class="post-list-item-container">
                <div class="liberxue-title">{{article.categories.map(cat => {return cat.title}).join('|')}}</div>
                <div class="item-label">
                  <div class="item-title">
                    <router-link
                      :to="`/article/${article._id}`"
                      :title="`访问 ${article.title}`"
                    >{{article.title}}</router-link>
                  </div>
                  <div class="item-meta clearfix">
                    <div class="item-meta-date">
                      {{article.createdAt | date('YYYY-MM-DD HH:mm:ss')}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <router-link
                        :to="`/tag`"
                        :data-hover="article.categories.map(cat => {return cat.title}).join('|')"
                      >{{article.categories.map(cat => {return cat.title}).join('|')}}</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      const res = await this.$http.get("/archive");
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
};
</script>