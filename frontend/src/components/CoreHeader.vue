<template>
  <header class="main-header">
    <div class="header-wrapper">
      <h1>
        <router-link to="/">The Florentine University Gazette</router-link>
      </h1>
      <p class="site-description">
        The University’s Oldest Looking Newspaper™ • Editor: Simone Carletti • Founded 2023 by Floyd Pink
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  name: 'core-header',
  components: {
    RouterLink,
  },
};
</script>

<style scoped lang="scss">
header.main-header {
  background: #fff;

  .header-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 30px 40px 25px 40px;

    h1 {
      font-size: 55px;
      margin: 0;
      word-wrap: break-word;
      font-weight: 700;
      color: #222222;
    }

    .site-description {
      margin: 0;
      line-height: 1.5;
      font-weight: 400;
      font-size: 15px;
      color: #757575;
    }
  }
}
</style>
