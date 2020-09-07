import Vue from "vue";
import VueLazyload from "vue-lazyload";

import "animate.css/animate.css";
import "hover.css/css/hover.css";
import "bootstrap-css-only/css/bootstrap-reboot.css";
import "bootstrap-css-only/css/bootstrap-grid.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueLazyload);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
