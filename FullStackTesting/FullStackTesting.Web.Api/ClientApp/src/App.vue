<template>
  <div id="app">
    <NavBar />
    <transition :name="$route.meta.transitionName" mode="out-in">
      <router-view />
    </transition>
    <vue-snotify />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue { }
</script>