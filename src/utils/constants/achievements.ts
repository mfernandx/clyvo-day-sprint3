import { AchievementConfig } from '../../model/Achievement';

export const achievements:

    AchievementConfig[] = [
        {
            id: 'Nenhum',
            title: 'Primeiros passos',
            description:'Comece sua jornada de cuidado no CLYVO DAY.',
            minScore: 0,
            icon: 'paw-outline',
        },

        {
            id: 'InicianteAtencioso',
            title: 'Iniciante Atencioso',
            description:'Você começou a construir uma rotina de cuidado com seu pet.',
            minScore: 50,
            icon: 'heart-outline',
        },

        {
            id: 'TutorDedicado',
            title: 'Tutor Dedicado',
            description:'Sua constância já faz parte da jornada do seu pet.',
            minScore: 100,
            icon: 'ribbon-outline',
        },

        {
            id: 'GuardiãoPet',
            title: 'Guardião Pet',
            description:'Você mantém um acompanhamento atento e frequente.',
            minScore: 150,
            icon: 'shield-checkmark-outline',
        },

        {
            id: 'ClyvoMaster',
            title: 'Clyvo Master',
            description:'Você chegou ao nível mais alto de engajamento e cuidado.',
            minScore: 300,
            icon: 'star-outline',
        },
    ];