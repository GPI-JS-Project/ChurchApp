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
import { ref } from "vue";
import { useConfigFetch } from "@/composables/useConfigFetch"; // Assuming this is the correct path
import type { BirthdayUser } from "@/interfaces/BirthdayUser";
import type { FilterButton } from "@/interfaces/FilterButton";
import { formatBirthdayToText } from '@/helper/formatHelper';
import Dialog from '@/components/Dialog.vue';

export default defineComponent({
    components: {
        Dialog,
    },
    async setup() { // setup function now async
        const pending = ref(true);
        const result = ref<BirthdayUser[]>([]);
        const isActive = ref(true);
        const showCommentDialog = ref<boolean>(false);
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

        try {
            const { data: users } = await useConfigFetch<BirthdayUser[]>("birthday/", {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });

            if (users.value && Array.isArray(users.value)) {
                const mapData = users.value.map((value) => ({
                    churchID: value.churchID,
                    name: value.name,
                    email: value.email,
                    date: formatBirthdayToText(value.date.toString()),
                    due: value.due,
                    imageUrl: "",
                }));

                // Filter data based on due dates
                todayBirthday.value = mapData.filter((user) => user.due === "Today");
                tomorrowBirthday.value = mapData.filter((user) => user.due === "Tomorrow");
                thisWeekBirthday.value = mapData.filter((user) => user.due === "ThisWeek");
                thisMonthBirthday.value = mapData.filter((user) => user.due === "ThisMonth");

                // Default to today's birthdays
                result.value = todayBirthday.value;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            pending.value = false;
        }

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
            showCommentDialog,
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
</style>