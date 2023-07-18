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

      <span class="icon-only">
        <router-link :to="!isLogged ? '/login' : '/logout'">
          <i :class="!isLogged ? 'fas fa-sign-in' : 'fas fa-sign-out'"></i>
        </router-link>
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
          <router-link :to="e.url" @click="isMobileMenuOpen = false" v-if="!e?.children?.length && (!e.if || e?.if())">
            {{ e.title }}
            <i :class="e.icon" v-if="e.icon" style="margin-left: 0.3em"></i>
          </router-link>

          <template v-else-if="e.if && (!e.if || e?.if())">
            <a>
              <i :class="e.icon" v-if="e.icon"></i>
              {{ e.title }}
              <i
                ref="topNavSubMenuArrow"
                class="fas fa-angle-down arrow-down"
                @click="
                  $event.preventDefault();
                  openSubMenu($event, e);
                "
              >
              </i>
            </a>

            <ul class="sub-menu" :ref="e.url">
              <li class="sub-menu-item" v-for="c of e.children" :key="c.url">
                <router-link @click="isMobileMenuOpen = false" :to="c.url">
                  <i :class="c.icon" v-if="c.icon" style="margin-right: 0.5em"></i>
                  {{ c.title }}
                </router-link>
              </li>
            </ul>
          </template>
        </li>

        <li class="menu-item icon-only" v-if="!isLogged">
          <router-link :to="!isLogged ? '/login' : '/logout'">
            <i :class="!isLogged ? 'fas fa-sign-in' : 'fas fa-sign-out'"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import LoginService from '@/services/LoginService';

export interface NavbarItem {
  title: string;
  url: string;
  icon?: string;
  children?: NavbarItem[];
  if?: () => boolean;
}

export default {
  name: 'core-navbar',
  inject: ['currentScreenSize'],
  components: {
    RouterLink,
  },
  created() {
    this.isLogged = LoginService.isLoggedIn();
  },
  data() {
    return {
      isMobileMenuOpen: false,
      isMobileSecondMenuOpen: false,
      isLogged: false,
      menuItems: [
        {
          title: 'Home',
          url: '/',
        },
        {
          title: 'Subscribe/Donate',
          url: '/subscribe-to-the-gazette',
        },
        {
          title: 'About the Gazette',
          url: '/about',
        },
        {
          title: 'Contact Us',
          url: '/contact-us',
        },
        {
          title: 'Archives',
          url: '/archives',
        },
        {
          if: () => this.isLogged,
          icon: 'fas fa-user',
          url: '/logout',
          children: [
            // {
            //   title: 'Account',
            //   url: '/user',
            //   icon: 'fas fa-user',
            // },
            {
              title: 'Admin',
              url: '/admin',
              icon: 'fas fa-cog',
            },
            {
              title: 'Logout',
              url: '/logout',
              icon: 'fas fa-sign-out',
            },
          ],
        },
      ] as NavbarItem[],
    };
  },
  methods: {
    openSubMenu(event: any, item: any) {
      if (this.currentScreenSize !== 'mobile') return;
      this.$refs[item.url][0].classList.toggle('is-open');
      event.target.classList.toggle('fa-angle-down');
      event.target.classList.toggle('fa-angle-up');
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
          justify-content: flex-start;

          i {
            margin-right: 1em !important;
          }

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

        & > a {
          height: 60px;
        }

        @include mobile {
          ul.sub-menu.is-open {
            display: block;
          }
        }

        // Show sub-menu on hover
        @include notMobile {
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
        .menu-item.icon-only {
          display: none;

          &.router-link-active {
            color: #222222;
            background-color: #ffffff;
          }
        }

        li.menu-item.with-sub-menu a {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }

  @include notMobile {
    .router-link-exact-active {
      color: #ffffff !important;
      background-color: #3f3f3f;
    }
  }
}
</style>
