<template>
  <div class="home-content">
    <h3>{{ mainSubTitle }}</h3>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br>check out the
      <a :href="npmLinks.VUE_CLI" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Frontend (Vue + TypeScript) Testing</h3>
    <ul>
      <li>
        <a :href="npmLinks.UNIT_JEST" target="_blank" rel="noopener">unit-jest</a>
      </li>
      <li>
        <a :href="npmLinks.NIGHTWATCH" target="_blank" rel="noopener">e2e-nightwatch</a>
      </li>
    </ul>
    <h3>Backend (ASP.NET Core) Testing</h3>
    <ul>
      <li>
        <a :href="npmLinks.X_UNIT" target="_blank" rel="noopener">xUnit.net</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { npmLinksConfig } from '@/utils/constants';

@Component
export default class HomeContent extends Vue {
  private readonly npmLinks = npmLinksConfig;
  @Prop({ default: "" }) private mainSubTitle: string;
}
</script>

<style scoped lang="scss">
h3 {
  font-size: 1.4rem;
  font-weight: 600;
  padding-bottom: 0.5rem;

  @media (max-width: 769px) {
    font-size: 1.15rem;
  }
}
.home-content > h3:not(:first-child) {
  margin: 35px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $green;
  font-weight: 600;
  text-decoration: underline;
}
</style>
