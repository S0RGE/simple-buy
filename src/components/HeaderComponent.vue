<template>
  <header>
    <nav v-if="!$store.getters.isAuthenticated">
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Registration</router-link>
    </nav>
    <nav v-else>
      <router-link to="/" @click="logout">Logout</router-link> |
      <router-link to="/">Products</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch('AUTH_LOGOUT')
        .then(() => this.$router.push('/login'));
    },
  },
};
</script>

<style></style>
