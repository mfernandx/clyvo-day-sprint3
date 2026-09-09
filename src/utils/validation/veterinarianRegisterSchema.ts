import * as yup from 'yup';

export const veterinarianRegisterSchema = yup.object({
    crmv: yup.string().trim().required('Informe o CRMV.').matches(/^[0-9]+$/,'O CRMV deve conter apenas números.').min(4,'Informe um CRMV válido.').max(10,'O CRMV deve possuir no máximo 10 números.'),

    state: yup.string().trim().required('Informe o estado.').length(2,'Informe a sigla do estado com 2 letras.').matches(/^[A-Za-z]{2}$/,'Informe uma sigla de estado válida.'),

    specialty: yup.string().trim().required('Informe a especialidade.').min(3,'A especialidade deve possuir pelo menos 3 caracteres.').max(80,'A especialidade deve possuir no máximo 80 caracteres.'),
  });