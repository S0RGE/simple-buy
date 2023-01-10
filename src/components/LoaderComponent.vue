<template>
  <div class="spiner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style>
.spiner {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(95, 94, 94, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
