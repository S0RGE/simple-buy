<template>
  <div class="alert_message">
    <v-alert color="deep-orange" variant="outlined">
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style>
.alert_message {
  width: 100vw;
  text-align: center;
  position: fixed;
  margin: 4rem auto;
  background-color: #000;
}
</style>
