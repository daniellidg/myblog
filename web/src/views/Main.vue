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
                      <router-link
                        :to="`/article/${item._id}`"
                        :title="`访问 ${item.title}`"
                      >{{item.title}}</router-link>
                    </div>
                    <div class="item-meta clearfix">
                      <div class="item-meta-ico bg-ico-book" style="padding: 3px;">
                        <svg
                          t="1568096279911"
                          style="transform: scale(.8)"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="5142"
                          width="32"
                          height="32"
                        >
                          <path
                            d="M742.4 921.6h-512a25.6 25.6 0 0 1 0-51.2h512a25.6 25.6 0 0 1 0 51.2z"
                            fill="#707070"
                            p-id="5143"
                          />
                          <path
                            d="M844.8 153.6a25.6 25.6 0 0 0-25.6 25.6v768a25.6 25.6 0 0 1-25.6 25.6h-563.2c-42.3424 0-76.8-34.4576-76.8-76.8S188.0576 819.2 230.4 819.2h460.8c42.3424 0 76.8-34.4576 76.8-76.8v-614.4c0-42.3424-34.4576-76.8-76.8-76.8h-512C136.8576 51.2 102.4 85.6576 102.4 128v768C102.4 966.5536 159.8464 1024 230.4 1024h563.2c42.3424 0 76.8-34.4576 76.8-76.8v-768a25.6 25.6 0 0 0-25.6-25.6z m-665.6-51.2h512a25.6 25.6 0 0 1 25.6 25.6v614.4a25.6 25.6 0 0 1-25.6 25.6h-460.8c-28.7744 0-55.3984 9.5744-76.8 25.6512V128a25.6 25.6 0 0 1 25.6-25.6z"
                            fill="#707070"
                            p-id="5144"
                          />
                        </svg>
                      </div>
                      <div v-if="item.categories.length > 0" class="item-meta-cat">
                        <router-link
                          :title="`访问 ${item.categories.map(cat => {return cat.title}).join('|')}`"
                          :data-hover="item.categories.map(cat => {return cat.title}).join('|')"
                          to="/tag"
                        >{{item.categories.map(cat => {return cat.title}).join('|')}}</router-link>
                        <router-link
                          :title="`访问 ${item.createdAt.split('-')[0]}`"
                          :data-hover="item.createdAt | date('YYYY-MM-DD HH:mm:ss')"
                          to="/archive"
                        >{{item.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</router-link>
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