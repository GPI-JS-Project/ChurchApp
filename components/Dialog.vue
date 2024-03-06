<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>

            <v-card>
                <v-toolbar>
                    <v-btn icon="mdi-close" @click="closeDialog"></v-btn>

                    <v-toolbar-title>Settings</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>
                        <v-btn text="Save" variant="text"></v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <div>
                    <h1>Dialog</h1>
                </div>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:dialog'],
    setup(props, { emit }) {
        const showDialog = ref(props.dialog);

        const closeDialog = () => {
            showDialog.value = false;
            emit('update:dialog', false); // Emitting event to update the prop in parent
        };

        return {
            showDialog,
            closeDialog
        };
    }
});
</script>