import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './auth'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/login',
      name: 'login',
      component: load('Login'),
      beforeEnter: onlyGuest
    },
    {
      path: '/',
      component: load('Index'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '/bateria',
          name: 'bateria-list',
          component: load('bateria/BateriaList')
        },
        {
          path: '/bateria/add',
          name: 'bateria-add',
          component: load('bateria/BateriaAdd'),
          beforeEnter: requireAuth
        },
        {
          path: '/bateria/view/:bateriaId',
          name: 'bateria-view',
          component: load('bateria/BateriaView'),
          beforeEnter: requireAuth
        }
      ]
    },
    {
      path: '*',
      component: load('Error404')
    } // Not found
  ]
})

function requireAuth (to, from, next) {
  Auth.onAuthStateChanged((user) => {
    if (!user) {
      next({
        path: '/login'
      })
      return
    }
    next()
  }, (error) => {
    console.error(error)
  })
}

function onlyGuest (to, from, next) {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      next({
        path: '/'
      })
      return
    }
    next()
  }, (error) => {
    console.error(error)
  })
}
