<template>
  <main>
    <!------------------------->
    <!-- PRESENTATION BANNER -->
    <!------------------------->
    <section class="presentation-banner">
      <div class="wrapper">
        <h3>The University’s Oldest Looking Newspaper.</h3>
        <h1>
          A svelte, zero-gram packet<br />
          of unfettered, all-fiction news.
        </h1>
        <p>
          Published once every galactic year on Friday.<br />
          Distributed for free by someone.<br />
        </p>
      </div>
    </section>

    <!-------------------------->
    <!-- LATEST PAPER SECTION -->
    <!-------------------------->
    <CoreLatestPaperSection />
    
    <!----------------------------------->
    <!-- DOWNLOAD LATEST PAPER SECTION -->
    <!----------------------------------->
    <CoreDownloadLatestPaperSection />

    <!--------------->
    <!-- SOME INFO -->
    <!--------------->
    <section class="section-4 black-bar-section">
      <div class="wrapper">
        <h2>Something on paper since December 19, 2023</h2>
        <p>
          A newspaper, maybe. Full of uninteresting and totally non-fake news.<br />
          A heaven for the creatives, a hell for the strict.<br />
          <a target="_blank" href="https://youtu.be/BDxKniPIOeA">Watch the video</a>.
        </p>
      </div>
    </section>

    <!-------------->
    <!-- CARTOONS -->
    <!-------------->
    <CoreCartoonSection />

    <!----------->
    <!-- QUOTE -->
    <!----------->
    <section class="section-6 black-bar-section">
      <div class="wrapper">
        <p>
          ”In the kaleidoscopic tapestry of existence, where the threads of reality intertwine with the whimsy of the
          unknown, behold a harmonious cacophony of bewildering paradoxes and tantalizing enigmas. Through the looking
          glass of boundless imagination, the fabric of conventional wisdom unravels, giving rise to a whimsical
          menagerie of nonsensical wonders.”
        </p>
        <p>— C.G., Open, A.I.</p>
      </div>
    </section>

    <!---------------------->
    <!-- CAROUSEL SECTION -->
    <!---------------------->
    <CoreCarouselSection />
  </main>
</template>

<script lang="ts">
import CoreCarouselSection from '@/components/Home/CoreCarouselSection.vue';
import CoreCartoonSection from '@/components/Home/CoreCartoonSection.vue';
import CoreLatestPaperSection from '@/components/Home/CoreLatestPaperSection.vue';
import CoreDownloadLatestPaperSection from '@/components/Home/CoreDownloadLatestPaperSection.vue';

export default {
  components: {
    CoreCarouselSection,
    CoreCartoonSection,
    CoreLatestPaperSection,
    CoreDownloadLatestPaperSection,
  },
  data() {
    return {
      articles: [{ id: 0, title: '', description: '', imgUrl: '', p: '' }],
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
      url(@/assets/img/nhgazette-hero.jpg);
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

section.section-4 {
  background-image: linear-gradient(0deg, rgba(34, 34, 34, 0.69), rgba(34, 34, 34, 0.69)),
    url(@/assets/img/nh-gazette-video-callout.jpg);
  background-size: cover;

  .wrapper {
    padding: 75px 35px;
  }
}
</style>
