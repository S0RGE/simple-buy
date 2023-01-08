<template>
  <v-container>
    <v-form
      @submit.prevent="login"
      ref="form"
      class="v-col-sm-12 v-col-lg-10 mx-auto"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
        autofocus
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <v-btn color="success" class="mr-4" type="submit"> Login </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: 'JohnDoe666@mail.ru',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
    password: 'qweASD123',
  }),

  methods: {
    login() {
      if (!this.valid) {
        return;
      }
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch('AUTH_REQUEST', userData)
        .then(() => this.$router.push('/'));
    },
  },
};
</script>
