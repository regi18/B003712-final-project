<template>
  <nav class="second-nav">
    <div class="second-nav-wrapper">
      <div class="mobile-second-nav">
        <span @click="isMobileMenuOpen = !isMobileMenuOpen">
          <i class="fas hamburger" :class="isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
          Departments
        </span>
      </div>

      <ul class="secondary-menu" :class="{ 'is-open-mobile': isMobileMenuOpen }">
        <li class="menu-item" v-for="e of menuItems" :key="e.url">
          <router-link :to="e.url">{{ e.title }}</router-link>
        </li>

        <li class="menu-item">
          <a @click="toggleSubMenu($event)">
            Other Departments
            <i ref="topNavSubMenuArrow" class="fas fa-angle-down arrow-down"></i>
          </a>

          <ul class="sub-menu" ref="sub-menu">
            <li class="sub-menu-item" v-for="c of otherItems" :key="c.url">
              <router-link :to="c.url">{{ c.title }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { get } from '@/services/AjaxService';
import { RouterLink } from 'vue-router';

export default {
  name: 'core-second-navbar',
  inject: ['currentScreenSize'],
  components: {
    RouterLink,
  },
  async created() {
    // Fetch sections from API and sort them alphabetically
    let s: any[] = await get('sections');
    s = s.map((e: any) => ({ ...e, url: '/sections/' + e.slug }));
    s = s.sort((a: any, b: any) => a.title.localeCompare(b.title));

    // Divide sections in menu and submenu
    this.otherItems = [...s.filter((e: any) => !['staff-articles', 'the-research-journal'].includes(e.slug)), ...this.otherItems];
    this.menuItems = [...s.filter((e: any) => ['staff-articles', 'the-research-journal'].includes(e.slug)), ...this.menuItems];
  },
  data() {
    return {
      isMobileMenuOpen: false,
      otherItems: [{ url: '/sections/all', title: 'All Articles' }],
      menuItems: [{ url: '/sections/non-political-cartoons', title: 'Non-Political Cartoons' }],
    };
  },
  methods: {
    toggleSubMenu(event: any) {
      event.preventDefault();
      if (this.currentScreenSize !== 'mobile') return;
      this.$refs['sub-menu'].classList.toggle('is-open');
      this.$refs['topNavSubMenuArrow'].classList.toggle('fa-angle-down');
      this.$refs['topNavSubMenuArrow'].classList.toggle('fa-angle-up');
    },
  },
};
</script>

<style scoped lang="scss">
.second-nav {
  width: 100%;

  .second-nav-wrapper {
    display: flex;
    justify-content: center;
    background: #222222;
    color: #fff;

    ul.secondary-menu {
      list-style: none;
      margin: 0;
      padding-left: 0;
      font-size: 1em;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      li.menu-item {
        a {
          font-family: 'Playfair Display', serif;
          transition: 100ms ease-in-out;
          display: block;
          font-weight: 400;
          font-size: 13px;
          padding-left: 18px;
          padding-right: 18px;
          line-height: 45px;
          white-space: nowrap;

          &:hover {
            color: #ffffff;
            background-color: #303030;
          }
        }

        i.arrow-down {
          padding-left: 0.5em;
          font-size: 0.9em;
        }

        // Show sub-menu on hover
        &:hover {
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

  .mobile-second-nav {
    display: none;
  }

  @include mobile {
    line-height: 45px;

    .second-nav-wrapper {
      flex-direction: column;

      .menu-item a {
        padding: 0 18px;
      }
    }

    .mobile-second-nav {
      display: block;
      font-size: 13px;
      padding: 0 18px;
      text-align: center;

      i.hamburger {
        margin-right: 0.4em;
      }
    }

    .secondary-menu {
      &:not(.is-open-mobile) {
        display: none !important;
      }

      flex-direction: column;
    }
  }

  .router-link-exact-active {
    color: #222222;
    background-color: #ffffff;

    &:hover {
      color: #222222 !important;
      background-color: #ffffff !important;
    }
  }

  // ---------- SUB MENU ----------
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
      padding: 0 20px;
      line-height: normal;

      &:hover {
        background-color: #4f4f4f;
      }
    }

    @include mobile {
      &.is-open {
        display: block;
      }
    }
  }
}
</style>
