import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import type { ValidationRuleWithParams  } from '@vuelidate/core';

interface ValidatorFunction<T = any, S = any> {
    $validator: (value: T, siblings: S) => boolean;
}

interface FieldValidatorConfig<T = any, S = any> {
    validator: ValidatorFunction<T, S>;
}

interface CustomValidators {
    [field: string]: FieldValidatorConfig;
}

interface Error {
    statusCode: number,
    data: {
        code: string,
        message: string,
        fields?: string[]
    }
}

export const useValidation = () => {
    const validate = (
        data: Record<string, any>,
        fieldValidators:Record<string, string[]> = {},
        customValidator: CustomValidators | null = null
    ) => {
        const customMessages = {
            required: 'Поле обязательно для заполнения',
            email: 'Некорректный email',
            isValidPassword: 'Пароль не соответствует требованиям'
        };

        const validatorFactory:Record<string, ValidationRuleWithParams> = {
            required: helpers.withMessage(customMessages.required, required),
            email: helpers.withMessage(customMessages.email, email)
        };

        const isValidPassword = (value: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(value);

        const rules: Record<string, any> = {};
        for(const key in data) {
            rules[key] = {};
            if(Object.keys(fieldValidators).length && fieldValidators?.[key]) {
                fieldValidators[key].forEach(validator => {
                    if(validator in validatorFactory) {
                        rules[key][validator] = validatorFactory[validator];
                    }
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

        const updateValidateFromApi = (error: any) => {
            if(error.data?.fields) {
                const externalResults: Record<string, string> = {}

                error.data?.fields.forEach((field: string, index: number) => {
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
