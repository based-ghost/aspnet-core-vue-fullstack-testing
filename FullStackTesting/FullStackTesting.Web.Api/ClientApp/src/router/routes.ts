import { RouterOptions, RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Employees from "@/views/Employees.vue";

export type RoutesConfig = { [key: string]: RouteConfig };

export const routesConfig = Object.freeze<RoutesConfig>({
  home: {
    path: "/",
    name: "Home",
    meta: {
      id: "home-link",
      transitionName: "fade"
    }
  },
  employee: {
    path: "/employee",
    name: "Employees",
    meta: {
      id: "employee-link",
      transitionName: "pageSlideUp"
    }
  }
});

export const routerOptions: RouterOptions = {
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      component: Home,
      ...routesConfig.home
    },
    {
      component: Employees,
      ...routesConfig.employee
    }
  ]
};
