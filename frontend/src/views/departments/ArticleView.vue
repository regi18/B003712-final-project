<template>
  <div class="article container">
    <template v-if="!article">Loading...</template>

    <article class="first-article" v-else>
      <h1 class="article-title">{{ article.title }}</h1>
      <span class="subtitle">{{ subtitle }}</span>

      <img :src="article.img" onerror="this.style.display='none'" />

      <VueMarkdown :source="article.content" />
    </article>
  </div>
</template>

<script lang="ts">
import ArticlesService, { type Article } from '@/services/ArticlesService';
import VueMarkdown from 'vue-markdown-render';

export default {
  name: 'ArticleView',
  components: {
    VueMarkdown,
  },
  async created() {
    try {
      this.article = await ArticlesService.getArticle(this.$route.params.slug as string);
    } catch (e) {
      // Error, section not found
      this.$router.push({ path: '/404' });
    }
  },
  data() {
    return {
      article: null as Article | null,
    };
  },
  computed: {
    subtitle() {
      if (!this.article) return '';
      const d = Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'long', day: 'numeric' }).format(Date.parse(this.article.date));
      return `${d} | ${this.article.author} | Issue No. ${this.article.issueNumber}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-title {
  font-size: 40px;
  font-weight: bold;
  line-height: 0.8em;
  text-transform: none;
  text-align: left;
  margin-bottom: 0.1em;

  @include mobile {
    font-size: 35px;
  }
}

.subtitle {
  font-size: 0.9rem;
  margin-left: 0.3em;
}

img {
  mix-blend-mode: darken;
  margin-top: 1em;
  margin-bottom: 1em;
}

:deep(p) {
  margin-top: 1.3em !important;

  &::first-letter {
    initial-letter: 2 !important;
    line-height: 53px;
    padding-top: 10px;
    padding-right: 13px;
    padding-left: 4px;
  }
}
</style>
