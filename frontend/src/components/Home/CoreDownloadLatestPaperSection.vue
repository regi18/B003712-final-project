<template>
  <section class="section-3 without-image">
    <h2>Download the Latest Paper</h2>
    <p class="divider">–=≈=–</p>

    <div class="download-wrapper" v-if="loaded">
      <h2>
        <a :href="url" target="_blank">Issue {{ issueNumber }}; {{ date }}</a>
      </h2>
      <div class="content">
        <p>
          Here you can download the latest issue of the Gazette.<br />
          It puts together all the best articles from the last month ({{ dateNoDay }}).<br />
          To download this issue of our paper, <a class="click-here" :href="url" target="_blank">click here</a> or on the image.<br />
          To download older papers, explore our <a class="click-here" href="/archives">archive</a>.
        </p>
        <a :href="url" target="_blank">
          <img src="@/assets/img/front-page.png" alt="Gazette Front Page" />
        </a>
      </div>
    </div>

    <div class="download-wrapper" v-else>
      <p>Loading...</p>
    </div>
  </section>
</template>

<script lang="ts">
import ArticlesService from '@/services/ArticlesService';

export default {
  name: 'core-download-latest-paper-section',
  created() {
    this.loaded = false;
    ArticlesService.getLatestDownload().then((res) => {
      this.date = Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'long', day: 'numeric' }).format(Date.parse(res.createdAt));
      this.dateNoDay = Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'long' }).format(Date.parse(res.createdAt));
      this.title = res.title;
      this.url = res.pdf;
      this.issueNumber = res.issueNumber;
      this.loaded = true;
    });
  },
  data() {
    return {
      loaded: false,
      title: '',
      date: '',
      dateNoDay: '',
      url: '',
      issueNumber: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
section.section-3 {
  p.divider {
    text-align: center;
  }

  .download-wrapper {
    h2 {
      text-align: left;
      margin-bottom: 1em;

      @media (max-width: 550px) {
        text-align: center;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;

      @media (max-width: 550px) {
        margin: auto;
        max-width: 350px;
        flex-direction: column;

        p {
          margin-top: 0.5em;
          order: 2;
        }
      }

      p {
        font-size: 80%;
        margin-right: 1em;
      }

      img {
        mix-blend-mode: darken;
        cursor: pointer;
      }
    }
  }

  .click-here {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
