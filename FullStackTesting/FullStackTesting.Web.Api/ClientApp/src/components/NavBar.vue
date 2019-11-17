<template>
  <nav id="nav" role="navigation" aria-label="main navigation">
    <router-link :to="routesConfig.home.path" :id="routesConfig.home.meta.id">
      {{routesConfig.home.name}}
    </router-link>
    <span>|</span>
    <router-link :to="routesConfig.employee.path" :id="routesConfig.employee.meta.id">
      {{routesConfig.employee.name}}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RoutesConfig } from "@/config/routes.config";

@Component
export default class NavBar extends Vue {
  public readonly routesConfig: RoutesConfig = RoutesConfig;
}
</script>