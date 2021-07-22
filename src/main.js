import Vue from 'vue'
import App from './App.vue'
import loader from "vue-ui-preloader";
Vue.use(loader);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
