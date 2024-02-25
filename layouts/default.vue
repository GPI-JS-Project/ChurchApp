  
<template>
    <v-app>
        <v-main>
            <v-container class="pa-0">
                <!-- Header -->
                <v-card class="mx-auto" color="grey-lighten-3">
                    <v-layout>
                        <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
                            <template v-slot:image>
                                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
                            </template>

                            <template v-slot:prepend>
                                <router-link to="/" class="title-link">
                                    <v-app-bar-title><v-icon aria-hidden="false">
                                            mdi-fire
                                        </v-icon>HIKANOS
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

                        <v-main>

                        </v-main>
                    </v-layout>
                </v-card>

                <!-- end header  -->
                <!-- Content -->

                <slot />
                <!-- Content -->
            </v-container>
        </v-main>

        <!-- Footer -->

        <v-container class="pa-0">
            <p>gpijsjaktim@2024</p>
        </v-container>

        <!-- Footer -->


    </v-app>
</template>


  
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
</style>