import * as yup from 'yup';

export const communityPostSchema = yup.object({

    category: yup.string().required('Selecione uma categoria.'),

    content: yup.string().trim().required('Escreva algo para compartilhar.').min(5,'A publicação deve ter pelo menos 5 caracteres.').max(1500,'A publicação deve ter no máximo 1500 caracteres.'),

    location: yup.string().trim().max(120,'A localização deve ter no máximo 120 caracteres.'),
  });