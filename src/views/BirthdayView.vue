<template>
    <Birthday />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Birthday
  import Birthday from '../components/Birthday.vue';
  
  export default defineComponent({
    name: 'BirthdayView',
  
    components: {
        Birthday,
    },
  });
  </script>
  