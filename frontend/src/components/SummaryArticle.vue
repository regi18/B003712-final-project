<template>
  <article class="article">
    <router-link :to="article.url" class="title-link"
      ><h2>{{ article.title }}</h2></router-link
    >
    <span class="subtitle">{{ article.subtitle }}</span>

    <router-link :to="article.url" class="title-link" v-if="showImage">
      <figure v-if="article.img">
        <img :src="article.img" :alt="article.title" onerror="this.style.display='none'" />
      </figure>
    </router-link>

    <p class="article-content">{{ removeMd(article.content) }}</p>

    <div class="tags">
      <router-link :to="'/sections/' + article.section" class="tags-item" v-if="showSection">
        <i class="fa fa-folder"></i>
        <span>{{ getSectionTitle(article) }}</span>
      </router-link>

      <router-link :to="'/issues/' + article.issueNumber" class="tags-item">
        <i class="fa fa-tag"></i>
        <span>Issue No. {{ article.issueNumber }}</span>
      </router-link>
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
    showImage: {
      type: Boolean,
      default: true,
    },
    showSection: {
      type: Boolean,
      default: false,
    },
    sections: {
      type: Object,
      default: null,
    },
  },
  methods: {
    removeMd(e: any) {
      return removeMd(e);
    },
    getSectionTitle(a: SummaryArticle) {
      return this.sections?.[a.section]?.title ?? a.section;
    },
  },
};
</script>

<style lang="scss" scoped>
a:not(.title-link):hover {
  text-decoration: underline;
}

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

.subtitle {
  font-size: 0.8rem;
  margin-top: -10px;
}

figure {
  margin: 0 0 0.7em;
  text-align: center;

  img {
    margin-top: 1em;
    mix-blend-mode: darken;
    max-width: 100%;
  }
}

p.article-content {
  margin: 0;
  margin-top: 1em;
  font-size: 0.9rem;
}

.button {
  font-size: 0.7rem;
  margin-top: 2em;
}

.tags {
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
