<template>
  <div class="login-view">
    <div class="container">
      <h1 class="align-left">Login</h1>

      <div class="wrapper">
        <form>
          <div class="form-group" v-if="!isLogin">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="username" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group" v-if="!isLogin">
            <label for="rpassword">Repeat Password</label>
            <input type="password" id="rpassword" v-model="repeatPassword" required />
          </div>
        </form>

        <span class="error" v-if="showError">Passwords do not match</span>

        <a class="register-link" @click="isLogin = !isLogin">
          {{ isLogin ? 'Not yet registered? Click Here' : 'Already registered?' }}
        </a>
      </div>

      <a class="button" @click="go()">
        {{ isLogin ? 'Login' : 'Register' }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import LoginService from '@/services/LoginService';

export default {
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      email: '',
      repeatPassword: '',
      showError: false,
    };
  },
  created() {
    if (LoginService.isLoggedIn()) {
      this.$router.push('/');
    }
  },
  methods: {
    go() {
      // Login
      if (this.isLogin) {
        console.log('TODO');
        LoginService.login(this.username, this.password);
      }
      // Register new user
      else {
        if (this.password !== this.repeatPassword || this.password === '') {
          this.showError = true;
          setTimeout(() => { this.showError = false; }, 1500);
          return;
        }
        LoginService.register(this.email, this.username, this.password);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

.button {
  margin-top: 3em;
}

.container {
  min-height: 40vh;

  @include notMobile {
    margin-top: 2em;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.register-link {
  font-size: 0.8em;
  margin-top: 1rem;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.error {
  color: red;
  font-weight: bold;
}
</style>
