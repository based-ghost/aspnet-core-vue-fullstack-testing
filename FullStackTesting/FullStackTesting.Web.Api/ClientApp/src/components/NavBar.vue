<template>
  <nav id="nav" role="navigation" aria-label="main navigation">
    <router-link :to="routes.home.path" :id="routes.home.meta.id">{{routes.home.name}}</router-link>
    <span>|</span>
    <router-link :to="routes.employee.path" :id="routes.employee.meta.id">{{routes.employee.name}}</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { routesConfig } from '@/router/routes';

@Component
export default class NavBar extends Vue {
  private readonly routes = routesConfig;
}
</script>