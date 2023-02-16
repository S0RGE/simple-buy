<template>
  <v-form
    @submit.prevent="register"
    ref="regForm"
    class="v-col-sm-12 v-col-lg-10 mx-auto"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :rules="userfioRules"
      label="Name"
      required
      autofocus
    ></v-text-field>

    <v-text-field
      v-model="usersurname"
      :rules="userfioRules"
      label="Surname"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      type="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="passwordRepeate"
      :rules="passwordRules"
      :error-messages="matchError"
      type="password"
      label="Password repeate"
      required
    ></v-text-field>

    <v-btn color="success" class="mr-4" type="submit"> Register </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    username: 'John',
    usersurname: 'Doe',
    userfioRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: 'JohnDoe@mail.com',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Password must be more than 6 characters',
    ],
    password: 'qweASD123',
    passwordRepeate: 'qweASD123',
    matchError: '',
  }),

  methods: {
    async register() {
      const { valid } = await this.$refs.regForm?.validate();
      if (!valid) return;

      if (this.password !== this.passwordRepeate) {
        this.matchError = 'Passwords must match';
        setTimeout(() => {
          this.matchError = '';
        }, 3000);
        return;
      }

      const userData = {
        fio: this.userFullname,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch('REG_REQUEST', userData)
        .then(() => this.$router.push('/'));
    },
  },
  computed: {
    userFullname() {
      return `${this.username} ${this.usersurname}`;
    },
  },
};
</script>
