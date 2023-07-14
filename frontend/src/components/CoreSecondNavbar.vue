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
          <router-link :to="'/sections/' + e.url">{{ e.title }}</router-link>
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
  components: {
    RouterLink,
  },
  async created() {
    // Fetch sections from API and sort them alphabetically
    let s: any[] = await get('sections');
    s = s.map((e: any) => ({ url: e.slug, title: e.title }));
    s = s.sort((a: any, b: any) => a.title.localeCompare(b.title));
    this.menuItems = [...s, ...this.menuItems];
  },
  data() {
    return {
      isMobileMenuOpen: false,
      // Static menu items
      menuItems: [
        // { url: '/staff-articles', title: 'Articles from Staff Members' },
        // { url: '/the-student-gazette', title: 'The Student Gazette®' },
        // { url: '/the-research-journal', title: 'The Research Journal' },
        { url: 'non-political-cartoons', title: 'Non-Political Cartoons' },
      ],
    };
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
}
</style>
