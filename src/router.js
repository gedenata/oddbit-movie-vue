import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: "*",
      name: "404",
      component: () => import("./views/Error.vue")
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("./views/Movie.vue")
    }
  ]
});
