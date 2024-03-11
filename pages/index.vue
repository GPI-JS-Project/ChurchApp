<template>
    <div class="mb-2">
        <h3 class="text-subtitle-1">{{ dateNow }}</h3>
    </div>
    <v-card class="rounded-lg mb-6">
        <v-carousel elevation="1" show-arrows="hover" height="300" cycle hide-delimiter-background>
            <v-carousel-item src="/images/1.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/2.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/3.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/4.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/5.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/6.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/7.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/8.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/9.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/10.jpg" cover></v-carousel-item>
            <v-carousel-item src="/images/11.jpg" cover></v-carousel-item>
        </v-carousel>
    </v-card>

    <v-row>
        <v-col lg="6" md="12" sm="12" v-if="result.length > 0">
            <div class="mb-2">
                <h3 class="text-h6">Selamat Ulang Tahun</h3>
            </div>
            <v-card class="rounded-lg mb-6">
                <v-col v-for="user in result" :key="user['churchID']" cols="12">
                    <CardMobile :data="user" :isHover="false" buttonName="Kirim ucapan" :isActionCard="false"
                        :isShowAvatar="true" :avatarSize="80" :isShowCardText="`<p>Selamat Ulang Tahun <span class='text-decoration-underline'>` +
            user['name'] +
            `</span> Panjang umur, sehat selalu <br> Tuhan Yesus memberkati </p>`" />
                    <v-divider></v-divider>
                </v-col>
            </v-card>
        </v-col>
        <v-col lg="6" md="12" sm="12" v-if="resultAnniversary.length > 0">
            <div class="mb-2">
                <h3 class="text-h6">Selamat Ulang Tahun Pernikahan</h3>
            </div>
            <v-card class="rounded-lg mb-6">
                <v-col v-for="user in resultAnniversary" :key="user['husbandID'].toString()" cols="12">
                    <CardMobile :data="user" :isHover="false" :isShowAvatar="true" :isShowCardText="`<p>Selamat Ulang Tahun Pernikahan <span class='text-decoration-underline'>` +
            user['desc'] +
            `</span> <br/> Panjang umur, sehat selalu dan Tuhan Yesus memberkati </p>`" />
                    <v-divider></v-divider>
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>


<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { useConfigFetch } from "@/composables/useConfigFetch"; // Assuming this is the correct path to your composable
import type { BirthdayUser } from "@/interfaces/BirthdayUser";
import type { AnniversaryUser } from "@/interfaces/AnniversaryUser";
import { formatBirthdayToText } from '@/helper/formatHelper'; // Import the helper function
import Dialog from '@/components/Dialog.vue';


export default defineComponent({
    components: {
        Dialog,
    },
    setup() {
        const pending = ref(true); // Define pending outside setup and initialize with ref
        const result = ref<BirthdayUser[]>([]);
        const isActive = ref(true);
        const showCommentDialog = ref<boolean>(false);
        const todayBirthday = ref<BirthdayUser[]>([]);
        const todayAnniversary = ref<AnniversaryUser[]>([]);
        const resultAnniversary = ref<AnniversaryUser[]>([]);
        const dateNow = formatBirthdayToText(new Date().toString());

        const { data: users, refresh } = useConfigFetch<BirthdayUser[]>("birthday", {
            lazy: true,
        });

        const { data: listAnniversary } = useConfigFetch<AnniversaryUser[]>("anniversary", {
            lazy: true,
        });


        if (Array.isArray(users.value)) {
            const valueToday = users.value.filter((data) => data.due === "Today");

            todayBirthday.value = valueToday.map((user) => ({
                churchID: user.churchID,
                name: user.name,
                email: user.email,
                date: formatBirthdayToText(user.date.toString()),
                due: user.due,
                imageUrl: "",
            }));
            result.value = todayBirthday.value; // Default to today's birthday 
            pending.value = false; // Set pending to false when data is loaded
        }

        if (Array.isArray(listAnniversary.value)) {
            const valueToday = listAnniversary.value.filter((data) => data.due === "Today");
            todayAnniversary.value = valueToday.map((value) => ({
                date: formatBirthdayToText(value.date.toString()),
                due: value.due,
                husband: value.husband,
                husbandID: value.husbandID,
                wife: value.wife,
                husbandPhotoUrl: value.husbandPhotoUrl,
                wifeID: value.wifeID,
                wifePhotoUrl: value.wifePhotoUrl,
                desc: value.desc,
                name: value.desc
            }));
            resultAnniversary.value = todayAnniversary.value; // Default to today'sanniversary
            pending.value = false; // Set pending to false when data is loaded
        }

        watch(users, (newValue) => {
            if (Array.isArray(newValue)) {
                const valueToday = newValue.filter((data) => data.due === "Today");

                todayBirthday.value = valueToday.map((user) => ({
                    churchID: user.churchID,
                    name: user.name,
                    email: user.email,
                    date: formatBirthdayToText(user.date.toString()),
                    due: user.due,
                    imageUrl: "",
                }));
                result.value = todayBirthday.value; // Default to today's birthday
            }
            pending.value = false; // Set pending to false when data is loaded
        });

        watch(listAnniversary, (newValue) => {

            if (Array.isArray(newValue)) {
                const valueToday = newValue.filter((data) => data.due === "Today");
                todayAnniversary.value = valueToday.map((value) => ({
                    date: formatBirthdayToText(value.date.toString()),
                    due: value.due,
                    husband: value.husband,
                    husbandID: value.husbandID,
                    wife: value.wife,
                    husbandPhotoUrl: value.husbandPhotoUrl,
                    wifeID: value.wifeID,
                    wifePhotoUrl: value.wifePhotoUrl,
                    desc: value.desc,
                    name: value.desc
                }));
                resultAnniversary.value = todayAnniversary.value; // Default to today'sanniversary
            }

            pending.value = false; // Set pending to false when data is loaded
        });


        return {
            pending,
            result,
            resultAnniversary,
            isActive,
            showCommentDialog,
            dateNow
        };
    },
});

</script>