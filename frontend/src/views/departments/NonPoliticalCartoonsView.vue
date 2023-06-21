<template>
  <div class="cartoons container">
    <h1 class="align-left">Non-Political Cartoons</h1>

    <p>Some of our favorites from The Florentine University Gazette’s resident starving artist.</p>

    <p v-if="!cartoons">Loading...</p>

    <figure v-for="c of cartoons" :key="c.src">
      <img :src="c.src" alt="cartoon" />
      <figcaption>{{ c.caption }}</figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import CartoonsService, { type CartoonItem } from '@/services/CartoonsService';

export default {
  name: 'NonPoliticalCartoonsView',
  created() {
    CartoonsService.getCartoons().then((res) => (this.cartoons = res));
  },
  data() {
    return {
      cartoons: null as CartoonItem[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
figure {
  margin-bottom: 2em;

  img {
    mix-blend-mode: darken;
    display: block;
    margin: 0 auto 0;
    max-width: 100%;
  }

  figcaption {
    font-size: 75%;
    padding-top: 5px;
    opacity: 0.8;
    font-style: italic;
  }
}
</style>
