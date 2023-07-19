<template>
  <div class="the-research-journal container">
    <h1 class="align-left">The Research Journal</h1>

    <h2 class="title">Some abstracts from our latest research projects at the University of Nowhere.</h2>

    <hr />

    <div class="search-bar">
      <input type="search" v-model="searchText" placeholder="Search" />
    </div>

    <p v-if="!items">Loading...</p>

    <div class="articles-wrapper" v-else>
      <article class="article" v-for="item of filteredItems" :key="item.slug">
        <h2>{{ item.title }}</h2>
        <div class="description">{{ makeSubtitle(item) }}</div>

        <p>{{ removeMd(item.content) }}</p>
        <router-link :to="item.section + '/' + item.slug" class="button">Read More</router-link>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import type { Article } from '@/services/ArticlesService';
import TheResearchJournalService from '@/services/TheResearchJournalService';
import { RouterLink } from 'vue-router';
import removeMd from 'remove-markdown';

export default {
  name: 'TheResearchJournalView',
  components: {
    RouterLink,
  },
  created() {
    TheResearchJournalService.getAll().then((res) => (this.items = res));
  },
  data() {
    return {
      items: null as Article[] | null,
      searchText: '',
    };
  },
  computed: {
    filteredItems(): Article[] {
      return this.items?.filter((i) => i.title.toLowerCase().includes(this.searchText.toLowerCase())) ?? [];
    },
  },
  methods: {
    removeMd(e: any) {
      return removeMd(e);
    },
    makeSubtitle(a: Article) {
      if (!a) return '';
      const d = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(a.date));
      return `${a.author} | ${d}`;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
  line-height: 1.2em;
  font-weight: 300;
  text-transform: none;
  text-align: left;
  padding-top: 1em;
  overflow: hidden;
  text-overflow: ellipsis;

  @include mobile {
    font-size: 25px;
  }
}

.description {
  font-size: 65%;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
  margin-bottom: 20px;
}

.articles-wrapper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3em;

  @include mobile {
    grid-template-columns: 1fr;
  }
  @include tablet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

.search-bar {
  display: flex;
  gap: 1em;
  margin-bottom: 1.5em;

  input {
    flex: 1;
    font-size: 0.9em;
    padding: 0 0.5em;
  }
  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
    font-size: 0.9em;
  }
}
</style>
