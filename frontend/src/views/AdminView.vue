<template>
  <div class="container admin-container">

    <div class="sidenav">

      TEST
    </div>

    <div class="content">
      TEST
    </div>

  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

// TODO protect this component/route from unauthenticated users
export default {
  name: 'AdminView',
  components: {
    RouterLink,
  },
  created() {
    // TODO
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  min-height: 50vh;
  display: grid;
  grid-template-columns: 20% auto;
}
</style>
