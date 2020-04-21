import Vue from 'vue';
import VueCookies from 'vue-cookies';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import money from 'v-money';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import apiPlugin from './plugins/api';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(money, {
  precision: 2,
  decimal: ',',
  thousands: '.',
  masked: false,
});

Vue.use(VueRouter);

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);

Vue.use(apiPlugin);

Vue.use(VueCookies);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
