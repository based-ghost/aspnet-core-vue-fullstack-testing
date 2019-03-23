<template>
  <div class="home-content">
    <h3>{{ mainSubTitle }}</h3>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br>check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Frontend (Vue + TypeScript) Testing</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest"
          target="_blank"
          rel="noopener"
        >unit-jest</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
          target="_blank"
          rel="noopener"
        >e2e-nightwatch</a>
      </li>
    </ul>
    <h3>Backend (ASP.NET Core) Testing</h3>
    <ul>
      <li>
        <a href="https://xunit.github.io/" target="_blank" rel="noopener">xUnit.net</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HomeContent extends Vue {
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
