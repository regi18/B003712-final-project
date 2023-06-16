<template>
  <main>
    <!-- INFO PANEL -->
    <section class="presentation-banner">
      <div class="wrapper">
        <h3>The Nation’s Oldest Newspaper.</h3>
        <h1>
          A svelte, one-ounce packet<br />
          of unfettered, non-fiction news.
        </h1>
        <p>
          Published 26 times a year on alternating Fridays.<br />
          Distributed for free by people just like you.<br />
          Help us cover the first district, the second and beyond.
        </p>
        <p>
          <a class="button">Learn More</a>
        </p>
      </div>
    </section>

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

    <section class="section-3 without-image">
      <h2>Download the Latest Paper</h2>
      <p class="divider">–=≈=–</p>

      <div class="download-wrapper">
        <h2>
          <a href="">Volume 267, No. 14; March 24, 2023</a>
        </h2>
        <div class="content">
          <p>
            <strong>March 24, 2023 —</strong> To download this issue of our paper, just click on the image at right.
          </p>
          <img src="./assets/img/267_14.png" alt="Gazette Front Page" />
        </div>
      </div>
    </section>

    <section class="section-4 black-bar-section">
      <div class="wrapper">
        <h2>Politics on paper since October 7, 1756</h2>
        <p>
          A newspaper, a third cousin five times removed,<br />
          a freelance insurgency.
          <a href="">Watch the video</a>.
        </p>
      </div>
    </section>

    <section class="section-5">
      <div class="spacing-wrapper">
        <h3>Political Cartoons.</h3>
        <h1>Mike Dater’s Corner</h1>
        <p>
          The New Hampshire Gazette’s resident starving artist. Over 20 years of political satire, some whimsical and
          some occasionally irreverent.
        </p>
        <a href="" class="button">Visit the Gallery</a>
        <img src="./assets/img/mike-dater-frankenmitch.jpg" alt="cartoon" />
      </div>
    </section>

    <section class="section-6 black-bar-section">
      <div class="wrapper">
        <p>
          “Thanks again, as always, for making the now really bad news somewhat easier to tolerate. The truth, which is
          now seldom spoken, and never spoken by our nation’s “Liar in Chief,” just keeps getting worse and worse. I am
          thankful for our still (for now, anyway) free press and late night television comedians’ rants posted on
          Youtube about the state of our country.”
        </p>
        <p>— E.S., Dover, N.H.</p>
      </div>
    </section>

    <section class="section-7 without-image">
      <h2>
        Admiral Fowle’s Piscataqua River Tidal Guide<br />
        (Not for Navigational Purposes)
      </h2>

      <p class="subtitle">
        Portsmouth, arguably the first town in this country not founded by religious extremists, is bounded on the north
        and east by the Piscataqua River, the second, third, or fourth fastest-flowing navigable river in the country…
        <a href="https://www.nhgazette.com/page-eight/">read more</a>.
      </p>

      <core-carousel :carousel-cards="carouselCards"></core-carousel>
    </section>
  </main>
</template>

<script lang="ts">
import CoreCarousel from '@/components/CoreCarousel.vue';

export default {
  components: {
    CoreCarousel,
  },
  data() {
    return {
      articles: [{ id: 0, title: '', description: '', imgUrl: '', p: '' }],
      carouselCards: [
        {
          title: 'Mon, Apr 3',
          p: '2014—Sen. Jerry Moran [R-Kan.], whose top contributor is Koch Industries, reads into the Congressional Record a Wall Street Journal op-ed in which Charles Koch defends his right to spend millions…',
        },
        {
          title: 'Sun, Apr 2',
          p: '2014—In McCutcheon v. FEC, the Supreme Court rules that rich folks deserve to have more influence in elections than the unwashed proletariat. 1982—U.S. Ambassador to the U.N. Jeanne Kirkpatrick dines…',
        },
        {
          title: 'Sat, Apr 1',
          p: '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens keeping…',
        },
        {
          title: 'Fri, Mar 31',
          p: '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed from…',
        },
        {
          title: 'Thurs, Mar 30',
          p: '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush is…',
        },
      ],
    };
  },
  created() {
    // // Fetch articles (only last 4)
    // fetch('./assets/articles.json')
    //   .then((response) => response.json())
    //   .then((e) => (this.articles = e.slice(0, 4)));
    // // Fetch carousel cards
    // fetch('./assets/carouselCards.json')
    //   .then((response) => response.json())
    //   .then((e) => (this.carouselCards = e));
  },
};
</script>

<style lang="scss" scoped>
section.presentation-banner {
  border-bottom: 20px solid #303030;

  .wrapper {
    padding: 55px 35px;
    background-image: linear-gradient(0deg, rgba(51, 51, 51, 0.05), rgba(51, 51, 51, 0.05)),
      url(../resources/img/nhgazette-hero.jpg);
    background-size: cover;

    @include mobile {
      padding: 55px 30px;
    }

    h1 {
      font-weight: bold;
    }

    p {
      text-align: center;
      margin-bottom: 0.8em;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
