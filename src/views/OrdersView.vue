<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="secondary">
      <v-tab :value="index" v-for="(order, index) in orders" :key="order.id">
        Order {{ index + 1 }}
      </v-tab>
    </v-tabs>
    <v-container>
      <v-card-text>
        <v-window v-model="tab">
          <order-component
            v-for="(order, index) in orders"
            :key="order.id"
            :order="order"
            :index="index"
          />
        </v-window>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import OrderComponent from '@/components/OrderComponent';

export default {
  data: () => ({
    tab: 0,
  }),
  created() {
    if (this.$store.getters.getAllProducts.length <= 0)
      this.$store.dispatch('PRODUCT_REQ');
    // TODO: refactor this
    if (this.$store.getters.getAllOrders.length <= 0)
      this.$store.dispatch('ORDER_REQ');
  },
  computed: {
    orders() {
      return this.$store.getters.getAllOrders;
    },
  },
  components: {
    OrderComponent,
  },
};
</script>

<style></style>
