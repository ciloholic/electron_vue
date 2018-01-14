import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'work',
      component: require('@/components/TheWork').default
    },
    {
      path: '/admin',
      name: 'admin',
      component: require('@/components/TheAdmin').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
