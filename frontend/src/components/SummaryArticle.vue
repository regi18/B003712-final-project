<template>
  <article class="article">
    <h2>{{ article.title }}</h2>
    <span class="subtitle">{{ article.subtitle }}</span>

    <img :src="article.img" onerror="this.style.display='none'" />

    <p class="article-content">{{ removeMd(article.content) }}</p>

    <div class="actions">
      <span class="action-item">
        <i class="fa fa-folder"></i>
        <span>{{ article.section }}</span>
      </span>

      <span class="action-item">
        <i class="fa fa-tag"></i>
        <span>Issue No. {{ article.issueNumber }}</span>
      </span>
    </div>

    <router-link :to="article.url" class="button">Read More</router-link>
  </article>
</template>

<script lang="ts">
import type { SummaryArticle } from '@/services/ArticlesService';
import type { PropType } from 'vue';
import removeMd from 'remove-markdown';

export default {
  name: 'SummaryArticle',
  props: {
    article: {
      type: Object as PropType<SummaryArticle>,
      required: true,
    },
  },
  methods: {
    removeMd(e: any) {
      return removeMd(e);
    },
  },
};
</script>

<style lang="scss" scoped>
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

.button {
  font-size: 0.7rem;
  margin-top: 2em;
}

.actions {
  font-size: 0.8rem;
  color: #595959;

  display: flex;
  flex-direction: column;
  margin-top: 1em;

  i {
    margin-right: 0.5em;
  }
}
</style>