<template>
  <div class="staff-articles container">
    <h1>Read the lastest articles</h1>
    <p v-if="!items">Loading...</p>

    <template v-else>
      <!-- Make first article bigger -->
      <article class="first-article">
        <h2>{{ items[0].title }}</h2>
        <span class="subtitle">{{ items[0].subtitle }}</span>
        <img :src="items[0].imgSrc" alt="article-image" />
        <p class="article-content">{{ items[0].content }}</p>
        <router-link :to="items[0].url" class="button">Read More</router-link>
      </article>

      <div class="articles-wrapper">
        <template v-for="(item, index) of items">
          <article class="article" :key="item.url" v-if="index !== 0">
            <h2>{{ item.title }}</h2>
            <span class="subtitle">{{ item.subtitle }}</span>
            <img :src="item.imgSrc" alt="article-image" />
            <p class="article-content">{{ item.content }}</p>
            <router-link :to="item.url" class="button">Read More</router-link>
          </article>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import ArticlesService, { type SummaryArticle } from '@/services/ArticlesService';
import { RouterLink } from 'vue-router';

export default {
  name: 'StaffArticlesView',
  components: {
    RouterLink,
  },
  created() {
    ArticlesService.getAll().then((res) => (this.items = res));
  },
  data() {
    return {
      items: null as SummaryArticle[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1.5em;
}

h2 {
  font-size: 30px;
  line-height: 0.8em;
  font-weight: 300;
  text-transform: none;
  text-align: left;
  padding-top: 1em;

  @include mobile {
    font-size: 25px;
  }
}

.subtitle {
  font-size: 0.8rem;
  margin-top: -10px;
}

img {
  mix-blend-mode: darken;
  margin-top: 1em;
}

p.article-content {
  margin: 0;
  margin-top: 1em;
  font-size: 0.8rem;
}

.articles-wrapper {
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3em;

  @include mobile {
    grid-template-columns: 1fr;
  }
}

.button {
  font-size: 0.7rem;
  margin-top: 2em;
}
</style>
