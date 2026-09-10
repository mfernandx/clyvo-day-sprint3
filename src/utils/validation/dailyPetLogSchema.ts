import * as yup from 'yup';

export const dailyPetLogSchema = yup.object({
        
        dailyPetLogType: yup.string().required('Selecione o tipo do registro.'),

        content: yup.string().trim().required('Conte um pouco sobre o dia do seu pet.').min(5,'O registro deve ter pelo menos 5 caracteres.').max(1000,'O registro deve ter no máximo 1000 caracteres.'),
        
        privacy: yup.number().oneOf([0, 1],'Selecione uma opção de privacidade.').required('Selecione uma opção de privacidade.'),
    });