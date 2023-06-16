<template>
  <section class="section-3 without-image">
    <h2>Download the Latest Paper</h2>
    <p class="divider">–=≈=–</p>

    <div class="download-wrapper">
      <h2>
        <a href="">Volume 267, No. 14; March 24, 2023</a>
      </h2>
      <div class="content">
        <p><strong>March 24, 2023 —</strong> To download this issue of our paper, just click on the image at right.</p>
        <img src="./assets/img/267_14.png" alt="Gazette Front Page" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'core-download-latest-paper-section',
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
}
</style>
