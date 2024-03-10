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


interface getIP {
  ip: String;
}

interface getLocation {
  country_code: String;
  country_name: String;
  city: String;
  state: String;
  latitude: String,
  longtude: String;
}

onMounted(() => {


  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log('Message received.', payload);
  });

  getToken(messaging, { vapidKey: 'BGsBEcW8C6lsHuMOQJKH2RSnEFvOD5-GFTHnKbAGl_3bOS1dCXX5IXr0zs5eyPBTEKOzyPPincOB5g9F-v6UU90' })
    .then(async (currentToken) => {
      if (currentToken) {
        console.log('Token:', currentToken);

        const { data: ipAddress } = await useFetch('https://api.ipify.org?format=json');
        const getIPAddress = ipAddress.value as getIP;


        const { data: currentLocation } = await useFetch<Object>(`https://geolocation-db.com/json/${ipAddress}`);
        const location = currentLocation.value as string;
        const mappingLocation = JSON.parse(location) as getLocation;

        // Make the POST request
        const postData = {
          token: currentToken,
          ip: getIPAddress.ip,
          device: navigator.platform,
          location: mappingLocation.city
        };

        useConfigPost('/notification', postData)
          .then(response => {
            // Handle successful response
            console.log(response.data.value);
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
