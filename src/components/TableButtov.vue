<template>
  <v-btn>
    {{ btnText }}
  </v-btn>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
    },
  },
};
</script>

<style></style>
