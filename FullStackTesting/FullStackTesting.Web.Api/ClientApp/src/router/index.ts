import Vue from "vue";
import { Home, Employees } from "@/views";
import Router, { RouteConfig } from "vue-router";

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      id: "home-link",
      transitionName: "fade"
    },
  },
  {
    path: "/employee",
    name: "Employees",
    component: Employees,
    meta: {
      id: "employee-link",
      transitionName: "pageSlideUp"
    }
  }
];

export default new Router({
  routes,
  mode: "history",
  base: process.env.BASE_URL
});