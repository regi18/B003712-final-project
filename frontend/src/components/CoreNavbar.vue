<template>
  <nav class="top-nav">
    <!------------------->
    <!-- MOBILE NAVBAR -->
    <!------------------->
    <div class="mobile-top-nav">
      <span @click="isMobileMenuOpen = !isMobileMenuOpen">
        <i class="fas hamburger" :class="isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
        Menu
      </span>

      <span class="search-bar">
        <a aria-label="Open Search Bar">
          <i class="fas fa-magnifying-glass"></i>
        </a>
      </span>
    </div>

    <!-------------------->
    <!-- DESKTOP NAVBAR -->
    <!-------------------->
    <div class="top-nav-wrapper" :class="{ 'is-open-mobile': isMobileMenuOpen }">
      <ul class="menu">
        <!--------------->
        <!-- MENU ITEM -->
        <!--------------->
        <li class="menu-item" :class="e?.children?.length ? 'with-sub-menu' : ''" v-for="e of menuItems" :key="e.url">
          <router-link :to="e.url" v-if="!e?.children?.length">{{ e.title }}</router-link>

          <template v-else>
            <router-link :to="e.url">
              {{ e.title }}
              <i
                ref="topNavSubMenuArrow"
                class="fas fa-angle-down arrow-down"
                @click="
                  $event.preventDefault();
                  openSubMenu();
                "
              >
              </i>
            </router-link>

            <ul class="sub-menu" ref="topNavSubMenu">
              <li class="sub-menu-item" v-for="c of e.children" :key="c.url">
                <router-link :to="c.url">{{ c.title }}</router-link>
              </li>
            </ul>
          </template>
        </li>

        <!---------------->
        <!-- SEARCH BAR -->
        <!---------------->
        <li class="menu-item search-bar">
          <a>
            <i class="fas fa-magnifying-glass"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  name: 'core-navbar',
  components: {
    RouterLink,
  },
  data() {
    return {
      isMobileMenuOpen: false,
      isMobileSecondMenuOpen: false,
      menuItems: [
        {
          title: 'Subscribe/Donate',
          url: 'subscribe-donate',
        },
        {
          title: 'About the Gazette',
          url: 'about',
        },
        {
          title: 'Contact Us',
          url: 'contact',
        },
        {
          title: 'Archives',
          url: 'archives',
          children: [
            {
              title: 'Archives 2',
              url: 'archives-2',
            },
            {
              title: 'Archives 3',
              url: 'archives-3',
            },
          ],
        },
      ],
    };
  },
  methods: {
    openSubMenu() {
      this.$refs.topNavSubMenu.classList.toggle('is-open');
      this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-down');
      this.$refs.topNavSubMenuArrow.classList.toggle('fa-angle-up');
    },
  },
};
</script>

<style lang="scss" scoped>
.top-nav {
  width: 100%;
  background: #fff;

  .top-nav-wrapper {
    max-width: 985px;
    display: flex;
    justify-content: center;
    margin: auto;

    ul.menu {
      list-style: none;
      margin: 0;
      padding-left: 0;
      font-size: 1em;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      ul.sub-menu {
        list-style: none;
        padding: 0;
        background-color: #4f4f4f;

        @media (min-width: #{$mobile-breakpoint + 1}) {
          width: 200px;
          position: absolute;
          left: -99999px;
          opacity: 0;
          z-index: 99999;
          top: auto;
          transition: opacity 80ms linear;
          transition-delay: 0s;
          pointer-events: none;
          height: 0;
          overflow: hidden;
        }
        @include mobile {
          display: none;
        }

        li.sub-menu-item a {
          background-color: #3f3f3f;
          font-size: 14px;
          color: #ffffff;
          padding: 10px 20px;
          line-height: normal;

          &:hover {
            background-color: #4f4f4f;
          }
        }
      }

      li.menu-item {
        a {
          font-family: 'Playfair Display', serif;
          transition: 100ms ease-in-out;
          display: block;
          padding-left: 20px;
          padding-right: 20px;
          line-height: 60px;
          font-weight: 400;
          font-size: 15px;
          white-space: nowrap;

          color: #222222;

          &:hover {
            color: #ffffff;
            background-color: #3f3f3f;
          }

          i.arrow-down {
            padding-left: 0.5em;
            font-size: 0.8em;
          }
        }

        @include mobile {
          ul.sub-menu.is-open {
            display: block;
          }
        }

        // Show sub-menu on hover
        &:hover {
          a {
            color: #ffffff;
            background-color: #3f3f3f;
          }

          ul.sub-menu {
            left: auto;
            opacity: 1;
            transition-delay: 150ms;
            pointer-events: auto;
            height: auto;
            overflow: visible;
          }
        }
      }
    }
  }

  .mobile-top-nav {
    display: none;
  }

  @include mobile {
    .mobile-top-nav {
      display: flex;
      justify-content: space-between;
      color: #222222;
      padding: 0 20px;
      line-height: 60px;
      font-weight: 400;
      font-size: 15px;

      i.hamburger {
        margin-right: 0.4em;
      }
    }

    .top-nav-wrapper {
      &:not(.is-open-mobile) {
        display: none;
      }

      justify-content: flex-start;

      ul.menu {
        flex-direction: column;
        flex: 1;

        .menu-item.search-bar {
          display: none;
        }

        li.menu-item.with-sub-menu a {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
