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
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { useConfigFetch } from "@/composables/useConfigFetch"; // Assuming this is the correct path to your composable
import type { BirthdayUser } from "@/interfaces/BirthdayUser";
import { formatBirthdayToText } from '@/helper/formatHelper'; // Import the helper function


export default defineComponent({
    setup() {
        const pending = ref(true); // Define pending outside setup and initialize with ref
        const result = ref<BirthdayUser[]>([]);
        const isActive = ref(true);
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

        const { data: users, refresh } = useConfigFetch<BirthdayUser[]>("birthday", {
            lazy: true,
        });
        if (Array.isArray(users.value)) {
            const valueToday = users.value.filter((data) => data.due === "Today");
            const valueTomorrow = users.value.filter((datas) => datas.due === "Tomorrow");
            const valueThisWeek = users.value.filter((datas) => datas.due === "ThisWeek");
            const valueThisMonth = users.value.filter((datas) => datas.due === "ThisMonth");

            todayBirthday.value = valueToday.map((user) => ({
                churchID: user.churchID,
                name: user.name,
                email: user.email,
                date: formatBirthdayToText(user.date.toString()),
                due: user.due,
                imageUrl: "",
            }));

            tomorrowBirthday.value = valueTomorrow.map((users) => ({
                churchID: users.churchID,
                name: users.name,
                email: users.email,
                date: formatBirthdayToText(users.date.toString()),
                due: users.due,
                imageUrl: "",
            }));

            thisWeekBirthday.value = valueThisWeek.map((users) => ({
                churchID: users.churchID,
                name: users.name,
                email: users.email,
                date: formatBirthdayToText(users.date.toString()),
                due: users.due,
                imageUrl: "",
            }));

            thisMonthBirthday.value = valueThisMonth.map((users) => ({
                churchID: users.churchID,
                name: users.name,
                email: users.email,
                date: formatBirthdayToText(users.date.toString()),
                due: users.due,
                imageUrl: "",
            }));

            result.value = todayBirthday.value; // Default to today's birthday
            pending.value = false;
        }


        watch(users, (newValue) => {
            if (Array.isArray(newValue)) {
                const valueToday = newValue.filter((data) => data.due === "Today");
                const valueTomorrow = newValue.filter((datas) => datas.due === "Tomorrow");
                const valueThisWeek = newValue.filter((datas) => datas.due === "ThisWeek");
                const valueThisMonth = newValue.filter((datas) => datas.due === "ThisMonth");

                todayBirthday.value = valueToday.map((user) => ({
                    churchID: user.churchID,
                    name: user.name,
                    email: user.email,
                    date: formatBirthdayToText(user.date.toString()),
                    due: user.due,
                    imageUrl: "",
                }));

                tomorrowBirthday.value = valueTomorrow.map((users) => ({
                    churchID: users.churchID,
                    name: users.name,
                    email: users.email,
                    date: formatBirthdayToText(users.date.toString()),
                    due: users.due,
                    imageUrl: "",
                }));

                thisWeekBirthday.value = valueThisWeek.map((users) => ({
                    churchID: users.churchID,
                    name: users.name,
                    email: users.email,
                    date: formatBirthdayToText(users.date.toString()),
                    due: users.due,
                    imageUrl: "",
                }));

                thisMonthBirthday.value = valueThisMonth.map((users) => ({
                    churchID: users.churchID,
                    name: users.name,
                    email: users.email,
                    date: formatBirthdayToText(users.date.toString()),
                    due: users.due,
                    imageUrl: "",
                }));

                result.value = todayBirthday.value; // Default to today's birthday
            }
            pending.value = false; // Set pending to false when data is loaded
        });
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

        const handleActionButton = ({
            churchID
        }: {
            churchID: string;
        }) => {
            console.log(churchID);
        };

        return {
            pending,
            result,
            buttons,
            isActive,
            handleToggleChip,
            handleActionButton
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