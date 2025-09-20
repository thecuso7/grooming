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

        // const commonRules = {
        //     name: {
        //         required: helpers.withMessage(customMessages.required, required),
        //     },
        //     lastName: { 
        //         required: helpers.withMessage(customMessages.required, required),
        //     },
        //     email: {
        //         required: helpers.withMessage(customMessages.required, required),
        //         email: helpers.withMessage(customMessages.email, email)
        //     },
        //     password: {
        //         required: helpers.withMessage(customMessages.required, required),
        //         // isValidPassword: helpers.withMessage(customMessages.isValidPassword, isValidPassword)
        //     },
        //     roleId: {
        //         // isValidPassword: helpers.withMessage(customMessages.isValidPassword, isValidPassword)
        //     },
        //     title: {
        //         required: helpers.withMessage(customMessages.required, required),
        //     },
        //     description: {},
        //     duration: {},
        //     price: {},
        //     type: {},
        //     bundle: {},
        //     pets: [],
        //     age: '',
        //     breed: '',
        //     size: '',
        //     features: '',
        //     weight: '',
        //     image: '',
        //     hours: 0,
        //     minutes: 0,
        // };

        const rules = {};
        for(const key in data) {
            rules[key] = {};
            if(Object.keys(fieldValidators).length && fieldValidators?.[key]) {
                fieldValidators[key].forEach(validator => {
                    console.log(validator);
                    rules[key][validator] = validatorFactory[validator];
                })
            }
        }

        if(customValidator !== null) {
            Object.keys(customValidator).forEach(key => {
                Object.assign(rules[key], customValidator[key]);
            });
        }

        const v$ = useVuelidate(rules, data, { $lazy: true } );

        const updateValidateFromApi = (error) => {
            if(error.data?.fields) {
                error.data?.fields.forEach((field, index) => {
                    if(v$.value.hasOwnProperty(field)) {
                        v$.value[field].$errors.push({
                            $message: index == 0 ? error.data.message : '',
                            $validator: 'server',
                            $params: {}
                        });
                    }
                });
            }

            v$.value.$touch();
        }

        return { v$, updateValidateFromApi };
    }

    return { validate };
}
