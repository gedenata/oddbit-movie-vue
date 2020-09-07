import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: "*",
      component: () => import("")
    },
    {
      path: "/",
      component: () => import("")
    },
    {
      path: "/movie/:id",
      component: () => import("")
    }
  ]
});
