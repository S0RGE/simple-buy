<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Number</th>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Price</th>
          <th class="text-left" v-if="isAuthenticated">Activities</th>
        </tr>
      </thead>
      <tbody>
        <product-component
          v-for="(product, index) in paginatedProducts"
          :product="product"
          :key="product.id"
          :productNumber="productNumber(index)"
          @add-to-cart="addToCart"
        />
      </tbody>
    </v-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="paginationLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import ProductComponent from '@/components/ProductComponent.vue';

export default {
  data() {
    return {
      page: 1,
      productsPerPage: 10,
    };
  },
  components: {
    ProductComponent,
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('ADD_TO_CART', productId);
    },
    productNumber(idx) {
      return idx + 1 + this.productsPerPage * (this.page - 1);
    },
  },
  created() {
    if (this.$store.getters.getAllProducts.length <= 0)
      this.$store.dispatch('PRODUCT_REQ');
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
};
</script>

<style></style>
