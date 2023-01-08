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
        <tr v-for="(product, index) in paginatedProducts" :key="product.id">
          <td>{{ index + 1 + productsPerPage * (page - 1) }}</td>
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
    <div class="text-center">
      <v-pagination v-model="page" :length="paginationLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      productsPerPage: 10,
    };
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('ADD_TO_CART', productId);
    },
  },
  created() {
    if (this.$store.getters.getAllProducts.length <= 0) this.$store.dispatch('PRODUCT_REQ');
  },
  computed: {
    paginatedProducts() {
      return this.$store.getters.getAllProducts.slice(
        (this.page - 1) * this.productsPerPage,
        this.page * this.productsPerPage
      );
    },
    paginationLength() {
      return Math.round(
        this.$store.getters.getAllProducts.length / this.productsPerPage
      );
    },
  },
};
</script>

<style></style>
