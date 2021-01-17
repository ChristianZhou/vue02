import Vue from 'vue'
import Router from 'vue-router'
import Time from "../views/Time";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Time',
      component: Time
    }
  ]
})
