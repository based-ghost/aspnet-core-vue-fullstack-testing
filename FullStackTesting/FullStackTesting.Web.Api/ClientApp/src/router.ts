import Vue from "vue";
import VueRouter from "vue-router";
import { AppRouterOptions } from "@/config/routes.config";

Vue.use(VueRouter);

export default new VueRouter(AppRouterOptions);
