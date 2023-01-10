<template>
  <v-container>
    <product-table :theaders="tableHeaders" :products="paginatedProducts">
    </product-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="paginationLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import ProductTable from '@/components/ProductTable.vue';

export default {
  data() {
    return {
      page: 1,
      productsPerPage: 10,
    };
  },
  components: {
    ProductTable,
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
      return this.$store.getters.isAuthenticated;
    },
    tableHeaders() {
      const tableHeaders = ['Number', 'Name', 'Description', 'Price', 'Activities'];
      this.isAuthenticated ?? tableHeaders.push('Activities');
      return tableHeaders;
    },
  },
};
</script>

<style></style>
