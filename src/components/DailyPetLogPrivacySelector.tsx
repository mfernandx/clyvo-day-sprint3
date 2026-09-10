import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DailyPetLogPrivacy,} from './../model/DailyPetLog';

interface Props {
    privacy: DailyPetLogPrivacy;
    onChange: (value: DailyPetLogPrivacy) => void;
    disabled?: boolean;
}

export function DailyPetLogPrivacySelector({privacy,onChange,disabled,}: Props) {
  return (
    <View>
      <Text style={styles.sectionTitulo}>Quem pode ver este registro?</Text>

      <PrivacyOption
        title="Visível"
        description="Veterinários poderão visualizar este registro."
        icon="eye-outline"
        selected={privacy === 0}
        onPress={() => onChange(0)}
        disabled={disabled}
      />

      <PrivacyOption
        title="Privado"
        description="Somente você poderá visualizar este registro."
        icon="lock-closed-outline"
        selected={privacy === 1}
        onPress={() => onChange(1)}
        disabled={disabled}
      />
    </View>
  );
}

interface PrivacyOptionProps {
    title: string;
    description: string;
    icon: | 'eye-outline' | 'lock-closed-outline';
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
}

function PrivacyOption({title,description,icon,selected,onPress,disabled}: PrivacyOptionProps) {
    return (
        <TouchableOpacity style={[styles.card,selected && styles.selectedCard]} activeOpacity={0.8} disabled={disabled} onPress={onPress}>
            <View style={[styles.icon, selected && styles.selectedIcon]}>
                <Ionicons name={icon} size={23} color={selected ? '#FFFFFF' : '#2877E6'}/>
            </View>

            <View style={styles.conteudo}>
                <Text style={[styles.titulo, selected && styles.selectedTitulo]}>{title}</Text>
                <Text style={styles.descricao}>{description}</Text>
            </View>

            {selected && (<Ionicons name="checkmark-circle" size={23} color="#2877E6"/>)}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    sectionTitulo: {
        marginTop: 27,
        color: '#174F79',
        fontSize: 18,
        fontWeight: '700',
    },

    card: {
        minHeight: 90,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E1ECF5',
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
    },

    selectedCard: {
        borderColor: '#8ABFF2',
        backgroundColor: '#F4F9FF',
    },

    icon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#EAF4FF',
    },

    selectedIcon: {
        backgroundColor: '#2877E6',
    },

    conteudo: {
        flex: 1,
        marginHorizontal: 13,
    },

    titulo: {
        color: '#174F79',
        fontSize: 16,
        fontWeight: '700',
    },

    selectedTitulo: {
        color: '#2877E6',
    },

    descricao: {
        marginTop: 3,
        color: '#71899D',
        fontSize: 12,
        lineHeight: 17,
    },
});