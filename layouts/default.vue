<template>
    <v-app class="background-color">
        <v-main>
            <v-container class="pa-0">
                <!-- Header -->
                <!-- <v-card class="mx-auto rounded-xl "> -->
                <v-layout>
                    <v-app-bar v-if="!$isMobile()" color="teal-darken-4 rounded-lg"
                        image="https://picsum.photos/1920/1080?random">
                        <template v-slot:image>
                            <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
                        </template>

                        <template v-slot:prepend>
                            <router-link to="/" class="title-link">
                                <v-app-bar-title><v-icon aria-hidden="false"> mdi-fire </v-icon>HIKANOS
                                </v-app-bar-title>
                            </router-link>
                        </template>
                        <v-spacer></v-spacer>
                        <v-btn NuxtLink to="/birthday" prepend-icon="mdi-cake-variant" variant="text">
                            Birthday
                        </v-btn>
                        <v-btn NuxtLink to="/anniversary" prepend-icon="mdi-human-male-female" variant="text">
                            Anniversary
                        </v-btn>
                        <v-btn NuxtLink to="/event" prepend-icon="mdi-calendar-clock" variant="text">
                            Event
                        </v-btn>
                        <v-btn NuxtLink to="/news" prepend-icon="mdi-newspaper-variant-multiple" variant="text">
                            News
                        </v-btn>
                        <v-btn NuxtLink icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>

                        <v-btn NuxtLink icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-app-bar>

                    <v-app-bar elevation="0" v-else>

                        <template v-slot:prepend>
                            <router-link to="/" class="title-link">
                                <v-app-bar-title><v-icon aria-hidden="false"> mdi-fire </v-icon>HIKANOS
                                </v-app-bar-title>
                            </router-link>
                        </template>

                        <v-spacer></v-spacer>
                        <v-btn NuxtLink icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-app-bar>
                    <v-main>
                        <v-container class="custom-container">

                            <slot />


                        </v-container>

                    </v-main>
                </v-layout>
                <!-- end header  -->
                <!-- Content -->
                <!-- Content -->
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-bottom-navigation bg-color="teal" v-if="$isMobile()" class="bottom-nav" v-model="value" active>
            <v-btn NuxtLink to="/birthday" size="x-large" prepend-icon="mdi-cake-variant" variant="text">
            </v-btn>
            <v-btn NuxtLink to="/anniversary" size="x-large" prepend-icon="mdi-human-male-female" variant="text">
            </v-btn>
            <v-btn NuxtLink to="/event" size="x-large" prepend-icon="mdi-calendar-clock" variant="text">
            </v-btn>
            <v-btn NuxtLink to="/news" size="x-large" prepend-icon="mdi-newspaper-variant-multiple" variant="text">

            </v-btn>
        </v-bottom-navigation>
        <!-- Footer -->
    </v-app>
</template>

<script lang="ts">
// Import the necessary hooks and types from Vue
import { onBeforeMount, ref } from 'vue';

export default {
    setup() {
        // Define reactive data for icons and value
        const icons = ref(["mdi-whatsapp", "mdi-facebook", "mdi-instagram"]);
        const value = ref(0);

        return {
            icons,
            value
        };
    }
};


</script>

<style scoped>
/* Style the router-link to look like a link */
.title-link {
    color: inherit;
    text-decoration: none;
}

#btnGroup .dnrSelected {
    color: #12b488;
}

.active {
    background-color: blue;
    /* Your active color */
    color: white;
    /* Your active text color */
}

.background-color {
    background-color: #f0f0f0;
    /* Set your desired background color here */
}

.overflow-container {
    max-height: calc(100vh - 56px);
    /* Adjust based on your design */
    overflow-y: auto;
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    /* Adjust z-index if necessary */
}

.custom-container {
    max-width: 800px;
    /* Set your desired max-width */
    width: 100%;
    /* Ensure the container fills its parent */
    margin: 0 auto;
    /* Center the container horizontally */
}
</style>
