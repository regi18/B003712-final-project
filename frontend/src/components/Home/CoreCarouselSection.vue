<template>
  <section class="section-7 without-image">
    <h2>The Research Journal</h2>

    <p class="subtitle">
      Some abstracts from our latest research projects at the University of Nowhere.<br />
      Each one of them is hand crafted by an unpaid intern, so I don't know if you should take them seriously. They may be totally
      fictional.

      <router-link to="the-research-journal" style="font-style: italic">Read more</router-link>.
    </p>

    <core-carousel :carousel-cards="carouselCards" v-if="carouselCards"></core-carousel>
    <p style="padding: 0 1.5em" v-else>Loading...</p>
  </section>
</template>

<script lang="ts">
import CoreCarousel from '@/components/CoreCarousel.vue';
import TheResearchJournalService, { type ResearchJournalArticle } from '@/services/TheResearchJournalService';
import { RouterLink } from 'vue-router';

export default {
  name: 'core-carousel-section',
  components: {
    CoreCarousel,
    RouterLink,
  },
  async created() {
    const res: any[] = await TheResearchJournalService.getAll();
    // Create title from date (in format "Mon, Jan 1")
    res.forEach(
      (e) =>
        (e.title = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'short', day: 'numeric' }).format(
          Date.parse(e.date + 'T00:00:00')
        ))
    );
    this.carouselCards = res;
  },
  data() {
    return {
      carouselCards: null as ResearchJournalArticle[] | null,
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
