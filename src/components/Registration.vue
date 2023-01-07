<template>
  <form class="login" @submit.prevent="register">
    <h1>Registration</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Email</label>
    <input type="text" required v-model="email" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <label>Password Repeat</label>
    <input type="password" required v-model="passwordRepeat" />
    <hr />
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    };
  },
  methods: {
    register() {
      if (this.password !== this.passwordRepeat) {
        return;
      }
      const userData = {
        fio: this.username,
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('REG_REQUEST', userData)
      .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.login input,
button {
  border: 1px solid black;
  border-radius: 5px;
}
hr {
  margin: 10px 0;
}
</style>
