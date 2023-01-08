<template>
  <header-component />
  <router-view />
  <footer-component />
</template>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
