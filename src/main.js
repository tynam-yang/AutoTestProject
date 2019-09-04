import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Routes from './routes';
import util from './Util';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes
});

router.beforeEach((to, from, next) => {
  var loginSatus = util.getCookie('loginSatus');
  if (((!loginSatus && to.path !== '/') || (loginSatus && to.path == '/')) && from.path !== to.path){
    next(from.path)
  } else {
    next();
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
