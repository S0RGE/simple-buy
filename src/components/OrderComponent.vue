<template>
  <v-window-item :value="index">
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
    <h2>Total : {{ order.order_price }}</h2>
  </v-window-item>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    products() {
      const products = [];
      this.order.products?.forEach((prodId) => {
        const prod = this.$store.getters.getProdustById(prodId);
        const elem = products.find((p) => p.id === prodId);
        if (!elem) {
          products.push(Object.assign({}, prod, { count: 1 }));
        } else {
          elem.count++;
        }
      });
      return products;
    },
  },
};
</script>

<style></style>
