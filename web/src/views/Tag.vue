<template>
  <div>
    <div class="mb4">
      <h1 class="ttu f3 mt0 lh-title cb mb2">全部标签</h1>
    </div>
    <div class="markdown-body">
      <div class="main-content archive-page clearfix">
        <h3 class="post-title" itemprop="name headline">标签分类的博文--点击自动查找相应`Tags`</h3>
        <div class="post-data">
          <div class="post-tags">
            <a v-for="item in model" :key="item._id" :href="`#${item.title}`">
              {{item.title}}
              <span>({{item.tagsList.length}})个</span>
            </a>
          </div>
        </div>
      </div>
      <div class="main-content archive-page">
        <div v-for="item in model" :key="item._id" :id="`${item.title}`" class="post-lists">
          <div v-if="item.tagsList.length > 0" class="categorys-item">
            <div class="categorys-title">{{item.title}} : {{item.tagsList.length}}</div>

            <div v-for="tag in item.tagsList" :key="tag._id" class="post-list-item">
              <div class="post-list-item-container">
                <div class="item-label">
                  <div class="item-title">
                    <router-link
                      :data-hover="`${tag.title}`"
                      :to="`/article/${tag._id}`"
                    >{{tag.title}}</router-link>
                  </div>
                  <div class="item-meta clearfix">
                    <div class="item-meta-date">
                      <router-link :to="`/archive`" :data-hover="getDataHover(tag.createdAt)">{{tag.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</router-link>
                      <router-link :data-hover="`${item.title}`" to="/tag">{{item.title}}</router-link>
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
import dayjs from 'dayjs'
export default {
  data() {
    return {
      model: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/tags");
      this.model = res.data;
    },
    getDataHover(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
.archive-page .post-list-item-container .item-label .item-meta .item-meta-date {
    padding-bottom: 5px;
    padding-left: 5px;
    color: #5f5f5f;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
}
</style>