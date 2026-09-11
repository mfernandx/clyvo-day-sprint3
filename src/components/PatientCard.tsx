import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from './../model/Pet';

interface Props {pet: Pet; onPress?: () => void;}

export function PatientCard({pet,onPress}: Props) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
            <View style={styles.petIconContainer}>
                <Ionicons name={"paw-outline"} size={26} color="#2877E6"/>
            </View>

            <View style={styles.info}>
                <Text style={styles.nome}>{pet.name}</Text>
                <Text style={styles.descricao}>{pet.species} {pet.breed ? ` • ${pet.breed}` : ''}</Text>

                <View style={styles.detalhesRow}>
                    <View style={styles.detalheBadge}>
                        <Ionicons name="male-female-outline" size={13} color="#6E8799"/>
                        <Text style={styles.detalheText}>{pet.sex}</Text>
                    </View>

                    <View style={styles.detalheBadge}>
                        <Ionicons name="calendar-outline" size={13} color="#6E8799"/>
                        <Text style={styles.detalheText}>{pet.age}{' '} {pet.age === 1 ? 'ano' : 'anos'}</Text>
                    </View>
                </View>
            </View>

            {onPress && (<Ionicons name="chevron-forward" size={21} color="#A1B1BD"/>)}
        </TouchableOpacity>
    );
}

const styles =StyleSheet.create({
    card: {
        minHeight: 105,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 23,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    petIconContainer: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        backgroundColor:'#EAF4FF',
    },

    info: {
        flex: 1,
        marginLeft: 13,
    },

    nome: {
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 3,
        color: '#70889B',
        fontSize: 12,
    },

    detalhesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 7,
        marginTop: 9,
    },

    detalheBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor:'#F4F8FB',
    },

    detalheText: {
        color: '#6E8799',
        fontSize: 10,
        fontWeight: '600',
    },
  });