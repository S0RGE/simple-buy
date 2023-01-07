<template>
  <nav>
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </nav>
  <router-view />
</template>

<style>
nav {
  text-align: center;
}
</style>
