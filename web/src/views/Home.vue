<template>
  <div id="header" class="home">
    <div id="header" class="header bg-white">
      <div class="navbar-container">
        <a class="navbar-logo" style="margin-top: -18px;">
          <img src="../assets/images/logo.png" />
        </a>
        <div class="navbar-menu">
          <router-link to="/">首页</router-link>
          <!--<router-link to="/">书籍</router-link>-->
          <router-link to="/archive">归档</router-link>
          <router-link to="/tag">标签</router-link>
          <router-link to="/about">关于</router-link>
        </div>
        <!--
        <div class="navbar-search" onclick>
          <span class="icon-search"></span>
          <form method="post" action="/404.html" role="search">
            <span class="search-box">
              <input
                type="text"
                class="input"
                id="cb-search-content"
                required="true"
                placeholder="标题 标签..."
                maxlength="30"
                autocomplete="off"
              />
            </span>
          </form>
        </div>
        -->
        <div class="navbar-mobile-menu" onclick>
          <span class="icon-menu cross">
            <span class="middle"></span>
          </span>
          <ul>
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <!--
            <li>
              <router-link to="/">书籍</router-link>
            </li>
            -->
            <li>
              <router-link to="/archive">归档</router-link>
            </li>
            <li>
              <router-link to="/tag">标签</router-link>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view :key="$route.path"></router-view>

    <footer class="footer bg-white">
      <div class="footer-social">
        <div class="footer-container clearfix">
          <div class="social-list">
            <a
              class="social github"
              target="blank"
              href="https://juejin.im/user/59cde334f265da066876181c/posts"
              title="访问 掘金"
              data-hover="掘金"
            >掘金</a>
            <a
              class="social github"
              target="blank"
              href="https://github.com/lidaguang1989"
              title="访问 lidaguang1989"
              data-hover="GitHub"
            >GitHub</a>
            <a
              class="social oschina"
              target="blank"
              href="https://gitee.com/daniel_lidg"
              title="访问 LiberXue_Oschina"
              data-hover="码云"
            >码云</a>
          </div>
        </div>
      </div>
      <div class="footer-meta">
        <div class="footer-container">
          <div class="meta-item meta-copyright">
            <div class="meta-copyright-info">
              <a href="/" class="info-logo">
                <img
                  src="../assets/images/logo.png"
                  title="访问 Daguang"
                  data-hover="Daguang"
                  alt="Daguang"
                />
              </a>
              <div class="info-text">
                <p>
                  Theme is
                  <a
                    href="http://www.liberxue.com/2017/08/03/Jekyllthemes.html"
                    title="访问 Jekyll liberxue主题"
                    data-hover="Jekyll liberxue"
                    target="_blank"
                  >Jekyll liberxue</a> by
                  <a href="http://www.liberxue.com/about" target="_blank">liberxue</a>
                </p>
                <p>
                  Powered by
                  <router-link
                    to="/about"
                    title="dykingdy"
                    data-hover="dykingdy"
                    rel="nofollow"
                  >dykingdy</router-link>
                </p>
                <p>
                  &copy; 2019
                  <a
                    href="/feed.xml"
                    title="访问 dykingdy blog RSS"
                    data-hover="dykingdy blog RSS"
                  >dykingdy blog RSS</a>
                </p>
                <p>总计文章：{{modelLatest.totalArticles}}篇</p>
                <p>
                  <span id="busuanzi_container_site_pv">
                    本站总访问量：
                    <span id="buzuanzi_value_site_pv"></span>次
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="meta-item meta-posts">
            <h3 class="meta-title">置顶文章</h3>
            <li v-for="item in modelTop" :key="item._id">
              <router-link
                :to="`/article/${item._id}`"
                :title="`${item.title}`"
                :data-hover="`${item.title}`"
              >{{item.title}}</router-link>
            </li>
          </div>
          <div class="meta-item meta-comments">
            <h3 class="meta-title">最新文章</h3>

            <li v-for="item in modelLatest.list" :key="item._id">
              <router-link
                :to="`/article/${item._id}`"
                :title="`${item.title}`"
                :data-hover="`${item.title}`"
              >{{item.title}}</router-link>
            </li>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      modelLatest: [],
      modelTop: []
    };
  },
  methods: {
    async fetchLatestArticles() {
      const res = await this.$http.get("/articles/1");
      this.modelLatest = res.data;
    },
    async fetchTopArticles() {
      const res = await this.$http.get("/articles/top");
      this.modelTop = res.data;
    }
  },
  created() {
    this.fetchLatestArticles();
    this.fetchTopArticles();
  }
};
</script>
