<template>
  <div class="staff-articles container">
    <h1>{{ sectionTitle }}</h1>

    <div class="filters" v-if="isAllArticles">
      <div class="filter" style="flex: 2">
        <label for="">Departments</label>
        <select v-model="section" @change="load()">
          <option :value="null">All</option>
          <option v-for="s in sections" :key="s.slug" :value="s.slug">
            {{ s.title }}
          </option>
        </select>
      </div>

      <div class="filter">
        <label for="">Issue No.</label>
        <select v-model="issueNumber" @change="load()">
          <option :value="null">All</option>
          <option v-for="i in issueNumbers" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
      </div>
    </div>

    <div class="search-bar">
      <input type="search" v-model="searchText" placeholder="Search" />
      <!-- <button class="button" @click="onSearch" @keyup.enter="onSearch">Search</button> -->
    </div>

    <p v-if="!items">Loading...</p>
    <p v-else-if="filteredItems.length === 0">No articles found.</p>

    <template v-else>
      <!-- Make first article bigger -->
      <article class="first-article">
        <SummaryArticle :article="filteredItems[0]" :showSection="!section || isAllArticles" :sections="sections" />
      </article>

      <div class="articles-wrapper">
        <template v-for="(item, index) of filteredItems" :key="item.url">
          <SummaryArticle :article="item" v-if="index !== 0" :showSection="!section || isAllArticles" :sections="sections" />
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
    this.init();
  },
  methods: {
    async init() {
      this.items = null;
      this.section = this.$route.params.section as string;

      // Show articles from the selected section
      if (this.section && this.section !== 'all') {
        try {
          let s = await get('sections/' + this.section);
          this.sectionTitle = s.title;
        } catch (e) {
          // Error, section not found
          this.$router.push({ path: '/404' });
        }
      }
      // Show articles from the selected issue
      else if (this.$route.name === 'articles-by-issue') {
        this.sectionTitle = 'Issue No. ' + this.$route.params.issue;
        this.section = null;
        this.issueNumber = +this.$route.params.issue;
      }
      // Show all articles from all sections
      else {
        this.sectionTitle = 'All Articles';
        this.section = null;
        this.sections = await get('sections').then((e) => e.reduce((a: any, v: any) => ({ ...a, [v.slug]: v }), {}));
        this.issueNumbers = await get('issues');
      }

      this.load();
    },
    async load() {
      this.items = await ArticlesService.getAll(null, this.section, this.issueNumber);
    },
    onSearch(e: any) {
      console.log(this.searchText);
      // this.items = ArticlesService.search(e.target.value, this.items);
    },
  },
  computed: {
    isAllArticles(): boolean {
      return this.$route.name === 'all-articles';
    },
    filteredItems(): SummaryArticle[] {
      return this.items?.filter((i) => i.title.toLowerCase().includes(this.searchText.toLowerCase())) ?? [];
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  data() {
    return {
      items: null as SummaryArticle[] | null,
      section: '' as string | null,
      sectionTitle: '',
      sections: null as any,
      issueNumber: null as number | null,
      issueNumbers: [] as number[],
      searchText: '',
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

.filters {
  display: flex;
  gap: 1em;
  margin-top: -1em;
  margin-bottom: 1em;
  min-width: 0;

  .filter {
    display: flex;
    flex-direction: column;
    flex: 1;

    select {
      font-size: 0.85em;
      width: 100%;
    }

    label {
      font-size: 0.8em;
      color: #666;
    }
  }
}

.search-bar {
  display: flex;
  gap: 1em;
  margin-bottom: 1.5em;
  // font-size: 0.9em;

  input {
    flex: 1;
    font-size: 0.9em;
    padding: 0 0.5em;
  }
  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
    font-size: 0.9em;
  }

  button {
    padding: 0.3em 0.5em;
    line-height: 1.3em;
  }
}
</style>
