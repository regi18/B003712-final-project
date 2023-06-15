<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<script lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

export default {
  mounted() {
    this.setScreenSize();
    window.addEventListener('resize', this.setScreenSize);
  },
  data() {
    return {
      currentScreenSize: null as string | null,
    };
  },
  provide() {
    return {
      currentScreenSize: computed(() => this.currentScreenSize),
    };
  },
  methods: {
    // Set a variable on body:before that signals the screen size
    setScreenSize() {
      this.currentScreenSize = window
        .getComputedStyle(document.querySelector('body') as Element, ':before')
        .getPropertyValue('content')
        .replace(/"/g, '');
    },
  },
};
</script>

<style lang="scss">
</style>
