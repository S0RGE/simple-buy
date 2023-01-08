<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Number</th>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Price</th>
          <th class="text-left">Activities</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <v-btn
              variant="flat"
              @click="addToCart(product.id)"
              color="secondary"
            >
              Add to cart
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  methods: {
    addToCart(productId) {
      this.$store.dispatch('ADD_TO_CART', productId);
    },
  },
  created() {
    this.$store.dispatch('PRODUCT_REQ');
  },
  computed: {
    products() {
      return this.$store.getters.getAllProducts;
    },
  },
};
</script>

<style></style>
