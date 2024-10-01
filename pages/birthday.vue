<template>
    <Filter :isActive="isActive" :buttons="buttons" @toggle-chip="handleToggleChip" title="Birthday" />
    <v-row>
        <v-col cols="12">
            <v-card class="rounded-xl">
                <v-container>
                    <div v-if="!pending && result.length > 0">
                        <v-row>
                            <v-col v-for="user in result" :key="user['churchID']" cols="12" sm="12" md="12" lg="12">
                                <CardMobile v-if="$isMobile()" :data="user" :isHover="false" buttonName="Kirim ucapan"
                                    :isActionCard="true" :isShowAvatar="true" :isShowCardText="`<p>Selamat Ulang Tahun <span class='text-decoration-underline'>` +
        user['name'] +
        `</span> Panjang umur, sehat selalu <br> Tuhan Yesus memberkati </p>`" @action-button="handleActionButton" />

                                <Card v-else :data="user" :isHover="true" buttonName="Kirim ucapan" :isActionCard="true"
                                    :isShowAvatar="true" :isShowCardText="`<p>Selamat Ulang Tahun <span class='text-decoration-underline'>` +
        user['name'] +
        `</span> Panjang umur, sehat selalu <br> Tuhan Yesus memberkati </p>`" @action-button="handleActionButton" />
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else-if="pending">
                        <BirthdaySkeleton />
                    </div>
                    <div v-else class="mb-5 text-medium-emphasis">
                        <Alert text="Tidak ada jemaat yang ulang tahun" />
                    </div>

                    <div v-show="showCommentDialog">
                        <Dialog :dialog="showCommentDialog" @update:dialog="showCommentDialog = $event" />
                    </div>

                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { useConfigFetch } from "@/composables/useConfigFetch"; // Assuming this is the correct path to your composable
import type { BirthdayUser } from "@/interfaces/BirthdayUser";
import type { FilterButton } from "@/interfaces/FilterButton";
import { formatBirthdayToText } from '@/helper/formatHelper'; // Import the helper function
import Dialog from '@/components/Dialog.vue';
import { birthdateStorage } from '@/stores/birthday'; // Sesuaikan path jika diperlukan



export default defineComponent({
    components: {
        Dialog,
    },
    setup() {
        // const birthdayStore = birthdateStorage();
        const pending = ref(true); // Define pending outside setup and initialize with ref
        const result = ref<BirthdayUser[]>([]);
        const isActive = ref(true);
        const showCommentDialog = ref<boolean>(false);
        const users = ref<BirthdayUser[]>([]);
        const todayBirthday = ref<BirthdayUser[]>([]);
        const tomorrowBirthday = ref<BirthdayUser[]>([]);
        const thisWeekBirthday = ref<BirthdayUser[]>([]);
        const thisMonthBirthday = ref<BirthdayUser[]>([]);
        const buttons = ref([
            { active: true, label: "Today", text: "Today", icon: "mdi-cake-variant" },
            { active: false, label: "Tomorrow", text: "Tomorrow", icon: "mdi-gift-open-outline" },
            { active: false, label: "ThisWeek", text: "This Week", icon: "mdi-calendar-week" },
            { active: false, label: "ThisMonth", text: "This Month", icon: "mdi-calendar-month-outline" },
        ]);

        // // Check if data is expired and reset if necessary
        // const checkExpiry = () => {
        //     const now = new Date();
        //     if (now > new Date(birthdayStore.expiredAt)) {
        //         birthdayStore.clearBirthday(); // Reset data if expired
        //     }
        // };

        // // Load from store if available
        // checkExpiry(); // Check for expiration before loading data
        // // Load from store if available
        // if (birthdayStore.getData.length > 0) {

        //     todayBirthday.value = birthdayStore.today;
        //     tomorrowBirthday.value = birthdayStore.tomorrow;
        //     thisWeekBirthday.value = birthdayStore.thisWeek;
        //     thisMonthBirthday.value = birthdayStore.thisMonth;

        //     result.value = birthdayStore.today;
        //     pending.value = false;


        // } else {
        // Fetch from API if no store data
        try {
            const { data: users, refresh } = useConfigFetch<BirthdayUser[]>("birthday/", {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                }
            });

            if (Array.isArray(users.value)) {

                var mapData = users.value.map((value) => ({
                    churchID: value.churchID,
                    name: value.name,
                    email: value.email,
                    date: formatBirthdayToText(value.date.toString()),
                    due: value.due,
                    imageUrl: "",
                }));

                const today = mapData.filter((user) => user.due === "Today");
                const tomorrow = mapData.filter((user) => user.due === "Tomorrow");
                const thisWeek = mapData.filter((user) => user.due === "ThisWeek");
                const thisMonth = mapData.filter((user) => user.due === "ThisMonth");

                todayBirthday.value = today;
                tomorrowBirthday.value = tomorrow;
                thisWeekBirthday.value = thisWeek;
                thisMonthBirthday.value = thisMonth;
                // const expiredAt = new Date(); // Set expiredAt to now or appropriate date

                // birthdayStore.setBirthday(today, tomorrow, thisWeek, thisMonth, expiredAt);
                result.value = today; // Default to today's birthday
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            pending.value = false;
        }
        // }
        const handleToggleChip = ({
            isActive,
            currentLabel,
            newButtons,
        }: {
            isActive: boolean;
            currentLabel: string;
            newButtons: FilterButton[];
        }) => {
            switch (currentLabel) {
                case "Today":
                    result.value = todayBirthday.value;
                    break;
                case "Tomorrow":
                    result.value = tomorrowBirthday.value;
                    break;
                case "ThisWeek":
                    result.value = thisWeekBirthday.value;
                    break;
                case "ThisMonth":
                    result.value = thisMonthBirthday.value;
                    break;
            }
            isActive = isActive;
            buttons.value = newButtons;
        };


        const handleActionButton = () => {
            showCommentDialog.value = true;
        };

        return {
            pending,
            result,
            buttons,
            isActive,
            handleToggleChip,
            handleActionButton,
            showCommentDialog
        };
    },
});

</script>

<style scoped>
/* Add styles for rounded corners */
.rounded {
    border-radius: 10px;
    /* Adjust the radius value as needed */
}
</style>~/stores/birthday