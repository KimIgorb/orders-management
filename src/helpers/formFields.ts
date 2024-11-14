import { loginValidation, passwordValidation } from './validation'
import { addFieldsValidate } from './validation';

export const authFields = [
  { name: 'login', label: 'Логин', validation: loginValidation },
  { name: 'password', label: 'Пароль', validation: passwordValidation },
]

export const addOrderFields = [
  { name: 'name', label: 'Имя', validation: addFieldsValidate },
  { name: 'surname', label: 'Фамилия', validation: addFieldsValidate },
];