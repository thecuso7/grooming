<template>
    <div>
        <h1 class="text-3xl text-black pb-6">Пользователь</h1>
        <v-sheet class="mx-auto" width="300">
            <v-form fast-fail @submit.prevent>
                <v-text-field
                    v-model="firstName"
                    :rules="firstNameRules"
                    label="Имя"
                    variant="outlined"
                ></v-text-field>

                <v-text-field
                    v-model="lastName"
                    :rules="lastNameRules"
                    label="Фамилия"
                    variant="outlined"
                ></v-text-field>

                <v-btn class="mt-2" type="submit" block>Сохранить</v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const { $api } = useNuxtApp();
    const users = ref([]);

    // Как-то надо отделить логику работы с данными от работы модуля ui
    /**
     * Как можно сделать 
     * 
     */
    onMounted(async() => {
        // users.value = await $api('/api/users');

        
    });
 
</script>