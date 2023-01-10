<template>
  <tr>
    <td v-for="value in productValues" :key="value">{{ value }}</td>
    <slot></slot>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  computed: {
    productValues() {
      return Object.values(this.product);
    },
  },
};
</script>

<style></style>
