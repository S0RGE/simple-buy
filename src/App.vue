<template>
  <v-app>
    <loader-component v-if="loader" />
    <navigation-component />
    <main class="main">
      <router-view />
    </main>
    <footer-component />
    <error-component v-if="error" :message="error" />
  </v-app>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent';
import FooterComponent from '@/components/FooterComponent';
import LoaderComponent from './components/LoaderComponent';
import ErrorComponent from './components/ErrorComponent';

export default {
  components: {
    LoaderComponent,
    ErrorComponent,
    FooterComponent,
    NavigationComponent,
  },
  created() {
    if (localStorage.getItem('user-token'))
      this.$store.dispatch('CART_REQ').then((response) => {
        if (response.error?.message === 'Login failed') {
          this.$store.dispatch('AUTH_LOGOUT');
          this.$router.push('/');
        }
      });
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    loader() {
      return this.$store.getters.getStatus === 'loading';
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
nav a.router-link-exact-active {
  color: #4caf50;
}

.main {
  flex: 1 1 auto;
}
</style>
