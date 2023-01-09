<template>
  <v-app>
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

export default {
  components: {
    FooterComponent,
    NavigationComponent,
  },
};
</script>
