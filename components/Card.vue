<template>
    <div v-if="isHover">
        <v-hover v-slot="{ isHovering, props }" close-delay="100">
            <v-card shaped class="mx-auto" max-width="800" :elevation="isHovering ? 16 : 2"
                :class="{ 'on-hover': isHovering }" v-bind="props" :disabled="disabled">
                <!-- Increased max-width for better visibility -->
                <v-row>
                    <v-col cols="12" :md="imageSize"> <!-- Adjust column width based on your design -->
                        <v-img class="align-end text-white rounded-lg"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)" cover src="/images/profilavatar.jpg">
                            <!-- Leave image content here if needed -->
                        </v-img>
                    </v-col>
                    <v-col cols="12" :md="contentSize"> <!-- Adjust column width based on your design -->
                        <v-card-title class="title">
                            <div class="text-wrap">
                                <v-chip color="teal" class="ma-2" density="compact">
                                    {{ data['date'] }}
                                </v-chip>
                                <p>{{ data['name'] }}</p>
                            </div>

                        </v-card-title>
                        <v-card-text v-show='isShowCardText != ""'>
                            <p v-html="isShowCardText"></p>

                        </v-card-text>
                        <v-card-actions v-show="isActionCard">
                            <v-btn @click="actions(data['churchID'])" color="teal-darken-4">
                                {{ buttonName }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <div class="justify-self-end mr-5">
                                <v-icon class="me-1" icon="mdi-heart" color="grey-lighten-1"></v-icon>
                                <span class="subheading me-8" color="grey-lighten-1">0</span>

                                <v-icon class="me-1" icon="mdi-comment" color="grey-lighten-1"></v-icon>
                                <span class="subheading" color="grey-lighten-1">0</span>
                            </div>
                        </v-card-actions>
                    </v-col>

                </v-row>
            </v-card>
        </v-hover>
    </div>
    <div v-else>
        <v-card class="mx-auto" max-width="800" :disabled="disabled" elevation="1">
            <!-- Increased max-width for better visibility -->
            <v-row>
                <v-col cols="12" :md="imageSize"> <!-- Adjust column width based on your design -->
                    <v-img class="align-end text-white rounded-lg" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                        cover src="/images/profilavatar.jpg">
                        <!-- Leave image content here if needed -->
                    </v-img>
                </v-col>
                <v-col cols="12" :md="contentSize"> <!-- Adjust column width based on your design -->
                    <v-card-title class="title">
                        <div class="text-wrap">
                            <v-avatar v-show="isShowAvatar" image="/images/profilavatar.jpg"></v-avatar>
                            {{ data['name'] }}
                        </div>

                    </v-card-title>
                    <v-card-text v-show='isShowCardText != ""'>
                        <p v-html="isShowCardText"></p>

                    </v-card-text>
                    <v-card-actions v-show="isActionCard">
                        <v-btn @click="actions(data['churchID'])" color="teal-darken-4">
                            {{ buttonName }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <div class="justify-self-end mr-5">
                            <v-icon class="me-1" icon="mdi-heart"></v-icon>
                            <span class="subheading me-8">0</span>

                            <v-icon class="me-1" icon="mdi-comment"></v-icon>
                            <span class="subheading">0</span>
                        </div>
                    </v-card-actions>
                </v-col>


            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts">

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isHover: {
            type: Boolean,
            default: false
        },
        isActionCard: {
            type: Boolean,
            default: false
        },
        isShowAvatar: {
            type: Boolean,
            default: false
        },
        isShowCardText: {
            type: String,
            default: ""
        },
        buttonName: {
            type: String,
            default: "Beri Ucapan"
        },
        imageSize: {
            type: Number,
            default: 3
        },
        contentSize: {
            type: Number,
            default: 9
        }
    },
    methods: {
        actions(churchID: string) {
            this.$emit('action-button', { churchID } as { churchID: string });
        }
    }
});
</script>

<style scoped>
.v-card--shaped {
    border-radius: 24px 4px;
}
</style>