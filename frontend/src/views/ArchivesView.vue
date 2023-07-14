<template>
  <div class="container">
    <h1 class="align-left">Papers Archive</h1>

    <p>Here you can download all our issued papers.</p>

    <hr />

    <p v-if="!items">Loading...</p>

    <div class="articles-wrapper" v-else>
      <article class="article" v-for="item of items" :key="item.url">
        <a :href="item.url" target="_blank">Issue No. {{ item.issueNumber }} - {{ getDate(item.createdAt) }}</a>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlesService, { type DownloadPaper } from '@/services/ArticlesService';

export default {
  name: 'ArchivesView',
  created() {
    ArticlesService.getAllDownloads().then((res) => (this.items = res));
  },
  methods: {
    getDate(date: string) {
      return Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'long', day: 'numeric' }).format(Date.parse(date + 'T00:00:00'));
    },
  },
  data() {
    return {
      items: null as DownloadPaper[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 50vh;
}

article {
  padding-top: 0.3em;
}

a {
  text-decoration: underline;

  &:hover {
    font-size: 1.01em;
    text-decoration: underline;
  }
  &:focus,
  &:active {
    text-decoration: underline;
  }
}
</style>
