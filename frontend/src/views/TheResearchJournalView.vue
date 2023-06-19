<template>
  <div class="the-research-journal container">
    <h1 class="align-left">The Research Journal</h1>

    <h2 class="title">Some abstracts from our latest research projects at the University of Nowhere.</h2>

    <hr />

    <p v-if="!items">Loading...</p>

    <div class="articles-wrapper" v-else>
      <article class="article" v-for="item of items" :key="item.url">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <router-link :to="item.url" class="button">Read More</router-link>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import TheResearchJournalService from '@/services/TheResearchJournalService';
import { RouterLink } from 'vue-router';

export default {
  name: 'TheResearchJournalView',
  components: {
    RouterLink,
  },
  created() {
    TheResearchJournalService.getAllSummary().then((res) => {
      this.items = res.map((e) => ({
        ...e,
        title: Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(e.date + 'T00:00:00')),
      }));
    });
  },
  data() {
    return {
      items: null as any[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
  margin-bottom: 20px;
  line-height: 1.2em;
  font-weight: 300;
  text-transform: none;
  text-align: left;
  padding-top: 1em;

  @include mobile {
    font-size: 25px;
  }
}

.articles-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3em;

  @include mobile {
    grid-template-columns: 1fr;
  }
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  p {
    margin: 0;
    font-size: 65%;
  }

  .button {
    font-size: 0.7rem;
    margin-top: 2em;
  }
}
</style>
