<template>
  <v-app>
    <loader-component v-if="$store.getters.loadStatus === 'loading'" />
    <navigation-component />
    <main class="main">
      <router-view />
    </main>
    <footer-component />
  </v-app>
</template>

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

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LoaderComponent from './components/LoaderComponent.vue';

export default {
  components: {
    LoaderComponent,
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
    load() {
      console.log(this.$store.getters.loadStatus);
    },
  },
};
</script>
