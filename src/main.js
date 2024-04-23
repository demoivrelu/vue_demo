import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: () => import('./components/HelloWorld.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/DragTest.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('./components/DemoOne.vue'),
    },
  ],
});

Vue.use(VueRouter);
Vue.use(ElementUI);

window.$app = new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
});
