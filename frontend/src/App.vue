<template>
  <CoreNavbar />
  <CoreHeader />
  <CoreSecondNavbar />

  <RouterView />

  <CoreFooter />

  <div class="scroll-to-top" @click="scrollToTop()" ref="scrollToTopBtn">
    <i class="fa-solid fa-angle-up"></i>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import CoreNavbar from '@/components/CoreNavbar.vue';
import CoreFooter from '@/components/CoreFooter.vue';
import CoreHeader from './components/CoreHeader.vue';
import CoreSecondNavbar from './components/CoreSecondNavbar.vue';


export default {
  components: {
    CoreNavbar,
    CoreFooter,
    CoreHeader,
    CoreSecondNavbar,
  },
  mounted() {
    this.setScreenSize();
    window.addEventListener('resize', this.setScreenSize);
    window.addEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      currentScreenSize: null as string | null,
    };
  },
  provide() {
    return {
      currentScreenSize: computed(() => this.currentScreenSize),
    };
  },
  methods: {
    // Set a variable on body:before that signals the screen size
    setScreenSize() {
      this.currentScreenSize = window
        .getComputedStyle(document.querySelector('body') as Element, ':before')
        .getPropertyValue('content')
        .replace(/"/g, '');
    },
    // Show/Hide the "scroll to top" button
    handleScroll() {
      const minScroll = 280;
      const btn = this.$refs.scrollToTopBtn;
      if (document.body.scrollTop > minScroll || document.documentElement.scrollTop > minScroll) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    },
    // Scroll to top
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

  },
};
</script>

<style lang="scss">
.scroll-to-top {
  background-color: rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  color: #ffffff;
  font-size: 15px;
  border-radius: 3px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  line-height: 40px;
  width: 40px;
  text-align: center;
  z-index: 10;
  transition: opacity 300ms ease-in-out;

  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
