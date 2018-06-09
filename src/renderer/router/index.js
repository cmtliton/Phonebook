import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: require('@/components/User/Signin').default
    },
    {
      path: '/signup',
      name: 'signup',
      component: require('@/components/User/Signup').default
    }
  ]
})
