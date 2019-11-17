import { Home, Employees } from "@/views";
import { RouteConfig, RouterOptions } from "vue-router";

export type RoutesConfig = { [key: string]: RouteConfig };

export const RoutesConfig = Object.freeze<RoutesConfig>({
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

export const AppRouterOptions: RouterOptions = {
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      component: Home,
      ...RoutesConfig.home
    },
    {
      component: Employees,
      ...RoutesConfig.employee
    }
  ]
};