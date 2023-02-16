<template>
  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris
      cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id
      ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>TTIT</strong></div>
  </v-footer>
</template>

<style scoped>
footer {
  max-height: 100px;
  padding: 10px;
}
</style>
