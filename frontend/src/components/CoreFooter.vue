<template>
  <footer>
    <div class="footer-content">
      <div class="footer-content-wrapper">
        <div class="widget">
          <h2>Contributors</h2>
          <ul>
            <li>
              <a
                title="The New Hampshire Gazette’s Starving Artiste (Last updated December 31, 1969 6:00 pm)"
                href="http://mikedater.com/"
                target="_blank"
                >Mike Dater
              </a>
            </li>
            <li>
              <a href="https://wdehrhart.com/">W.D. Ehrhart</a>
            </li>
            <li>
              <a
                title=" (Last updated December 31, 1969 6:00 pm)"
                href="http://jimhightower.com/"
                target="_blank"
                rel="noopener noreferrer"
                >Jim Hightower
              </a>
            </li>
            <li>
              <a href="https://jeanstimmell.blogspot.com/">Jean Stimmell</a>
            </li>
          </ul>

          <h2>Links</h2>
          <ul id="menu-links-past-site" class="menu">
            <li id="menu-item-6796" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6796">
              <a href="https://www.nhgazette.com/locals/">Locals</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/news/">News</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/papers/">Papers</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/politics/">Politics</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/veterans/">Veterans</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/veterans-organizations/">Veterans’ Organizations</a>
            </li>
          </ul>
        </div>

        <div class="widget">
          <h2>Departments</h2>
          <ul id="menu-paper-sidebar" class="menu">
            <li>
              <a href="https://www.nhgazette.com/category/fortnightly-rant/">The Fortnightly Rant</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/category/the-alleged-news/">The Alleged News®</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/category/mash-notes-hate-mail-other-correspondence/">
                Mash Notes, Hate Mail &amp; Other Correspondence
              </a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/category/the-northcountry-chronicle/">The Northcountry Chronicle </a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/category/page-eight/">Page 8</a>
            </li>
            <li>
              <a href="https://www.nhgazette.com/category/digital-issue/">Digital Issues (PDFs)</a>
            </li>
          </ul>
        </div>

        <div class="widget">
          <h2>Search the archives</h2>
          <input type="search" placeholder="Search …" title="Search for:" />

          <h2>People Powered Press</h2>
          <p>A contribution of any size helps our efforts and our future.</p>
        </div>

        <div class="widget">
          <h2>Mailing Information</h2>
          <p>
            The New Hampshire Gazette<br />
            PO Box 756<br />
            Portsmouth, NH 03802
          </p>
          <i class="fa-brands fa-square-twitter"></i>
        </div>
      </div>
    </div>

    <div class="bottom-footer">
      <div class="copyright-bar">
        This website is an exercise for a university exam, it is not intended to simulate or copy the real website in
        any way.<br />
        The copyright of the content belongs to the original website (The New Hampshire Gazette).
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'core-footer',
};
</script>

<style scoped lang="scss">
footer {
  .footer-content {
    padding: 60px 40px 20px 40px;
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

        i {
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
