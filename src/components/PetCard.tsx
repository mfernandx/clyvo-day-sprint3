import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../model/Pet';

interface PetCardProps {pet: Pet;onPress?: () => void}

export function PetCard({pet,onPress}: PetCardProps) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name="paw" size={28} color="#2877E6"/>
            </View>

            <View style={styles.conteudo}>
                <Text style={styles.nome}>{pet.name}</Text>

                <Text style={styles.detalhes}>{pet.species}{pet.breed ? ` • ${pet.breed}` : ''}</Text>

                <Text style={styles.idade}>{pet.age === 1 ? '1 ano' : `${pet.age} anos`}</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9BB0C1"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 106,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EFF7',
    },

    iconContainer: {
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#EAF4FF',
    },

    conteudo: {
        flex: 1,
        marginLeft: 15,
    },

    nome: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    detalhes: {
        marginTop: 4,
        color: '#6C879C',
        fontSize: 14,
    },

    idade: {
        marginTop: 5,
        color: '#2877E6',
        fontSize: 13,
        fontWeight: '600',
    },
});