import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ScrollTest from '@/components/ScrollTest'
import Address from '@/components/Address'
import RichText from '@/components/RichText'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/scrollTest',
      name: 'ScrollTest',
      component: ScrollTest
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/richText',
      name: 'RichText',
      component: RichText
    }
  ]
})
