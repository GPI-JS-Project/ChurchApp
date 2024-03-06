// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBZvUfUblGM5QTJhQ90VfdG2q48x5bVkaw",
    authDomain: "mosfraamtech-1558316179266.firebaseapp.com",
    projectId: "mosfraamtech-1558316179266",
    storageBucket: "mosfraamtech-1558316179266.appspot.com",
    messagingSenderId: "669789144988",
    appId: "1:669789144988:web:d75999da0e7502c79aaa59",
    measurementId: "G-1JN60DY70G"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.title,
        icon: '/icons/icon512_rounded.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});