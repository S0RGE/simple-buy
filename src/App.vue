<template>
  <header-component />
  <router-view />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },
};
</script>

<style>
nav {
  text-align: center;
}
</style>
