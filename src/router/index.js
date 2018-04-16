import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/Index'
import SocialIndex from '@/SocialIndex'
import SocialDetail from '@/SocialDetail'
import SocialPost from '@/SocialPost'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // hashbang: false,
  // history: false,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '这是个圈子',
        keepAlive: false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '这是个圈子',
        keepAlive: false
      }
    },
    {
      path: '/circle/:circleId',
      name: 'circle',
      component: SocialIndex,
      meta: {
        title: '这是个圈子',
        keepAlive: false
      }
    },
    {
      path: '/post/:circleId/:postId/:onPage',
      name: 'post',
      component: SocialDetail,
      meta: {
        title: '这是个圈子',
        keepAlive: false
      }
    },
    {
      path: '/SocialPost/:circleId',
      name: 'SocialPost',
      component: SocialPost,
      meta: {
        title: '这是个圈子',
        keepAlive: false
      }
    }
  ]
})
