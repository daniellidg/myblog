import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Article from './views/Article.vue'
import Archive from './views/Archive.vue'
import Tag from './views/Tag.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {path: '/', component: Main},
        {path: '/main', component: Main},
        {path: '/article/:id', component: Article, props: true},
        {path: '/archive', component: Archive},
        {path: '/tag', component: Tag},
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    }
  ]
})
