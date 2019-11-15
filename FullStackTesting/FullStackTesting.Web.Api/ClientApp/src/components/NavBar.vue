<template>
  <nav id="nav" role="navigation" aria-label="main navigation">
    <router-link :to="navRoutes.home.path" :id="navRoutes.home.meta.id">
      {{navRoutes.home.name}}
    </router-link>
    <span>|</span>
    <router-link :to="navRoutes.employee.path" :id="navRoutes.employee.meta.id">
      {{navRoutes.employee.name}}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { routesConfig, RoutesConfig } from "@/router/routes";

@Component
export default class NavBar extends Vue {
  public readonly navRoutes: RoutesConfig = routesConfig;
}
</script>