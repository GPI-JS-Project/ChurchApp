<template>
    <v-container>
      <h1>Church Birthday</h1>
      <h4>GPI "Jalan Suci" Jaktim</h4>
      <v-row>
        <v-col v-for="user in users" :key="user.id" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-img :src="require('@/assets/58140.jpg')"></v-img>
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-subtitle>{{ user.email }}</v-card-subtitle>
            <v-card-subtitle>{{ user.birthDate }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        today:[],
        tomorrow:[],
        thisMonth:[]
        
      };
    },
    created() {
      this.fetchBirthday();
    },
    methods: {
      async fetchBirthday() {
        try {
          const response = await fetch('http://localhost:3000/birthday');
          if (!response.ok) {
            throw new Error('Failed to fetch birthday');
          }
          this.users = await response.json();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  