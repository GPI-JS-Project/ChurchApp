<template>
    <div v-if="isHover">
        <v-hover v-slot="{ isHovering, props }" close-delay="100">
            <v-card class="mx-auto" max-width="800" :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }"
                v-bind="props" :disabled="disabled">
                <v-row>
                    <v-col cols="12"> <!-- Adjust column width based on your design -->
                        <v-card-title class="title">
                            <v-row>
                                <v-col cols="4">
                                    <v-avatar size="80" v-show="isShowAvatar" image="../assets/pakeddy.jpg"></v-avatar>
                                </v-col>
                                <v-col cols="8" class="text-wrap">
                                    {{ data['name'] }}
                                </v-col>
                            </v-row>
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
        </v-hover>
    </div>
    <div v-else>
        <v-card class="mx-auto" max-width="800" :disabled="disabled">
            <!-- Increased max-width for better visibility -->
            <v-row>
                <v-col cols="12"> <!-- Adjust column width based on your design -->
                    <v-card-title class="title">
                        <v-row>
                            <v-col cols="4">
                                <v-avatar size="80" v-show="isShowAvatar" image="../assets/pakeddy.jpg"></v-avatar>
                            </v-col>
                            <v-col cols="8" class="text-wrap">

                                <v-chip color="teal" class="ma-2" density="compact">
                                    {{ data['date'] }}
                                </v-chip>
                                <p>{{ data['name'] }}</p>

                            </v-col>
                        </v-row>
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

<style scoped></style>