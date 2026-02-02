<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Данные услуги {{ data.id }}</h1>
        <v-sheet class="tw-flex" max-width="600">
            <v-form fast-fail @submit.prevent="submit">
                <v-text-field
                    v-model="data.title"
                    @change="v$.title.$touch"
                    :error-messages="v$.title.$errors.map(e => e.$message)"
                    label="Название"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <v-text-field
                    v-model="data.description"
                    @change="v$.description.$touch"
                    :error-messages="v$.description.$errors.map(e => e.$message)"
                    label="Описание"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>

                <div class="tw-flex tw-gap-4">
                    <v-number-input
                        v-model="safeHours"
                        label="Часы"
                        variant="outlined"
                        density="comfortable"
                        :error-messages="timeError.hours"
                        :max="24"
                        :min="0"
                        control-variant="hidden"
                    ></v-number-input>

                    <v-number-input
                        v-model="safeMinutes"
                        label="Минуты"
                        variant="outlined"
                        density="comfortable"
                        :error-messages="timeError.minutes"
                        :max="60"
                        :min="0"
                        control-variant="hidden"
                    ></v-number-input>
                </div>
                <v-text-field
                    v-model="data.price"
                    @change="v$.price.$touch"
                    :error-messages="v$.price.$errors.map(e => e.$message)"
                    label="Цена"
                    variant="outlined"
                    density="comfortable"
                ></v-text-field>
                <v-checkbox 
                    label="Обязательная услуга"
                    v-model="data.required"
                ></v-checkbox>
                <v-select
                    v-model="data.type"
                    @update:modelValue="v$.type.$touch"
                    :error-messages="v$.type.$errors.map(e => e.$message)"
                    label="Тип"
                    :items="typeList"
                    variant="outlined"
                    density="comfortable"
                ></v-select>

                <v-select
                    v-if="selectedTypeCode == 'complex'"
                    v-model="data.bundle"
                    @update:modelValue="v$.bundle.$touch"
                    :error-messages="v$.bundle.$errors.map(e => e.$message)"
                    label="Состав"
                    :items="serviceList"
                    variant="outlined"
                    density="comfortable"
                    multiple
                ></v-select>
                <v-btn class="mt-2 bg-blue-lighten-1" type="submit" block dark>
                    <span v-if="savedStatus">Сохранено</span>
                    <span v-else>Сохранить</span>
                </v-btn>
                <v-btn @click="deleteService" class="mt-2 bg-red-lighten-1" type="button" block dark>
                    <span>Удалить</span>
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';

    const { $api } = useNuxtApp();
    const { validate } = useValidation();

    const route = useRoute();
    const id = route.params.id;
    const savedStatus = ref(false);
    const data = reactive({
        title: '',
        description: '',
        duration: 0,
        price: '',
        type: null,
        hours: 0,
        minutes: 0,
        required: false,
        bundle: []
    });

    const rulesFields = {
        title: ['required'],
        duration: ['required'],
        price: ['required'],
    };

    const typeList = ref([]);
    const serviceList = ref([]);
    const timeError = reactive({
        hours: '',
        minutes: '',
    });

    const timeValidator = (value, siblings) => {
        if(siblings.hours == 0 && siblings.minutes == 0 && value == '0') {
            if(siblings.hours == 0) {
                timeError.hours = 'Укажите время';
            }

            if(siblings.minutes == 0) {
                timeError.minutes = 'Укажите время';
            }
            
            return false;
        }
        
        return true;
    };

    const { v$, updateValidateFromApi } = validate(data, rulesFields, { duration: { validator: { $validator: timeValidator }}});

    const submit = async () => {
        if(v$.value.$anyDirty) {
            if (v$.value.$invalid) {
                v$.value.$touch();
                return;
            }

            try {
                const resp = await $api('/api/services/' + id, {
                    method: 'PUT',
                    body: data,
                });

                savedStatus.value = true;
                setTimeout(() => savedStatus.value = false, 2000);
            } catch(error) {
                updateValidateFromApi(error);
            }
        }
    }

    const deleteService = async () => {
        try {
            await $api('/api/services/' + id, {
                method: 'DELETE',
            });

            navigateTo('/admin/services');
        } catch(error) {
            updateValidateFromApi(error);
        }
    }

    const selectedTypeCode = computed(() => {
        const selectedType = typeList.value.filter((type) => type.value == data.type);

        return selectedType?.[0]?.code ?? null;
    });

    watch(() => data.hours, (newValue) => {
        data.duration = Number(newValue * 60 + data.minutes);
        v$.value.duration.$touch();
    });

    watch(() => data.minutes, (newValue) => {
        data.duration = Number(newValue + data.hours * 60);
        v$.value.duration.$touch();
    });

    const safeHours = computed({
        get: () => data.hours,
        set: (newValue) => {
            if (newValue === '' || newValue === null || newValue === undefined) {
                data.hours = 0;
            } else {
                data.hours = Number(newValue);
            }
        }
    });

    const safeMinutes = computed({
        get: () => data.minutes,
        set: (newValue) => {
            if (newValue === '' || newValue === null || newValue === undefined) {
                data.minutes = 0;
            } else {
                data.minutes = Number(newValue);
            }
        }
    });

    const getPartsTime = (time) => {
        const hours = Math.trunc(time / 60);
        const minutes = time - hours * 60;

        return [hours, minutes];
    }

    onMounted(async() => {
        const service = await $api('/api/services/' + id);
        const resTypes = await $api('/api/common/types');
        const { list } = await $api('/api/services');

        list.forEach(item => {
            if(item._id.toString() !== service._id.toString()) {
                serviceList.value.push({title: item.title, value: item._id.toString() });
            }
        });

        for(const key in service) {
            data[key] = service[key];
        }

        [data.hours, data.minutes] = getPartsTime(data.duration);

        resTypes.forEach(type => {
            typeList.value.push({title: type.title, value: type._id.toString(), code: type.code });
        });
    });
 
</script>