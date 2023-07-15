<template>
  <div class="staff-articles container">
    <h1>{{ sectionTitle }}</h1>
    <p v-if="!items">Loading...</p>
    <p v-else-if="items.length === 0">No articles found.</p>

    <template v-else>
      <!-- Make first article bigger -->
      <article class="first-article">
        <SummaryArticle :article="items[0]" />
      </article>

      <div class="articles-wrapper">
        <SummaryArticle v-for="(item, index) of items" :key="item.url" :article="item" v-if="index !== 0" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { get } from '@/services/AjaxService';
import ArticlesService, { type SummaryArticle } from '@/services/ArticlesService';
import SummaryArticleVue from '@/components/SummaryArticle.vue';

export default {
  name: 'ArticlesView',
  components: {
    SummaryArticle: SummaryArticleVue,
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.items = null;
      this.section = this.$route.params.section as string;

      try {
        let s = await get('sections/' + this.section);
        this.sectionTitle = s.title;
      } catch (e) {
        // Error, section not found
        this.$router.push({ path: '/404' });
      }

      ArticlesService.getAll(null, this.section).then((res) => (this.items = res));
    },
  },
  watch: {
    $route(to, from) {
      this.load();
    },
  },
  data() {
    return {
      items: null as SummaryArticle[] | null,
      section: '',
      sectionTitle: '',
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1.5em;
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
</style>
