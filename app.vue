<template>
  <VitePwaManifest />
  <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>

  <NuxtLayout>

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZvUfUblGM5QTJhQ90VfdG2q48x5bVkaw",
  authDomain: "mosfraamtech-1558316179266.firebaseapp.com",
  projectId: "mosfraamtech-1558316179266",
  storageBucket: "mosfraamtech-1558316179266.appspot.com",
  messagingSenderId: "669789144988",
  appId: "1:669789144988:web:d75999da0e7502c79aaa59",
  measurementId: "G-1JN60DY70G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BCq0MCTI2I8BVYMSNYkp01DpkyCGa-Ou01SgNzh3utt0kiqUOdYzFmvmqPibsHgl614O3GVyPvEHal0keCGB5WM' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token: ", currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>