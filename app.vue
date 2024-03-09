<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useConfigFetch, useConfigPost } from "@/composables/useConfigFetch"; // Assuming this is the correct path to your composable

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyBZvUfUblGM5QTJhQ90VfdG2q48x5bVkaw",
  authDomain: "mosfraamtech-1558316179266.firebaseapp.com",
  projectId: "mosfraamtech-1558316179266",
  storageBucket: "mosfraamtech-1558316179266.appspot.com",
  messagingSenderId: "669789144988",
  appId: "1:669789144988:web:d75999da0e7502c79aaa59",
  measurementId: "G-1JN60DY70G"
};

onMounted(() => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('Message received.', payload);
  });

  getToken(messaging, { vapidKey: 'BCq0MCTI2I8BVYMSNYkp01DpkyCGa-Ou01SgNzh3utt0kiqUOdYzFmvmqPibsHgl614O3GVyPvEHal0keCGB5WM' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Token:', currentToken);

        // send payload to server

        // Make the POST request
        const postData = {
          token: currentToken,
          ip: "10.10.10.101.12",
          device: "chrome",
          location: "indonesia"
        };
        useConfigPost('/messaging', postData)
          .then(response => {
            // Handle successful response
            console.log('Response:', response);
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });



      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token.', err);
    });

  // Clean up subscriptions when component is unmounted
  return () => {
    unsubscribe();
  };
});
</script>
