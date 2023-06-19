<template>
  <footer>
    <div class="footer-content">
      <div class="footer-content-wrapper">
        <div class="widget">
          <h2>Contributors</h2>
          <ul>
            <li v-for="c of contributors" :key="c.url">
              <a :href="c.url" target="_blank">
                {{ c.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="widget">
          <h2>Useful Links</h2>
          <ul id="menu-links-past-site" class="menu">
            <li v-for="e of links" :key="e.url">
              <a :href="e.url">{{ e.title }}</a>
            </li>
          </ul>
        </div>

        <!-- <div class="widget">
          <h2>Departments</h2>
          <ul id="menu-paper-sidebar" class="menu">
            <li v-for="e of departments" :key="e.url">
              <router-link :to="e.url">{{ e.title }}</router-link>
            </li>
          </ul>
        </div> -->

        <div class="widget">
          <h2>People Powered Press</h2>
          <p>All contribution will be used to do something. Maybe.</p>
        </div>

        <div class="widget">
          <h2>Mailing Information</h2>
          <p>
            The Florentine University Gazette<br />
            Viale Giovanni Battista Morgagni, 40, 50134 Firenze FI
          </p>
          <a class="social" href="https://joinmastodon.org/"><i class="fa-brands fa-square-twitter"></i></a>
        </div>
      </div>
    </div>

    <div class="bottom-footer">
      <div class="copyright-bar">
        This website is an exercise for a university exam, it is not intended to simulate or copy the real website in
        any way.<br />
        The copyright of the design and images belongs to the original website
        <a href="https://www.nhgazette.com/">(The New Hampshire Gazette)</a>.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'core-footer',
  data() {
    return {
      contributors: [
        { url: 'https://simonecarletti.github.io', name: 'Simone Carletti' },
        { url: 'https://blank.org', name: 'Nobody else' },
      ],
      links: [
        { url: 'https://www.nytimes.com/', title: 'A Real Newspaper' },
        { url: 'https://www.foxnews.com/', title: 'Some Fake News' },
        { url: 'https://cat-gpt.com/', title: 'CatGPT' },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
footer {
  .footer-content {
    padding: 100px 40px 20px 40px;
    background-size: 100% auto !important;
    background: #d6d6d6 url(../assets/img/tide-web.png) repeat-x top;

    .footer-content-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 2em;
      margin: auto;
      max-width: 985px;

      .widget {
        flex: 1;
        flex-basis: calc(50vw - 2em - 40px);
        min-width: 200px;

        @include desktop {
          flex-basis: 0;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        h2 {
          text-align: left;
          color: #000;
          margin-bottom: 25px;
          font-size: 20px;
          line-height: 1.5;
          font-weight: 400;
        }

        a,
        p {
          font-size: 17px;
        }

        .social {
          margin-top: 0.5em;
          font-size: 1.5em;
        }

        input {
          border: none;
          margin-bottom: 1em;
          width: 90%;
        }
      }
    }
  }

  .bottom-footer {
    background: #222;
    color: white;

    div.copyright-bar {
      margin: auto;
      max-width: 985px;
      text-align: center;
      padding: 20px;
      font-size: 15px;
    }
  }
}
</style>
