<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Number</th>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Price</th>
          <th class="text-left">Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.count }}</td>
        </tr>
      </tbody>
    </v-table>
    <h2>Total : {{ total }}</h2>
    <v-btn variant="flat" @click="makeAnOrder()" color="secondary">
      Make an order
    </v-btn>
  </v-container>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.getCart;
    },
    total() {
      return 46;
    },
  },
  methods: {
    makeAnOrder() {
      console.log('Ordered');
    },
  },
  created() {
    this.$store.dispatch('CART_REQ');
  },
};
</script>

<style></style>
