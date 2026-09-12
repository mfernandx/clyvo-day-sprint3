import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Props {
    value: boolean | null;
    onChange: (value: boolean) => void;
}

export function MedicationSelector({value,onChange}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name="medical-outline" size={22} color="#2877E6"/>
                </View>

                <View style={styles.info}>
                    <Text style={styles.titulo}>Medicação</Text>
                    <Text style={styles.descricao}>O pet tomou alguma medicação hoje? Se sim, informe o nome nas observações.</Text>
                </View>
            </View>

            <View style={styles.opcoes}>
                <TouchableOpacity style={[styles.opcao,value === true && styles.opcaoSelected]} activeOpacity={0.8} onPress={() => onChange(true)}>
                    <Ionicons name="checkmark-circle-outline" size={19} color={value === true ? '#2877E6' : '#8094A4'}/>
                    <Text style={[styles.opcaoText, value === true && styles.opcaoTextSelected]}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.opcao, value === false && styles.opcaoSelected]} activeOpacity={0.8} onPress={() => onChange(false)}>
                    <Ionicons name="close-circle-outline" size={19} color={value === false ? '#2877E6' : '#8094A4'}/>
                    <Text style={[styles.opcaoText,value === false && styles.opcaoTextSelected]}>Não</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles =StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#EAF4FF',
    },

    info: {
        flex: 1,
        marginLeft: 11,
    },

    titulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 3,
        color: '#7890A2',
        fontSize: 11,
    },

    opcoes: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
    },

    opcao: {
        flex: 1,
        minHeight: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderRadius: 14,
        backgroundColor:'#F5F8FA',
        borderWidth: 1,
        borderColor: '#E4EBF0',
    },

    opcaoSelected: {
        borderColor: '#2877E6',
        backgroundColor:'#EAF4FF',
    },

    opcaoText: {
        color: '#7890A2',
        fontSize: 13,
        fontWeight: '600',
    },

    opcaoTextSelected: {
        color: '#2877E6',
        fontWeight: '700',
    },
  });