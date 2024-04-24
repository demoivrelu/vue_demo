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
      path: '/cam_multi',
      name: 'cam',
      component: () => import('./pages/CamVideoMulti.vue'),
    },
    {
      path: '/cam',
      name: 'cam',
      component: () => import('./pages/CamVideo_.vue'),
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
