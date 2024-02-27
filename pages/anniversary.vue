<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <div class="mb-5 text-medium-emphasis" v-if="todayAnniversary.length > 0">
                    <h1>Selamat ulang tahun pernikahan</h1>
                    <h1 class="text-h5">kepada jemaat sekalian yang berbahagia hari ini. Semoga bahagia selalu, berlimpah
                        kasih dan damai sejahterah, <br>
                        Tuhan Yesus memberkati.</h1>
                    <p></p>
                </div>
                <div class="mb-5 text-medium-emphasis" v-else>
                    <v-alert type="info" color="teal" title="Perhatian" text="Hari ini tidak ada ulang tahun pernikahan"
                        variant="outlined"></v-alert>
                </div>
                <BirthdaySkeleton v-if="pending" />

                <v-row v-else>

                    <v-col v-for="user in todayAnniversary" :key="user['id']" cols="12" sm="6" md="6" lg="12">
                        <v-hover v-slot="{ isHovering, props }" close-delay="100">

                            <v-card class="mx-auto" max-width="800" :elevation="isHovering ? 16 : 2"
                                :class="{ 'on-hover': isHovering }" v-bind="props">
                                <!-- Increased max-width for better visibility -->
                                <v-row>
                                    <v-col cols="12" md="3"> <!-- Adjust column width based on your design -->
                                        <v-img class="align-end text-white"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)" cover
                                            src="../assets/profilavatar.jpg">
                                            <!-- Leave image content here if needed -->
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" md="9"> <!-- Adjust column width based on your design -->
                                        <v-card-title class="title">
                                            <div class="text-wrap">{{ user['name'] }}</div>
                                            <v-chip prepend-icon="mdi-cake-variant" variant="outlined">
                                                {{ user['date'] }}
                                            </v-chip>
                                        </v-card-title>
                                        <v-card-text>
                                            <p>Selamat Ulang Tahun <span class="text-decoration-underline">{{ user['name']
                                            }}</span>
                                                <br> Tuhan Yesus memberkati
                                            </p>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn color="teal-darken-4">
                                                Beri Ucapan
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <div class="justify-self-end mr-5">
                                                <v-icon class="me-1" icon="mdi-heart"></v-icon>
                                                <span class="subheading me-2">0</span>
                                                <span class="me-1">·</span>
                                                <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                                                <span class="subheading">0</span>
                                            </div>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4">
                <div class="mb-5 text-medium-emphasis" v-if="tomorrowAnniversary.length > 0">
                    <h1 class="text-h5">Besok</h1>
                </div>
                <div class="mb-5 text-medium-emphasis" v-else>
                    <v-alert type="info" title="Perhatian" color="teal" text="Besok tidak ada ulang tahun pernikahan"
                        variant="outlined"></v-alert>
                </div>
                <v-col v-for="user in tomorrowAnniversary" :key="user['id']" cols="12" sm="6" md="6" lg="12">
                    <v-hover v-slot="{ isHovering, props }" close-delay="100">

                        <v-card class="mx-auto" :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                            v-bind="props" disabled>
                            <!-- Increased max-width for better visibility -->
                            <v-row>
                                <v-col cols="12" md="4"> <!-- Adjust column width based on your design -->
                                    <v-img class="align-end text-white" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                                        cover src="../assets/profilavatar.jpg">
                                        <!-- Leave image content here if needed -->
                                    </v-img>
                                </v-col>
                                <v-col cols="12" md="8"> <!-- Adjust column width based on your design -->
                                    <v-card-title class="title">
                                        <div class="text-wrap">{{ user['name'] }}</div>
                                        <v-chip prepend-icon="mdi-cake-variant" variant="outlined">
                                            {{ user['date'] }}
                                        </v-chip>
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-col>

        </v-row>




    </v-container>
    <BirthdaySkeleton v-if="pending" />
</template>


<script lang="ts">
import { ref } from 'vue';
import { useConfigFetch } from '@/composables/useConfigFetch'; // Assuming this is the correct path to your composable
import BirthdaySkeleton from '@/components/BirthdaySkeleton.vue';
import moment from 'moment';
import 'moment/locale/id';

// import 'moment/locale/id'; // Import French locale, for example



interface User {
    id: number;
    name: string;
    email: String;
    date: String;
    due: String;
}

export default {
    components: {
        BirthdaySkeleton
    },
    created() {

        // Use Moment.js with French locale
    },
    setup() {
        moment.locale('id'); // Set locale to French
        let todayAnniversary = ref<User[]>([]);
        let tomorrowAnniversary = ref<User[]>([]);
        let tomorrowthisWeek = ref<User[]>([]);
        const yearNow = moment().format('YYYY');

        const { pending, data: users } = useConfigFetch<User[]>('anniversary', {
            lazy: true
        });
        if (!pending.value && Array.isArray(users.value)) {

            const valueToday = users.value.filter(data => data.due === 'NextMonth');
            todayAnniversary.value = valueToday.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                date: moment(user.date.toString()).locale('id').format('DD MMMM').concat(' ' + yearNow),
                due: user.due
            }));

            const valueTomorrow = users.value.filter(datas => datas.due === 'Tomorrow');
            tomorrowAnniversary.value = valueTomorrow.map(users => ({
                id: users.id,
                name: users.name,
                email: users.email,
                date: moment(users.date.toString()).locale('id').format('DD MMMM').concat(' ' + yearNow),
                due: users.due
            }));
        }
        return {
            pending,
            todayAnniversary,
            tomorrowAnniversary,
            tomorrowthisWeek
        };
    }
};
</script>
  