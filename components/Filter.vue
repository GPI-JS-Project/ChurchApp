<template>
    <v-container>
        <v-row>
            <h3 class="text-h6">{{ title }}</h3>
            <v-spacer></v-spacer>
            <v-chip v-for="(valueButton, index) in buttons" :key="index"
                :color="isActive === valueButton.active ? 'teal' : 'grey-darken-1'"
                @click="toggleChip(valueButton.active, valueButton.label)" :append-icon="valueButton.icon" class="ma-2">
                {{ valueButton.text }}
            </v-chip>
        </v-row>
    </v-container>
</template>

<script lang="ts">
export default defineComponent({
    props: {
        isActive: {
            type: Boolean
        },
        buttons: {
            type: Array as () => FilterButton[]
        },
        title: {
            type: String
        }
    },
    methods: {
        // In DynamicButtons.vue
        toggleChip(isActive: boolean, currentLabel: string) {
            // Emit an event to the parent component along with the selected value
            let newButtons: FilterButton[] = [];

            if (this.buttons) {

                // Set all active properties to false
                this.buttons.forEach(button => button.active = false);

                // Find the button with the matching currentLabel and set its active property to true
                const buttonToActivate = this.buttons.find(button => button.label === currentLabel);
                if (buttonToActivate) {
                    buttonToActivate.active = true;
                }
                newButtons = this.buttons;
            }

            isActive = true;

            this.$emit('toggle-chip', { isActive, currentLabel, newButtons } as { isActive: boolean, currentLabel: string, newButtons: FilterButton[] });
        }
    }
});
</script>