<template>
  <section class="section-2 without-image">
    <h2>Read the Latest Articles From Staff Members<br />–=≈=–</h2>

    <div class="article-wrapper">
      <SummaryArticle v-for="item of articles" :article="item" :key="item.slug" />
    </div>
  </section>
</template>

<script lang="ts">
import ArticlesService, { type SummaryArticle } from '@/services/ArticlesService';
import SummaryArticleVue from '../SummaryArticle.vue';

export default {
  name: 'core-latest-paper-section',
  components: {
    SummaryArticle: SummaryArticleVue,
  },
  created() {
    ArticlesService.getAll(4, 'staff-articles').then((res) => {
      this.articles = res;
    });
  },
  methods: {
    removeMd(e: any) {
      return removeMd(e);
    },
  },
  data() {
    return {
      articles: null as SummaryArticle[] | null,
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin articleLayout($sizes) {
  @for $i from 1 through length($sizes) {
    &:nth-child(#{$i}) {
      grid-column: span nth($sizes, $i);
    }
  }
}

// -------------------

section.section-2 {
  .article-wrapper {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 20px;

    // article {
    :deep(article) {
      margin: 1.5em 0;

      @include articleLayout((7, 3, 5, 5));

      @include tablet {
        @include articleLayout((5, 5, 5, 5));
      }

      @include mobile {
        @include articleLayout((10, 10, 10, 10));
      }

      h2 {
        padding-top: 0;
      }

      .subtitle {
        font-size: 65%;
        color: rgba(0, 0, 0, 0.5);
      }

      p {
        font-size: 65%;
        margin-bottom: 1em;
      }
    }
  }
}
</style>
