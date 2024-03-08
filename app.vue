<template>
  <VitePwaManifest />
  <!-- <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear> -->

  <NuxtLayout>

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// const nuxtApp = useNuxtApp();
// const loading = ref(false);
// nuxtApp.hook("page:start", () => {
//   loading.value = true;
// });
// nuxtApp.hook("page:finish", () => {
//   loading.value = false;
// });

// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyBZvUfUblGM5QTJhQ90VfdG2q48x5bVkaw",
//   authDomain: "mosfraamtech-1558316179266.firebaseapp.com",
//   projectId: "mosfraamtech-1558316179266",
//   storageBucket: "mosfraamtech-1558316179266.appspot.com",
//   messagingSenderId: "669789144988",
//   appId: "1:669789144988:web:d75999da0e7502c79aaa59",
//   measurementId: "G-1JN60DY70G"
// };

// const app = initializeApp(firebaseConfig);


// const messaging = getMessaging(app);
// var a = onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);

// });

// getToken(messaging, { vapidKey: 'BCq0MCTI2I8BVYMSNYkp01DpkyCGa-Ou01SgNzh3utt0kiqUOdYzFmvmqPibsHgl614O3GVyPvEHal0keCGB5WM' }).then((currentToken) => {
//   if (currentToken) {

//     console.log("Token: ", currentToken);
//     // ...
//   } else {

//     console.log('No registration token available. Request permission to generate one.');

//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);

// });

</script>