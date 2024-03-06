<template>
    <div>
        <v-alert :type="alertType" :color="color" :title="title" :text="text" :variant="variant"></v-alert>
    </div>
</template>


<script lang="ts">

export default defineComponent({
    props: {
        alertType: {
            type: String as () => 'info' | 'error' | 'success' | 'warning' | undefined,
            default: "info",
        },
        color: {
            type: String,
            default: "teal",
        },
        title: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: "Data not found"
        },
        variant: {
            type: String as () => 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined,
            default: "outlined",
        }
    }
});
</script>

<style scoped></style>