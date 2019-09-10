<template>
  <div class="page-main">
    <div class="tl f6 relative pa4 pa5-ns overflow-hidden">
      <div class="markdown-body">
        <div class="main-content index-page clearfix">
          <div class="post-lists">
            <div class="post-lists-body">
              <div class="post-list-item" v-for="(item, i) in articleList" :key="i">
                <div class="post-list-item-container">
                  <div
                    class="item-thumb"
                    :class="{'bg-green': i === 2, 'bg-blue': i === 3, 'bg-purple': i === 6}"
                  ></div>
                  <router-link :to="`/article/${item._id}`">
                    <div class="item-desc">
                      <p class="ellipsis-multi">{{item.summary}}</p>
                    </div>
                  </router-link>
                  <div
                    class="item-slant reverse-slant"
                    :class="{'bg-green': i === 2, 'bg-blue': i === 3, 'bg-purple': i === 6}"
                  ></div>
                  <div class="item-slant">
                    <div class="liberxue-title">原创</div>
                  </div>
                  <div class="item-label">
                    <div class="item-title">
                      <a href="/" :title="`访问 ${item.title}`">{{item.title}}</a>
                    </div>
                    <div class="item-meta clearfix">
                      <div
                        class="item-meta-ico bg-ico-book"
                        style="background: url('../assets/images/bg-ico.png') no-repeat;background-size: 40px auto;"
                      ></div>
                      <div v-if="item.categories.length > 0" class="item-meta-cat">
                        <a
                          href="/"
                          :title="`访问 ${item.categories[0].title}`"
                          :data-hover="item.categories[0].title"
                        >{{item.categories[0].title}}</a>
                        <a
                          href="/"
                          :title="`访问 ${item.createdAt.split('-')[0]}`"
                          :data-hover="item.createdAt"
                        >{{item.createdAt}}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页链接 -->
          <div class="lists-navigator clearfix">
            <ol class="page-navigator">
              <li :class="{'current': 1 == pagination.currentPage}">
                <a @click="goToPage(1)" data-hover="首页">
                  <span>首页</span>
                </a>
              </li>
              <li>
                <a @click="prev()">
                  <span>&laquo;</span>
                </a>
              </li>

              <li
                :class="{'current': item == pagination.currentPage}"
                v-for="item in pagination.totalPage"
                :key="item"
              >
                <a @click="goToPage(item)" :data-hover="item">{{item}}</a>
              </li>

              <li>
                <a @click="next()">
                  <span>&raquo;</span>
                </a>
              </li>
              <li :class="{'current': pagination.totalPage == pagination.currentPage}">
                <a @click="goToPage(pagination.totalPage)" data-hover="末页">
                  <span>末页</span>
                </a>
              </li>
              <li class="current">
                <span>第{{pagination.currentPage}}页 / 共{{pagination.totalPage}}页</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      articleList: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get(
        `/articles/${this.pagination.currentPage}`
      );
      this.articleList = res.data.list;
      this.pagination.totalPage = res.data.totalPage;
      this.pagination.currentPage = res.data.currentPage;
    },
    async goToPage(pageNum) {
      this.pagination.currentPage = pageNum;

      this.fetchData();
    },
    prev() {
      if (this.pagination.currentPage == 1) {
        return;
      }

      this.pagination.currentPage--;
      this.fetchData();
    },
    next() {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        return;
      }
      this.pagination.currentPage++;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.page-main {
}
</style>