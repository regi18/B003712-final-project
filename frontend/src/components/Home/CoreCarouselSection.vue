<template>
  <section class="section-7 without-image">
    <h2>The Research Journal</h2>

    <p class="subtitle">
      Some abstracts from our latest research projects at the University of Nowhere.<br />
      Each one of them is hand crafted by an unpaid intern, so I don't know if you should take them seriously. They may be totally fictional.

      <router-link to="the-research-journal" style="font-style: italic;">Read more</router-link>.
    </p>

    <core-carousel :carousel-cards="carouselCards"></core-carousel>
  </section>
</template>

<script lang="ts">
import CoreCarousel from '@/components/CoreCarousel.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'core-carousel-section',
  components: {
    CoreCarousel,
    RouterLink,
  },
  data() {
    return {
      carouselCards: [
        {
          title: 'Mon, Apr 3',
          p: '2014—Sen. Jerry Moran [R-Kan.], whose top contributor is Koch Industries, reads into the Congressional Record a Wall Street Journal op-ed in which Charles Koch defends his right to spend millions…',
        },
        {
          title: 'Sun, Apr 2',
          p: '2014—In McCutcheon v. FEC, the Supreme Court rules that rich folks deserve to have more influence in elections than the unwashed proletariat. 1982—U.S. Ambassador to the U.N. Jeanne Kirkpatrick dines…',
        },
        {
          title: 'Sat, Apr 1',
          p: '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens keeping…',
        },
        {
          title: 'Fri, Mar 31',
          p: '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed from…',
        },
        {
          title: 'Thurs, Mar 30',
          p: '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush is…',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
p.subtitle {
  text-align: center;
  margin-bottom: 1.5em;
}
</style>
