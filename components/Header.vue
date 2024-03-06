<template>
    <v-card class="mx-auto" color="grey-lighten-3">
        <v-layout>
            <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
                <template v-slot:image>
                    <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
                </template>

                <template v-slot:prepend>
                    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                    <router-link to="/" class="title-link">
                        <v-app-bar-title><v-icon aria-hidden="false">
                                mdi-fire
                            </v-icon>HIKANOS
                        </v-app-bar-title>
                    </router-link>
                </template>

                <!-- <v-app-bar-title>HIKANOS</v-app-bar-title> -->

                <v-spacer></v-spacer>

                <v-btn to="/birthday" prepend-icon="mdi-cake-variant-outline" variant="text">
                    Birthday
                </v-btn>
                <v-btn to="/anniversary" prepend-icon="mdi-human-male-female" variant="text">
                    Anniversary
                </v-btn>
                <v-btn to="/event" prepend-icon="mdi-calendar-clock" variant="text">
                    Event
                </v-btn>
                <v-btn to="/news" prepend-icon="mdi-newspaper-variant-multiple" variant="text">
                    News
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <!-- <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn> -->

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <v-main>

            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>
/* Style the router-link to look like a link */
.title-link {
    color: inherit;
    text-decoration: none;
}
</style>