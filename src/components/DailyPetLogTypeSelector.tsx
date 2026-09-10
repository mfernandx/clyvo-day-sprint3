import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DailyPetLogType} from './../model/DailyPetLog';

interface DailyPetLogTypeOption {
    label: string;
    value: DailyPetLogType;
    icon: keyof typeof Ionicons.glyphMap;
    backgroundColor: string;
    iconColor: string;
}

interface Props {
    selectedType: DailyPetLogType | null;
    onSelect: (type: DailyPetLogType) => void;
    error?: string;
    disabled?: boolean;
}

const types: DailyPetLogTypeOption[] = [
    {
        label: 'Passeio',
        value: 'Passeio',
        icon: 'walk-outline',
        backgroundColor: '#E7F2FF',
        iconColor: '#2877E6',
    },
    {
        label: 'Momento',
        value: 'Momento',
        icon: 'heart-circle-outline',
        backgroundColor: '#FFF3DD',
        iconColor: '#D9912B',
    },
    {
        label: 'Saúde',
        value: 'Saúde',
        icon: 'medkit-outline',
        backgroundColor: '#FFE9EC',
        iconColor: '#D85B6A',
    },
    {
        label: 'Rotina',
        value: 'Rotina',
        icon: 'repeat-outline',
        backgroundColor: '#EAF7F3',
        iconColor: '#3DA68D',
    },
    {
        label: 'Brincadeira',
        value: 'Brincadeira',
        icon: 'football-outline',
        backgroundColor: '#F1ECFF',
        iconColor: '#7254D6',
    },
    {
        label: 'Treino',
        value: 'Treino',
        icon: 'ribbon-outline',
        backgroundColor: '#E8F7FF',
        iconColor: '#3A9BC7',
    },
    
    {
        label: 'Comportamento',
        value: 'Comportamento',
        icon: 'happy-outline',
        backgroundColor: '#FFF0E6',
        iconColor: '#D97745',
    },
    {
        label: 'Outro',
        value: 'Outro',
        icon: 'ellipsis-horizontal-outline',
        backgroundColor: '#EEF1FF',
        iconColor: '#5C6FD8',
    },
    
];

export function DailyPetLogTypeSelector({selectedType,onSelect,error,disabled}: Props) {
  return (
    <View>
        <Text style={styles.titulo}>O que você quer registrar?</Text>

        <Text style={styles.subtitulo}>Escolha a categoria que melhor representa esse momento.</Text>

        <View style={styles.grid}> 
            {types.map((type) => {
                const selected = selectedType === type.value;

                return (
                    <TouchableOpacity key={type.value} style={[styles.card,{backgroundColor:selected ? type.backgroundColor : '#FFFFFF',}, selected && styles.selectedCard]} activeOpacity={0.8} disabled={disabled} onPress={() =>onSelect(type.value)}>
                        <View style={[styles.icon,{backgroundColor:type.backgroundColor}]}>
                            <Ionicons name={type.icon} size={25} color={type.iconColor}/>
                        </View>

                        <Text style={[styles.label, selected && {color: type.iconColor}]}>{type.label}</Text>

                        {selected && (<Ionicons name="checkmark-circle" size={19} color={type.iconColor} style={styles.check}/>)}
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
        width: '44%',
        minHeight: 112,
        padding: 15,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#E8F0F6',
        alignItems: 'center',
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
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    check: {
        position: 'absolute',
        top: 12,
        right: 12,
    },

    error: {
        marginTop: 6,
        color: '#B84B4B',
        fontSize: 13,
    },
});