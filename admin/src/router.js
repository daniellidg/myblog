import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CategoryList from './views/CategoryList.vue'
import CategoryEdit from './views/CategoryEdit.vue'

import ArticleList from './views/ArticleList.vue'
import ArticleEdit from './views/ArticleEdit.vue'

import UserList from './views/UserList.vue'
import UserEdit from './views/UserEdit.vue'

import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/', component: CategoryEdit},
        {path: '/categories/create', component: CategoryEdit},
        {path: '/categories/list', component: CategoryList},
        {path: '/categories/create/:id', component: CategoryEdit, props: true},
        {path: '/', component: CategoryList},

        {path: '/articles/list', component: ArticleList},
        {path: '/articles/create', component: ArticleEdit},
        {path: '/articles/create/:id', component: ArticleEdit, props: true},

        {path: '/users/list', component: UserList},
        {path: '/users/create', component: UserEdit},
        {path: '/users/create/:id', component: UserEdit, props: true},
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
