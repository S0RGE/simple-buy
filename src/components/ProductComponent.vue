<template>
  <tr>
    <td>{{ productNumber }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }}</td>
    <td v-if="product.count">{{ product.count }}</td>
    <td>
      <v-btn
        v-if="isAuthenticated"
        variant="flat"
        @click="addToCart(product.id)"
        color="secondary"
        class="btn-submit"
      >
        Add to cart
        <span v-if="message" class="message-text">{{ message }}</span>
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  props: {
    product: {
      type: Object,
    },
    productNumber: {
      type: Number,
    },
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('ADD_TO_CART', productId).then((data) => {
        this.setMessage(data.message);
      });
    },
    setMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped>
.message-text {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 10px;
  transform: translateY(100%);
  padding: 3px 0 0 0;
}
.btn-submit {
  position: relative;
}
</style>
