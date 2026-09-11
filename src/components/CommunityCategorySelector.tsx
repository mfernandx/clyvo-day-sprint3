import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryOption {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    backgroundColor: string;
    iconColor: string;
}

interface Props {
    selectedCategory: string | null;
    onSelect: (category: string) => void;
    error?: string;
    disabled?: boolean;
}

const categories: CategoryOption[] = [
    {
        label: 'Momento com meu pet',
        icon: 'paw-outline',
        backgroundColor: '#E7F2FF',
        iconColor: '#2877E6',
    },
    {
        label: 'Experiência com veterinário',
        icon: 'medkit-outline',
        backgroundColor: '#EAF7F3',
        iconColor: '#3DA68D',
    },
    {
        label: 'Experiência com clínica',
        icon: 'business-outline',
        backgroundColor: '#EEF1FF',
        iconColor: '#5C6FD8',
    },
    {
        label: 'Conquista do meu pet',
        icon: 'trophy-outline',
        backgroundColor: '#FFF3DD',
        iconColor: '#D9912B',
    },
    {
        label: 'Dica',
        icon: 'bulb-outline',
        backgroundColor: '#FFF0E6',
        iconColor: '#D97745',
    },
    {
        label: 'Recomendação',
        icon: 'heart-outline',
        backgroundColor: '#FFE9EC',
        iconColor: '#D85B6A',
    },
    {
        label: 'Adoção e acolhimento',
        icon: 'home-outline',
        backgroundColor: '#E8F7FF',
        iconColor: '#3A9BC7',
    },
    {
        label: 'Outro',
        icon: 'ellipsis-horizontal-outline',
        backgroundColor: '#F0F3F6',
        iconColor: '#70879A',
    },
];

export function CommunityCategorySelector({selectedCategory,onSelect,error,disabled,}: Props) {
    return (
        <View>
            <Text style={styles.titulo}>Sobre o que você quer falar?</Text>

            <Text style={styles.subtitulo}>Escolha a categoria que melhor representa sua publicação.</Text>

            <View style={styles.grid}>
                {categories.map((category) => {const selected = selectedCategory === category.label;
                    return (
                        <TouchableOpacity key={category.label} style={[styles.card,{backgroundColor:selected ? category.backgroundColor : '#FFFFFF'},selected && styles.selectedCard]} activeOpacity={0.8} disabled={disabled} onPress={() => onSelect(category.label)}>
                            <View style={[styles.icon,{backgroundColor:category.backgroundColor}]}>
                                <Ionicons name={category.icon} size={25} color={category.iconColor}/>
                            </View>

                            <Text style={[styles.label,selected && {color:category.iconColor}]}>{category.label}</Text>

                            {selected && (<Ionicons name="checkmark-circle" size={19} color={category.iconColor} style={styles.check}/>)}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {error && (<Text style={styles.error}>{error}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
        color: '#174F79',
        fontSize: 18,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 5,
        color: '#71899D',
        fontSize: 13,
        lineHeight: 19,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
        marginTop: 14,
    },

    card: {
        width: '48%',
        minHeight: 112,
        padding: 15,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#E8F0F6',
    },

    selectedCard: {
        borderWidth: 2,
    },

    icon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },

    label: {
        marginTop: 11,
        paddingRight: 15,
        color: '#174F79',
        fontSize: 14,
        lineHeight: 19,
        fontWeight: '700',
    },

    check: {
        position: 'absolute',
        top: 12,
        right: 12,
    },

    error: {
        marginTop: 7,
        color: '#B84B4B',
        fontSize: 13,
    },
});