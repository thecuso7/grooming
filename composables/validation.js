import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

export const useValidation = () => {
    const validate = (data, fieldValidators = {}, customValidator = null) => {
        const customMessages = {
            required: 'Поле обязательно для заполнения',
            email: 'Некорректный email',
            isValidPassword: 'Пароль не соответствует требованиям'
        };

        const validatorFactory = {
            required: helpers.withMessage(customMessages.required, required),
            email: helpers.withMessage(customMessages.email, email)
        };

        const isValidPassword = (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(value);

        const rules = {};
        for(const key in data) {
            rules[key] = {};
            if(Object.keys(fieldValidators).length && fieldValidators?.[key]) {
                fieldValidators[key].forEach(validator => {
                    rules[key][validator] = validatorFactory[validator];
                })
            }
        }

        if(customValidator !== null) {
            Object.keys(customValidator).forEach(key => {
                Object.assign(rules[key], customValidator[key]);
            });
        }

        const $externalResults = ref({});
        const v$ = useVuelidate(rules, data, { $externalResults, $lazy: true } );

        const updateValidateFromApi = (error) => {
            if(error.data?.fields) {
                const externalResults = {}

                error.data?.fields.forEach((field, index) => {
                    if(v$.value.hasOwnProperty(field)) {
                        externalResults[field] = index === 0 ? error.data.message : '';
                    }
                });
                
                $externalResults.value = externalResults;
            }

            v$.value.$touch();
        }

        return { v$, updateValidateFromApi };
    }

    return { validate };
}
