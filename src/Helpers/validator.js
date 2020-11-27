export const validateString = (value, minLen = 1, maxLen = 255) => {
    if (value === '') return {valid: false, err: `Заполните поле`}
    if (value.length < minLen) return {valid: false, err: `Минимальная длина поля ${minLen} символов`}
    if (value.length > maxLen) return {valid: false, err: `Максимальная длина поля ${maxLen} символов`}

    return {valid: true, err: ''}
}