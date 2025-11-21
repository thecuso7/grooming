<template>
    <div>
        <h2 class="tw-text-3xl tw-font-bold tw-text-gray-800 tw-mb-8 tw-font-heading">Личные данные</h2>
        <div class="tw-flex tw-gap-10 tw-relative tw-flex-col-reverse md:tw-flex-row">
            <div class="tw-w-full md:tw-w-8/12 tw-font-bold">
                <div class="tw-mb-10">
                    <div class="tw-max-w-6xl tw-mx-auto">
                        <pets v-if="valueFields.id" :ids="valueFields.pets"></pets>
                    </div>
                </div>
                <div class="tw-mb-10">
                    <div class="tw-max-w-6xl tw-mx-auto">
                        <shedule></shedule>
                    </div>
                </div>
            </div>
            <div class="tw-top-[15px] tw-bg-custom-purple tw-rounded-lg tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-w-full md:tw-w-4/12 tw-border-1 tw-border-gray-400 tw-py-4 tw-px-4 lg:tw-sticky tw-h-fit">
                <div class="tw-space-y-4 info-block">
                    <!-- Поле Фамилия -->
                    <div class="tw-relative tw-group field-wrap">
                        <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Фамилия</label>
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <span id="lastNameValue"
                             class="tw-text-gray-900 tw-font-medium tw-py-2 tw-pr-8"
                             :class="{ 'tw-hidden' : showFields.lastName }"
                             >{{ valueFields.lastName }}</span>

                            <v-text-field
                                v-model="valueFields.lastName"
                                @change="v$.lastName.$touch"
                                :error-messages="v$.lastName.$errors.map(e => e.$message)"
                                :class="{ '!tw-hidden' : !showFields.lastName }"
                                variant="outlined"
                                density="comfortable"
                                hide-details
                            ></v-text-field>
                            <button 
                                @click="editData('lastName')"
                                class="tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200 tw-ml-2 tw-p-2 hover:tw-bg-gray-100 tw-rounded-lg"
                            >
                                <svg class="tw-w-5 tw-h-5 tw-text-gray-500 hover:tw-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Поле Имя -->
                    <div class="tw-relative tw-group field-wrap">
                        <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Имя</label>
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <span id="firstNameValue" class="tw-text-gray-900 tw-font-medium tw-py-2 tw-pr-8"
                            :class="{ 'tw-hidden' : showFields.name }"
                            >{{ valueFields.name }}</span>
                            <v-text-field
                                v-model="valueFields.name"
                                @change="v$.name.$touch"
                                :error-messages="v$.name.$errors.map(e => e.$message)"
                                :class="{ '!tw-hidden' : !showFields.name }"
                                variant="outlined"
                                density="comfortable"
                                hide-details
                            ></v-text-field>
                            <button 
                                @click="editData('name')"
                                class="tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200 tw-ml-2 tw-p-2 hover:tw-bg-gray-100 tw-rounded-lg"
                            >
                                <svg class="tw-w-5 tw-h-5 tw-text-gray-500 hover:tw-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Поле Email -->
                    <div class="tw-relative tw-group field-wrap">
                        <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Email</label>
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <span id="emailValue" class="tw-text-gray-900 tw-font-medium tw-py-2 tw-pr-8"
                            :class="{ 'tw-hidden' : showFields.email }"
                            >{{ valueFields.email }}</span>
                            <v-text-field
                                v-model="valueFields.email"
                                @change="v$.email.$touch"
                                :error-messages="v$.email.$errors.map(e => e.$message)"
                                :class="{ '!tw-hidden' : !showFields.email }"
                                variant="outlined"
                                density="comfortable"
                                hide-details
                            ></v-text-field>
                            <button 
                                @click="editData('email')"
                                class="tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200 tw-ml-2 tw-p-2 hover:tw-bg-gray-100 tw-rounded-lg"
                            >
                                <svg class="tw-w-5 tw-h-5 tw-text-gray-500 hover:tw-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="tw-relative tw-group field-wrap">
                        <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Пароль</label>
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <span id="emailValue" class="tw-text-gray-900 tw-font-medium tw-py-2 tw-pr-8"
                            :class="{ 'tw-hidden' : showFields.password }"
                            >{{ password }}</span>

                            <v-text-field
                                v-model="password"
                                @change="v$.password.$touch"
                                :error-messages="v$.password.$errors.map(e => e.$message)"
                                :class="{ '!tw-hidden' : !showFields.password }"
                                variant="outlined"
                                density="comfortable"
                                hide-details
                            ></v-text-field>
                            <button 
                                @click="editData('password')"
                                class="tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-200 tw-ml-2 tw-p-2 hover:tw-bg-gray-100 tw-rounded-lg"
                            >
                                <svg class="tw-w-5 tw-h-5 tw-text-gray-500 hover:tw-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="isDataSaved">Данные успешно обновлены!</div>
                    <button v-if="showBtn" @click="saveData" type="button" class="tw-py-2.5 tw-px-5 tw-me-2 tw-mb-2 tw-text-sm tw-font-medium focus:tw-outline-none tw-bg-custom-btn tw-rounded-lg tw-border tw-border-gray-200 focus:tw-z-10 focus:tw-ring-4 focus:tw-ring-gray-100">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, watch, nextTick } from 'vue';
    import Pets from '~/components/public/profile/pets.vue';
    import Shedule from '~/components/public/profile/shedule.vue';

    const { $api } = useNuxtApp();
    const { validate } = useValidation();

    const dataUpdated = ref(false);
    const initialized = ref(false);
    const isDataSaved = ref(false);

    // interface ShowFields {
    //     [index: string]: boolean
    // }

    const showFields = reactive({
        email: false,
        name: false,
        lastName: false,
        password: false,
    });

    const valueFields = reactive({
        email: '',
        name: '',
        lastName: '',
        id: '',
        password: '',
    });

    const rulesFields = {
        email: ['required', 'email'],
        name: ['required'],
		lastName: ['required'],
    };

    const { v$ } = validate(valueFields, rulesFields);

    const showBtn = computed(() => Object.values(showFields).some(value => value));

    const password = computed({
        get: () => {
            if(showFields.password) {
                return ''; 
            } else { 
                return '******'
            };
        },
        set: (newValue) => {
            valueFields.password = newValue;
        }
    });

    watch (valueFields, () => {
        if (!initialized.value) return;

        dataUpdated.value = true;
    }, { deep: true });

    const editData = (field) => {
        showFields[field] = true;
    } 

    const saveData = async () => {
        if (dataUpdated.value) {
            v$.value.$touch();
			if(v$.value.$invalid) {
				return;
			}
            const dataUpdate = {
                email: valueFields.email,
                name: valueFields.name,
                lastName: valueFields.lastName,
            };

            if(valueFields.password !== '') {
                dataUpdate.password = valueFields.password;
            }

            await $api('/api/users/me', {
                method: 'PUT',
                body: dataUpdate
            });

            dataUpdated.value = false;
            isDataSaved.value = true;

            setTimeout(() => {
                isDataSaved.value = false;
            }, 3000);
        }

        Object.keys(showFields).forEach(value => {
            showFields[value] = false;
        });
    }

    onMounted(async() => {
        const resp = await $api('/api/users/me');

        valueFields.email = resp.email;
        valueFields.name = resp.name;
        valueFields.lastName = resp.lastName;
        valueFields.id = resp.id;
        valueFields.pets = resp.pets;

        await nextTick();

        initialized.value = true;
    });
</script>

<style>
.field-wrap input {
    border: 1px solid rgb(209 213 219 / 1);
}

.field-wrap input:focus {
    outline: none;
}

.info-block button {
    color: #fff;
}
</style>