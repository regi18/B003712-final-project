<template>
  <section class="section-2 without-image">
    <h2>Read the Latest Paper Online<br />–=≈=–</h2>

    <div class="article-wrapper">
      <article v-for="a of articles" :key="a.url">
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
          <router-link class="button" :to="a.url">Read More</router-link>

          <!-- <div class="socials">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook-f"></i>
          </div> -->
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  name: 'core-latest-paper-section',
  components: {
    RouterLink,
  },
  data() {
    return {
      articles: [
        {
          title: 'Justice Deferred? Or Defunct?',
          description: 'March 10, 2023 | The Fortnightly Rant',
          imgUrl: './resources/img/Waiting-for-Garland-655x465.jpg',
          p: 'Watching Vladimir and Estragon on a nearly bare stage as they wait for Godot can, paradoxically, be a thrilling experience. Waiting for Merrick Garland to slap the cuffs on The Former Guy, on the other hand, is beginning to get tedious. Talk about pent-up demand. If Ticketmaster could sell seats to a DJT Perp Walk, its ensuing collapse would make last year’s Taylor Swift fiasco look like business as usual. And yet, we wait…and wait…. What—a seething nation might ask, boiling over in exasperation, had…',
          url: '',
        },
        {
          title: 'A Brief Dispatch Regarding the Impending Coronation',
          description: 'March 10, 2023 | The Alleged News®',
          imgUrl: './resources/img/Black-History-275x202.jpg',
          p: 'The U.S. and the U.K., said George Bernard Shaw, are two nations separated by a common language. Further distinguishing us from our former colonial master is our form of government—though GOP opposition to monarchy seems increasingly squishy. Our editorial position on monarchy was most recently published on February 10th, with a selection from Thomas Paine’s, Common Sense; herewith, a more succinct version: Britain’s first king was “nothing better than the principal ruffian of some restless…',
          url: '',
        },
        {
          title: 'Snowflake Culture',
          description: 'February 11, 2023 | The Northcountry Chronicle',
          p: 'by W.D. Ehrhart I have been writing poetry ever since I was 15 years old. My first published work appeared in 1971 when I was 22 years old. Since then, I’ve published over 400 poems. Along the way, I’ve probably received as many as 4,000…',
          url: '',
        },
        {
          title: 'Merrimack Station: A Fifty Year N.H. Disaster Continues',
          description: 'February 11, 2023 | Mash Notes, Hate Mail & Other Correspondence',
          p: 'by Roy Morrison Merrimack Station, the coal fired power plant on the banks of the Merrimack River in Bow, New Hampshire, has recently passed its fiftieth anniversary. It’s New England’s last remaining coal plant. It’s also N.H.’s largest point source of carbon pollution. The plant…',
          url: '',
        },
      ],
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
