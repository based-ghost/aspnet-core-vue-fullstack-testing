<template>
  <div id="app">
    <navbar />
    <transition :name="$route.meta.transitionName" mode="out-in">
      <router-view />
    </transition>
    <vue-snotify />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar } from '@/components';

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue { }
</script>