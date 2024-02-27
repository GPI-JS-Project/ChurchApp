<template>
    <!-- <v-card elevation="2" rounded> -->
    <v-container>
        <v-row>
            <v-col cols="12" lg="8" md="8" sm="6">
                <div v-if="todayBirthday.length > 0">
                    <h3 class="align-right mb-5 text-medium-emphasis"> <v-icon class="me-1"
                            icon="mdi-cake-variant"></v-icon> Today</h3>
                </div>
                <div class="mb-5 text-medium-emphasis" v-else>
                    <Alert text="Hari ini tidak ada ulang tahun" />
                </div>
                <BirthdaySkeleton v-if="pending" />
                <v-row v-else>
                    <v-col v-for="user in    todayBirthday   " :key="user['id']" cols="12" sm="12" md="12" lg="12">
                        <CardMobile v-if="$isMobile()" :data="user" :isHover=true buttonName="Kirim ucapan"
                            :isActionCard=true :isShowAvatar="true"
                            :isShowCardText="`<p>Selamat Ulang Tahun <span class='text-decoration-underline'>` + user['name'] + `</span> Panjang umur, sehat selalu <br> Tuhan Yesus memberkati </p>`" />


                        <Card v-else :data="user" :isHover=true buttonName="Kirim ucapan" :isActionCard=true
                            :isShowAvatar="true"
                            :isShowCardText="`<p>Selamat Ulang Tahun <span class='text-decoration-underline'>` + user['name'] + `</span> Panjang umur, sehat selalu <br> Tuhan Yesus memberkati </p>`" />



                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="6">
                <div v-if="tomorrowBirthday.length > 0">
                    <h3 class="align-right mb-5 text-medium-emphasis"> <v-icon class="me-1"
                            icon="mdi-cake-variant"></v-icon> Tomorrow</h3>
                </div>
                <div v-else>
                    <Alert text="Besok ini tidak ada ulang tahun" />
                </div>
                <v-col v-for="   user    in    tomorrowBirthday   " :key="user['id']" cols="12" sm="6" md="6" lg="12">
                    <Card :data="user" :isHover=true :isActionCard=false :imageSize="4" :contentSize="8" :disabled=true />
                </v-col>
            </v-col>
        </v-row>
    </v-container>
    <!-- </v-card> -->
</template>


<script lang="ts">
import { ref } from 'vue';
import { useConfigFetch } from '@/composables/useConfigFetch'; // Assuming this is the correct path to your composable
import BirthdaySkeleton from '@/components/BirthdaySkeleton.vue';
import { type User } from '@/interfaces/User';
import moment from 'moment';
import 'moment/locale/id';
export default {
    components: {
        BirthdaySkeleton
    },
    created() {

        // Use Moment.js with French locale
    },
    setup() {
        moment.locale('id'); // Set locale to French
        let todayBirthday = ref<User[]>([]);
        let tomorrowBirthday = ref<User[]>([]);
        let thisWeekBirthday = ref<User[]>([]);
        const yearNow = moment().format('YYYY');

        const { pending, data: users } = useConfigFetch<User[]>('birthday', {
            lazy: true
        });
        if (!pending.value && Array.isArray(users.value)) {

            const valueToday = users.value.filter(data => data.due === 'ThisMonth');
            todayBirthday.value = valueToday.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                date: moment(user.date.toString()).locale('id').format('DD MMMM').concat(' ' + yearNow),
                due: user.due,
                imageUrl: ""
            }));

            const valueTomorrow = users.value.filter(datas => datas.due === 'ThisMonth');
            tomorrowBirthday.value = valueTomorrow.map(users => ({
                id: users.id,
                name: users.name,
                email: users.email,
                date: moment(users.date.toString()).locale('id').format('DD MMMM').concat(' ' + yearNow),
                due: users.due,
                imageUrl: ""
            }));
        }
        return {
            pending,
            todayBirthday,
            tomorrowBirthday,
            thisWeekBirthday
        };
    }
};
</script>
  
<style scoped>
/* Add styles for rounded corners */
.rounded {
    border-radius: 10px;
    /* Adjust the radius value as needed */
}
</style>