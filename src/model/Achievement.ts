import {Achievement} from './User';

interface AchievementConfig {
    id: Achievement;
    title: string;
    description: string;
    minScore: number;
    icon: | 'paw-outline' | 'heart-outline' | 'ribbon-outline' | 'shield-checkmark-outline' | 'star-outline';
}



export {AchievementConfig}