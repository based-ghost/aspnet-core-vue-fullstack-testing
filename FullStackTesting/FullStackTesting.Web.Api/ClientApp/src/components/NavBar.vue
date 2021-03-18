<template>
  <nav
    id="nav"
    role="navigation"
    aria-label="main navigation"
  >
    <router-link
      v-for="route in $router.options.routes"
      :key="route.path"
      :to="route.path"
      :id="route.meta.id"
    >
      {{route.name}}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>