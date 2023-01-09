<template>
  <tr>
    <td>{{ productNumber }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }}</td>
    <td>
      <v-btn
        v-if="isAuthenticated"
        variant="flat"
        @click="addToCart(product.id)"
        color="secondary"
      >
        Add to cart
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
    productNumber: {
      type: Number,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: {
    'add-to-cart': (value) => typeof value === 'number',
  },
  methods: {
    addToCart(productId) {
      this.$emit('add-to-cart', productId);
    },
  },
};
</script>

<style></style>
