<template>
  <section class="section-7 without-image">
    <h2>The Research Journal</h2>

    <p class="subtitle">
      Some abstracts from our latest research projects at the University of Nowhere.<br />
      Each one of them is hand crafted by an unpaid intern, so I don't know if you should take them seriously. They may be totally
      fictional.

      <router-link to="/sections/the-research-journal" style="font-style: italic">Read more</router-link>.
    </p>

    <core-carousel :carousel-cards="carouselCards" v-if="carouselCards"></core-carousel>
    <p style="padding: 0 1.5em" v-else>Loading...</p>
  </section>
</template>

<script lang="ts">
import CoreCarousel from '@/components/CoreCarousel.vue';
import TheResearchJournalService from '@/services/TheResearchJournalService';
import { RouterLink } from 'vue-router';

export default {
  name: 'core-carousel-section',
  components: {
    CoreCarousel,
    RouterLink,
  },
  async created() {
    // Get the latest 30 articles from the research journal with 'short' month in the title
    const c: any = await TheResearchJournalService.getAll(30, 'short');
    c.forEach((e: any) => (e.url = `/the-research-journal/${e.id}`));
    c.forEach((e: any) => e.url = `/sections/the-research-journal/${e.slug}`);
    this.carouselCards = c;
  },
  data() {
    return {
      carouselCards: null as any[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
p.subtitle {
  text-align: center;
  margin-bottom: 1.5em;
}
</style>
