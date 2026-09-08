import * as yup from 'yup';

export const userRegisterSchema = yup.object({

    fullName: yup.string().trim().required('Informe seu nome completo.'),

    email: yup.string().trim().required('Informe seu e-mail.').email('Digite um e-mail válido.'),

    phoneNumber: yup.string().trim().required('Informe seu telefone.'),

    password: yup.string().required('Informe uma senha.').min(6,'A senha deve possuir pelo menos 6 caracteres.'),

    typeUser: yup.mixed<'Tutor' | 'Veterinario'>().oneOf(['Tutor', 'Veterinario'],'Selecione um tipo de usuário.',).required('Selecione um tipo de usuário.'),

});