<template functional>
  <div id="load-spinner" v-show="!!props.show">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Spinner extends Vue { }
</script>