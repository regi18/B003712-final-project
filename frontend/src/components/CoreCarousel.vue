<template>
  <div class="carousel-track" id="carousel" ref="carousel">
    <template v-for="(c, i) in carouselCards" :key="i">
      <div class="carousel-card" :style="getStyle(i)">
        <h2>{{ c.title }}</h2>
        <p>{{ c.content }}</p>
        <a class="button" :to="c.url">Read more</a>
      </div>
    </template>
  </div>

  <div class="carousel-dots">
    <span class="dot-wrapper" v-for="(_, d) in numOfDots" @click="activeCarouselIndex = d" :key="d">
      <span class="dot" :class="{ active: d === activeCarouselIndex }"></span>
    </span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'core-carousel',
  inject: ['currentScreenSize'],
  props: {
    carouselCards: {
      type: Array as PropType<{ content: string; title: string; url: string; }[]>,
      required: true,
    },
  },
  data() {
    return {
      activeCarouselIndex: 0,
      swipeOffset: 0,
      baseSwipeOffset: 0,
      isSwiping: false,
    };
  },
  methods: {
    // Style for a carousel card (x translation)
    getStyle(i: any) {
      const p = (i + this.activeCarouselIndex * -this.carouselCardsPerSlide) * 100;

      return `transform: translateX(calc(${p}% + ${this.swipeOffset}px));`;
    },
    // Init the events needed by the carousel for swipe gestures
    initSwipe() {
      this.$refs.carousel.childNodes.forEach((child: any) => {
        child.addEventListener('mousedown', this.handleMouseDown, true);
        child.addEventListener('touchstart', (e) => this.handleMouseDown(e, true), true);
      });

      document.addEventListener('mouseup', this.handleMouseUp, true);
      document.addEventListener('mousemove', this.handleMouseMove, true);

      document.addEventListener('touchend', this.handleMouseUp, true);
      document.addEventListener('touchcancel', this.handleMouseUp, true);
      document.addEventListener('touchmove', (e) => this.handleMouseMove(e, true), { passive: false });
    },
    // Set starting point of swipe gesture
    handleMouseDown(e: any, isTouch = false) {
      this.isSwiping = true;
      this.$refs.carousel?.classList.add('no-transition');

      if (isTouch) this.baseSwipeOffset = e.target.offsetLeft - e.touches[0].clientX;
      else this.baseSwipeOffset = e.target.offsetLeft - e.clientX;
    },
    // Handle end of swipe gesture
    handleMouseUp() {
      this.isSwiping = false;
      // Remove transition for smooth swiping
      this.$refs.carousel?.classList.remove('no-transition');

      // The minimum that you have to swipe to change slide
      const limit = 150;

      // Check if the swipe was enough to change slide
      if (this.swipeOffset > limit) this.resetSwipe(-1);
      else if (this.swipeOffset < -limit) this.resetSwipe(1);
      // Otherwise reset the values (this achieves the "snap back"\"bounce" effect)
      else if (this.swipeOffset < limit) this.resetSwipe(0);
      else if (this.swipeOffset > -limit) this.resetSwipe(0);
    },
    // Track mouse/finger movement during swipe gesture
    handleMouseMove(event: any, isTouch = false) {
      if (this.isSwiping) {
        // Prevent scroll while swiping in the carousel
        event.preventDefault();
        // Get mouse/finger position
        let o;
        if (isTouch) {
          o = event.touches[0].clientX + this.baseSwipeOffset;
        } else {
          o = event.clientX + this.baseSwipeOffset;
        }

        // Disable swipe if swiping left at first slide or swiping right at last slide
        if (this.activeCarouselIndex === 0 && o > 0) return;
        if (this.activeCarouselIndex === this.numOfDots - 1 && o < 0) return;

        this.swipeOffset = o;
      }
    },
    // Reset swiping values
    resetSwipe(addToCarouselIndex = 0) {
      this.baseSwipeOffset = 0;
      this.isSwiping = false;
      this.swipeOffset = 0;
      this.activeCarouselIndex += addToCarouselIndex;
    },
  },
  computed: {
    // Number of slides in the carousel
    numOfDots() {
      return Math.ceil(this.carouselCards.length / this.carouselCardsPerSlide);
    },
    // Make the carousel responsive
    carouselCardsPerSlide() {
      if (this.currentScreenSize === 'desktop') return 3;
      else if (this.currentScreenSize === 'tablet') return 2;
      else if (this.currentScreenSize === 'mobile') return 1;
      else return 3;
    },
  },
  watch: {
    carouselCards: {
      handler() {
        this.$nextTick(() => {
          this.initSwipe();
        });
      },
      immediate: true
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-track {
  display: flex;
  position: relative;
  max-width: 985px;
  min-height: 300px;
  overflow: hidden;
  margin-bottom: 2em;

  @include mobile {
    margin-bottom: 0.5em;
  }

  .carousel-card {
    padding: 0 1em;
    box-sizing: border-box;
    position: absolute;
    width: 33.33333%;
    transition: 500ms;

    @include tablet {
      width: 50%;
    }
    @include mobile {
      width: 100%;
      padding: 0 0.3em;
    }

    h2 {
      margin-bottom: 1em;
    }

    p {
      font-size: 65%;
      margin-bottom: 1em;

      max-height: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
    }
  }

  &.no-transition .carousel-card {
    transition: none;
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;

  .dot-wrapper {
    display: flex;
    height: 1.5em;
    width: 1em;
    align-items: center;
    margin: 0 0.3em;
    cursor: pointer;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    &:hover .dot {
      background-color: #000;
    }

    .dot {
      height: 5px;
      width: 5px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: 100ms;

      &.active {
        background-color: #000;
      }
    }
  }
}
</style>
