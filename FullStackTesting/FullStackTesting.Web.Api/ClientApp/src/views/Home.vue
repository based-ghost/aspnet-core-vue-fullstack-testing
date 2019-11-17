<template>
  <div class="home">
    <div class="is-horizontal-center">
      <figure class="image is-200x200">
        <img src="@/assets/img/logo.png" alt="Vue logo" />
      </figure>
    </div>
    <h1 class="title main-title">Full Stack Testing</h1>
    <hr>
    <home-content mainSubTitle="Project scaffolded with Vue CLI"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeContent from '@/components/HomeContent.vue';

@Component({
  components: {
    HomeContent,
  },
})
export default class Home extends Vue {}
</script>
