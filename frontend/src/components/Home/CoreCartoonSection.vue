<template>
  <section class="section-5">
    <div class="spacing-wrapper">
      <h3>Non-Political Cartoons.</h3>
      <h1>Creativity Corner</h1>
      <p>
        The Florentine University Gazette’s resident starving artist. Over 7 years of bad satire, some whimsical and
        some occasionally irreverent.
      </p>
      <router-link to="non-political-cartoons" class="button">Visit the Gallery</router-link>
      <br />
      <img src="@/assets/img/cartoon.webp" alt="cartoon" style="padding-top: 1.3em" />
    </div>
  </section>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  name: 'core-cartoon-section',
  components: {
    RouterLink,
  },
};
</script>

<style lang="scss" scoped>
section.section-5 {
  text-align: center;
  background: #fff;

  p,
  a.button {
    margin-bottom: 0.8em;
  }

  h1 {
    font-weight: bold;
  }
}
</style>
