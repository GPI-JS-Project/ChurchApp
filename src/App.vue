<template>
  <v-app>
    <v-main>

      <Header />

      <!-- <Birthday /> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import Birthday from './components/Birthday.vue';
import Header from './components/Header.vue';

export default {
  components: {
    // Birthday,
    Header
  }
};
</script>
