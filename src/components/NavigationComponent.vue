<template>
  <v-toolbar>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        {{ appTitle }}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only mr-3 navigation">
      <nav v-if="!$store.getters.isAuthenticated">
        <router-link to="/">Products</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Registration</router-link>
      </nav>
      <nav v-else>
        <router-link to="/">Products</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/login" @click="logout">Logout</router-link>
      </nav>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appTitle: 'My app',
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch('AUTH_LOGOUT')
        .then(() => this.$router.push('/login'));
    },
  },
};
</script>
<style>
.navigation nav {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
