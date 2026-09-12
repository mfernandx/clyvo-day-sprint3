import {Ionicons} from '@expo/vector-icons';

export interface CareEventTypeOption {
    label: string;
    icon:keyof typeof Ionicons.glyphMap;
    color: string;
    backgroundColor: string;
}

export const careEventTypes:

    CareEventTypeOption[] = [
        {
            label: 'Vacinação',
            icon: 'medical-outline',
            color: '#4F83CC',
            backgroundColor: '#E7F1FF',
        },

        {
            label: 'Consulta',
            icon: 'medkit-outline',
            color: '#3DA68D',
            backgroundColor: '#E5F6F1',
        },

        {
            label: 'Medicação',
            icon: 'bandage-outline',
            color: '#9B72CF',
            backgroundColor: '#F1E9FB',
        },

        {
            label: 'Exame',
            icon: 'document-text-outline',
            color: '#E19A3B',
            backgroundColor: '#FFF2DE',
        },

        {
            label: 'Higiene',
            icon: 'water-outline',
            color: '#43A6B8',
            backgroundColor: '#E4F6F8',
        },

        {
            label: 'Outro',
            icon: 'ellipsis-horizontal',
            color: '#D27C91',
            backgroundColor: '#FAEAF0',
        },
    ];