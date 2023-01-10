<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="theader in theaders" :key="theader">{{ theader }}</th>
      </tr>
    </thead>
    <tbody>
      <product-line v-for="product in products" :key="product.id" />
    </tbody>
  </v-table>
</template>

<script>
import ProductLine from './ProductLine.vue';

export default {
  props: {
    theaders: {
      type: Array,
      default: ['Number', 'Name', 'Description', 'Price'],
    },
    products: {
      type: Array,
    },
  },
  components: {
    ProductLine,
  },
};
</script>

<style></style>
