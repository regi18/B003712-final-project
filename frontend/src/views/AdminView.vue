<template>
  <h2 style="padding-top: 0.4em">Manage the gazette</h2>

  <div class="container admin-container">
    <!-- TODO move somewhere in mobile -->
    <div class="sidenav">
      <ul>
        <li @click="section = 'articles'">Articles</li>
        <li @click="section = 'cartoons'">Cartoons</li>
        <li @click="section = 'research-journal'">The Research Journal</li>
      </ul>
    </div>

    <div class="content">
      <!-- List with CRUD operations -->
      {{ section }}
    </div>
  </div>
</template>

<script lang="ts">
// TODO protect this component/route from unauthenticated users
export default {
  name: 'AdminView',
  components: {},
  created() {
    // TODO
  },
  methods: {},
  data() {
    return {
      section: 'articles',
    };
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  min-height: 50vh;
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1000px;
}

.sidenav {
  li {
    list-style-type: none;
    cursor: pointer;
    padding: 0.5em 0;
    border-bottom: 1px solid #ccc;

    &:hover {
      text-decoration: underline;
    }
  }
}

.content {
  padding: 1em 2.5em;
}
</style>
