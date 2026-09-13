import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    streak: number;
    isLoading?: boolean;
}

export function CareStreakCard({ streak, isLoading = false }: Props) {
    function getDescription() {
        if (streak === 0) return 'Faça um registro hoje para iniciar sua sequência.';
        if (streak === 1) return 'Você começou sua sequência de cuidado!';
        if (streak < 7) return 'Continue registrando todos os dias!';
        if (streak < 30) return 'Que dedicação! Continue assim.';
        return 'Uma jornada incrível de cuidado!';
    }

    return (
        <View style={styles.card}>
            <View style={styles.icon}>
                <Ionicons name={streak > 0 ? 'flame' : 'flame-outline'} size={31} color="#F18A4C"/>
            </View>

            <View style={styles.conteudo}>
                <Text style={styles.titulo}>Sequência de cuidado</Text>

                {isLoading ? (
                    <ActivityIndicator size="small" color="#F18A4C" style={styles.loading}/>
                ) : (
                    <>
                        <View style={styles.sequenciaRow}>
                            <Text style={styles.numero}>{streak}</Text>
                            <Text style={styles.dias}>{streak === 1 ? 'dia seguido' : 'dias seguidos'}</Text>
                        </View>

                        <Text style={styles.descricao}>{getDescription()}</Text>
                    </>
                )}
            </View>

            {streak > 0 && (
                <View style={styles.sparkle}>
                    <Ionicons name="sparkles" size={20} color="#E8A154"/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 115,
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderRadius: 24,
        backgroundColor: '#FFFDF9',
        borderWidth: 1,
        borderColor: '#F7EBDD',
    },

    icon: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        backgroundColor: '#FFF0E5',
    },

    conteudo: {
        flex: 1,
        marginLeft: 15,
    },

    titulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    sequenciaRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        marginTop: 4,
    },

    numero: {
        color: '#F18A4C',
        fontSize: 25,
        fontWeight: '800',
    },

    dias: {
        color: '#D07B49',
        fontSize: 11,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 2,
        color: '#7B91A4',
        fontSize: 10,
        lineHeight: 15,
    },

    sparkle: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#FFF5E7',
    },

    loading: {
        alignSelf: 'flex-start',
        marginTop: 10,
    },
});