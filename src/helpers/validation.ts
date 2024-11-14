const requiredErrorMessage = 'Поле обязательно для заполнения'
const invalidCharacterMessage = 'Поле не должно содержать цифры';

export const loginValidation = {
  required: requiredErrorMessage,
  validate: (value: string) => {
    if (value === 'admin') {
      return true
    } else {
      return 'Неверный логин'
    }
  }
}

export const passwordValidation = {
  required: requiredErrorMessage,
  validate: (value: string) => {
    if (value === 'admin') {
      return true
    } else {
      return 'Неверный пароль'
    }
  }
}

// валидация добовления заказа
export const addFieldsValidate = {
  required: requiredErrorMessage,
  validate: (value: string) => {
    if (/\d/.test(value)) {
      return invalidCharacterMessage
    }
    return true;
  }
}