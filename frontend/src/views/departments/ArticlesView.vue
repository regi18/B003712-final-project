<template>
  <div class="staff-articles container">
    <h1>{{ sectionTitle }}</h1>
    <p v-if="!items">Loading...</p>
    <p v-else-if="items.length === 0">No articles found.</p>

    <template v-else>
      <!-- Make first article bigger -->
      <article class="first-article">
        <SummaryArticle :article="items[0]" :showSection="!section" :sections="sections" />
      </article>

      <div class="articles-wrapper">
        <template v-for="(item, index) of items" :key="item.url">
          <SummaryArticle :article="item" v-if="index !== 0" :showSection="!section" :sections="sections" />
        </template>
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

      if (this.section !== 'all') {
        try {
          let s = await get('sections/' + this.section);
          this.sectionTitle = s.title;
        } catch (e) {
          // Error, section not found
          this.$router.push({ path: '/404' });
        }
      } else {
        this.sectionTitle = 'All Articles';
        this.section = undefined;
        this.sections = await get('sections').then((e) => e.reduce((a: any, v: any) => ({ ...a, [v.slug]: v }), {}));
      }

      this.items = await ArticlesService.getAll(null, this.section);
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
      section: '' as string | undefined,
      sectionTitle: '',
      sections: null as any,
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
