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
        />
      </tbody>
    </v-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="paginationLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import ProductComponent from '@/components/ProductComponent';

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
    productNumber(idx) {
      return idx + 1 + this.productsPerPage * (this.page - 1);
    },
  },
  created() {
    if (this.$store.getters.getAllProducts.length <= 0)
      this.$store.dispatch('PRODUCT_REQ');
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      products: 'getAllProducts',
    }),
    paginatedProducts() {
      return this.products.slice(
        (this.page - 1) * this.productsPerPage,
        this.page * this.productsPerPage
      );
    },
    paginationLength() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
  },
};
</script>

<style></style>
