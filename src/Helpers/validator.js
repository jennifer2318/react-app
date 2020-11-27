export const validateString = (value, minLen = 1, maxLen = 255) => {
    if (value === '') return {valid: false, err: `Заполните поле`}
    if (value.length < minLen) return {valid: false, err: `Минимальная длина поля ${minLen} символов`}
    if (value.length > maxLen) return {valid: false, err: `Максимальная длина поля ${maxLen} символов`}

    return {valid: true, err: ''}
}

export const validateUsername = (value) => {
    const validator = validateString(value)
    if (validator.valid === false) return validator

    if (!/^[\w.@+-]+$/.test(value)) return  {valid: false, err: `Имя пользователя может содержать символы "a-z", "A-Z", "0-9",".","@", "+", "-" `}

    return {valid: true, err: ''}
}