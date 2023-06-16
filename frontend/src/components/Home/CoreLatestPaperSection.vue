<template>
  <section class="section-2 without-image">
    <h2>Read the Latest Paper Online<br />–=≈=–</h2>

    <div class="article-wrapper">
      <article v-for="a of articles" :key="a.id">
        <header>
          <h2>
            <a>{{ a.title }}</a>
          </h2>
          <div class="description">{{ a.description }}</div>
        </header>

        <figure v-if="!!a.imgUrl">
          <img :src="a.imgUrl" :alt="a.title" />
        </figure>

        <p>{{ a.p }}</p>

        <div class="actions">
          <a class="button"> Read More </a>

          <div class="socials">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook-f"></i>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'core-latest-paper-section',
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

    article {
      margin: 1.5em 0;

      @include articleLayout((7, 3, 5, 5));

      @include tablet {
        @include articleLayout((5, 5, 5, 5));
      }

      @include mobile {
        @include articleLayout((10, 10, 10, 10));
      }

      header {
        margin-bottom: 1em;

        h2 {
          text-align: left;
        }

        .description {
          font-size: 65%;
          color: rgba(0, 0, 0, 0.5);
        }
      }

      figure {
        margin: 0 0 0.7em;
        text-align: center;

        img {
          mix-blend-mode: darken;
          max-width: 100%;
        }
      }

      p {
        font-size: 65%;
        margin-bottom: 1em;
      }

      .actions {
        display: flex;
        justify-content: space-between;

        .socials i {
          color: #737373;
          margin-right: 0.6em;
          font-size: 0.6em;
        }
      }
    }
  }
}
</style>
