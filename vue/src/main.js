import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';
import apiPlugin from './plugins/api';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(apiPlugin);

Vue.use(VueCookies);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
