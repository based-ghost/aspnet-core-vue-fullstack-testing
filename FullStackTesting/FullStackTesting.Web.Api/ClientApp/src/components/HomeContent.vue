<template>
  <div class="home-content">
    <h3>{{mainSubTitle}}</h3>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br>check out the
      <a :href="npmLinks.VUE_CLI" target="_blank" rel="noopener noreferrer">vue-cli documentation</a>.
    </p>
    <h3>Frontend (Vue + TypeScript) Testing</h3>
    <ul>
      <li>
        <a :href="npmLinks.UNIT_JEST" target="_blank" rel="noopener noreferrer">unit-jest</a>
      </li>
      <li>
        <a :href="npmLinks.NIGHTWATCH" target="_blank" rel="noopener noreferrer">e2e-nightwatch</a>
      </li>
    </ul>
    <h3>Backend (ASP.NET Core) Testing</h3>
    <ul>
      <li>
        <a :href="npmLinks.X_UNIT" target="_blank" rel="noopener noreferrer">xUnit.net</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { npmLinksConfig } from '../config';

@Component
export default class HomeContent extends Vue {
  @Prop() public readonly mainSubTitle: string;

  public readonly npmLinks: Record<string, string> = npmLinksConfig;
}
</script>