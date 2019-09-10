<template>
  <div>
    <div class="post-header-thumb bg-white">
      <div class="post-header-thumb-op"></div>
      <div class="post-header-thumb">
        <div class="post-header-thumb-container">
          <h1 class="post-title" itemprop="name headline">{{model.title}}</h1>
          <div class="post-data">
            <time
              style="margin: 7px 15px 0 0;"
              datetime="2017-07-30 10:06:42"
              itemprop="datePublished"
            >发布时间：{{model.createdAt | date('YYYY-MM-DD HH:mm')}}</time>
            <a
              href="/"
              :title="`访问 ${getCategories}`"
              :data-hover="`博客分类: ${getCategories}`"
            >博客分类: {{getCategories}}</a>
            <a>
              <span id="busuanzi_container_page_pv">
                阅读次数: <span id="busuanzi_value_page_pv"></span>
              </span>
            </a>
          </div>
          <!--
          <div class="post-tags">
            <a href="/tags#Redis" title="访问Redis" data-hover="Redis">
              Redis
              <span>(1)</span>
            </a>

            <a href="/tags#memcache" title="访问memcache" data-hover="memcache">
              memcache
              <span>(1)</span>
            </a>

            <a href="/tags#apache2" title="访问apache2" data-hover="apache2">
              apache2
              <span>(1)</span>
            </a>

            <a href="/tags#owncloud" title="访问owncloud" data-hover="owncloud">
              owncloud
              <span>(1)</span>
            </a>

            <a href="/tags#负载均衡" title="访问负载均衡" data-hover="负载均衡">
              负载均衡
              <span>(1)</span>
            </a>

            <a href="/tags#stackoverflow" title="访问stackoverflow" data-hover="stackoverflow">
              stackoverflow
              <span>(1)</span>
            </a>
          </div>
          -->
        </div>
      </div>
    </div>

    <article id="post-content" class="post-content main-content post-page" itemscope itemtype="http://schema.org/Article">
      <vue-markdown :source="model.body">this is a markdown template.</vue-markdown>
    </article>
        <!--liberxueconnnet-menu-->
    <div id="directory-content" class="directory-content">
      <div id="directory"></div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  props: {
    id: { require: true }
  },
  components: {
    VueMarkdown
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
    },
    postChildren(childNodes, reg) {
      var result = [],
        isReg = typeof reg === "object",
        isStr = typeof reg === "string",
        node,
        i,
        len;
      for (i = 0, len = childNodes.length; i < len; i++) {
        node = childNodes[i];
        if (
          (node.nodeType === 1 || node.nodeType === 9) &&
          (!reg ||
            (isReg && reg.test(node.tagName.toLowerCase())) ||
            (isStr && node.tagName.toLowerCase() === reg))
        ) {
          result.push(node);
        }
      }
      return result;
    },
    createPostDirectory(article, directory, isDirNum) {
      var contentArr = [],
        titleId = [],
        levelArr,
        root,
        level,
        currentList,
        list,
        li,
        link,
        i,
        len;
      levelArr = ((article, contentArr, titleId) => {
        var titleElem = this.postChildren(article.childNodes, /^h\d$/),
          levelArr = [],
          lastNum = 1,
          lastRevNum = 1,
          count = 0,
          guid = 1,
          id = "directory" + (Math.random() + "").replace(/\D/, ""),
          num,
          elem;
        while (titleElem.length) {
          elem = titleElem.shift();
          contentArr.push(elem.innerHTML);
          num = +elem.tagName.match(/\d/)[0];
          if (num > lastNum) {
            levelArr.push(1);
            lastRevNum += 1;
          } else if (
            num === lastRevNum ||
            (num > lastRevNum && num <= lastNum)
          ) {
            levelArr.push(0);
            // lastRevNum = lastRevNum;
          } else if (num < lastRevNum) {
            levelArr.push(num - lastRevNum);
            lastRevNum = num;
          }
          count += levelArr[levelArr.length - 1];
          lastNum = num;
          elem.id = elem.id || id + guid++;
          titleId.push(elem.id);
        }
        if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0;

        return levelArr;
      })(article, contentArr, titleId);
      currentList = root = document.createElement("ul");
      let dirNum = [0];
      for (i = 0, len = levelArr.length; i < len; i++) {
        level = levelArr[i];
        if (level === 1) {
          list = document.createElement("ul");
          if (!currentList.lastElementChild) {
            currentList.appendChild(document.createElement("li"));
          }
          currentList.lastElementChild.appendChild(list);
          currentList = list;
          dirNum.push(0);
        } else if (level < 0) {
          level *= 2;
          while (level++) {
            if (level % 2) dirNum.pop();
            currentList = currentList.parentNode;
          }
        }
        dirNum[dirNum.length - 1]++;
        li = document.createElement("li");
        link = document.createElement("a");
        link.href = "#" + titleId[i];
        link.title = "访问" + titleId[i];
        link.title = "访问" + titleId[i];
        link.innerHTML = !isDirNum
          ? contentArr[i]
          : dirNum.join(".") + " " + contentArr[i];
        li.appendChild(link);
        currentList.appendChild(li);
      }
      directory.appendChild(root);
    }
  },
  computed: {
    getCategories() {
      if (!this.model.categories) return "";

      return this.model.categories.map(cat => cat.title).join("|");
    }
  },
  created() {
    this.fetchById();
  },
  mounted() {
    
  },
};
</script>