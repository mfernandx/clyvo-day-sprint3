import * as yup from 'yup';

export const petRegisterSchema = yup.object({
    name: yup.string().trim().required('Informe o nome do pet.').min(2,'O nome do pet deve possuir pelo menos 2 caracteres.').max(60,'O nome do pet deve possuir no máximo 60 caracteres.'),

    species: yup.string().trim().required('Informe a espécie do pet.').min(2,'Informe uma espécie válida.',).max(50,'A espécie deve possuir no máximo 50 caracteres.',),

    breed: yup.string().trim().required('Informe a raça do pet.').min(2,'Informe uma raça válida.').max(80,'A raça deve possuir no máximo 80 caracteres.'),

    sex: yup.string().required('Informe o sexo do pet.').oneOf(['Macho', 'Femea'],'Selecione Macho ou Fêmea.'),

    birthDate: yup.string().required('Informe a data de nascimento.').test('valid-date','Informe uma data de nascimento válida.',
        
        (value) => {
            if (!value) {
                return false;
            }

            const date = new Date(value);

            return !Number.isNaN(
            date.getTime(),
            );
        })
        .test('not-future-date','A data de nascimento não pode estar no futuro.',
        (value) => {
            if (!value) {
                return false;
            }

            const birthDate = new Date(value);
            const today = new Date();
            birthDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            return birthDate <= today;
        })
});