<template>
  <div class="container">
    <h1 class="align-left">Welcome, {{ username }}</h1>

    <hr />

    <div class="wrapper">
      <template v-if="isAdmin">
        <h2 class="align-left" style="font-size: 1.2em">It looks like you can do more!</h2>
        <router-link to="/admin">Click here for the administration panel</router-link>
        <div class="spacer"></div>
      </template>

      <h2 class="align-left" style="font-size: 1.2em">Change password</h2>
      <form>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="rpassword">Repeat Password</label>
          <input type="password" id="rpassword" v-model="repeatPassword" required />
        </div>
      </form>

      <span class="error" v-if="showError">Passwords do not match</span>
    </div>

    <a class="button" style="margin-top: 1.5em" @click="changePassword()">Change</a>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

// TODO protect this component/route from unauthenticated users
export default {
  name: 'UserView',
  components: {
    RouterLink,
  },
  created() {
    // TODO fetch username
  },
  methods: {
    changePassword() {
      // TODO
    },
  },
  data() {
    return {
      username: '',
      showError: false,
      password: '',
      repeatPassword: '',
      isAdmin: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 50vh;
}

a {
  text-decoration: underline;
}

.spacer {
  height: 3em;
  width: 100%;
  display: block;
}

form {
  display: table;
  padding-top: 20px;
}
.form-group {
  padding: 2em 0;
  display: table-row;

  @include notMobile {
    label,
    input {
      display: table-cell;
      margin-bottom: 10px;
    }

    label {
      padding-right: 30px;
    }

    input {
      border: 1px solid #939393;
      border-radius: 3px;
    }
  }
}
</style>
