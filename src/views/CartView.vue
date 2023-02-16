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
            <span @click="addToCart(product.product_id)">+</span>
            {{ product.count }}
            <span @click="removeFromCart(product.id)">-</span>
          </td>
          <td>
            <v-btn color="error" @click="deleteProducts(product.product_id)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <h2>Total : {{ total }}</h2>
    <v-btn
      :disabled="!(total > 0)"
      variant="flat"
      @click="makeAnOrder()"
      color="secondary"
    >
      Make an order
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      products: 'getCart',
    }),
    total() {
      const totalSumm = this.products.reduce((acc, prod) => {
        return (acc += +prod.count * +prod.price);
      }, 0);
      return totalSumm;
    },
  },
  methods: {
    deleteProducts(productId) {
      this.$store.dispatch('DELETE_PRODUCTS_FROM_CART', productId);
    },
    makeAnOrder() {
      this.$store
        .dispatch('MAKE_AN_ORDER')
        .then(() => this.$router.push('/orders'));
    },
    addToCart(productId) {
      this.$store.dispatch('INCREMENT_PRODUCT_COUNT', productId);
    },
    removeFromCart(productId) {
      this.$store.dispatch('DECREMENT_PRODUCT_COUNT', productId);
    },
  },
  created() {
    if (this.$store.getters.getCart.length <= 0)
      this.$store.dispatch('CART_REQ');
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
