import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventList2 from '../views/EventList2.vue'
import EventShow from '../views/EventShow.vue'
import Login from '../views/Login'
import User from '../views/User.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/sort',
    name: 'event-list2',
    component: EventList2
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
