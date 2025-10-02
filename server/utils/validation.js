export const getFieldErrors = (v$, fieldName) => {
    const vuelidateErrors = v$.value[fieldName]?.$errors.map(e => e.$message) || []
    const serverError = serverErrors[fieldName]
    return [...vuelidateErrors, serverError].filter(Boolean)
}