import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '../pages/index';
import Mobile from '../pages/mobile';
import MobileComp from '../pages/mobile/route-config';
import Animation from '../pages/amimation';
import AnimationComp from '../pages/amimation/route-config';
import VuePages from '../pages/vue/vueIndex';
import VueComp from '../pages/vue/route-config';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: IndexPage
    },
    {
      path: '/mobile',
      component: Mobile,
      children: MobileComp
    },
    {
      path: '/animation',
      component: Animation,
      children: AnimationComp
    },
    {
      path: '/vue',
      component: VuePages,
      children: VueComp
    }
  ]
});
