import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

interface Props {
    currentScore: number;
    currentMinScore: number;
    nextMinScore?: number;
    nextTitle?: string;
}

export function AchievementProgress({ currentScore, currentMinScore, nextMinScore, nextTitle, }: Props) {

    if (!nextMinScore) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Nível máximo alcançado</Text>

                <Text style={styles.descricao}>Você conquistou o maior nível de engajamento do CLYVO DAY.</Text>

                <View style={styles.barraCompleta} />
            </View>
        );
    }

    const range = nextMinScore - currentMinScore;

    const currentProgress = currentScore - currentMinScore;

    const percentage = Math.min(Math.max(currentProgress / range, 0), 1,);

    const remaining = Math.max(nextMinScore - currentScore, 0,);

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Próxima conquista</Text>
                <Text style={styles.pontos}>{currentScore}/{nextMinScore}</Text>
            </View>

            <Text style={styles.descricao}>Faltam {remaining} pontos para {nextTitle}.</Text>

            <View style={styles.progressoBackground}>
                <View style={[styles.nivelProgresso,{width:`${percentage * 100}%`}]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 17,
        borderRadius: 21,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3EDF5',
    },

    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },

    titulo: {
        color: '#174F79',
        fontSize: 14,
        fontWeight: '700',
    },

    pontos: {
        color: '#2877E6',
        fontSize: 12,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 6,
        color: '#738B9D',
        fontSize: 11,
    },

    progressoBackground: {
        height: 8,
        marginTop: 14,
        borderRadius: 8,
        backgroundColor:'#E8EFF5',
        overflow: 'hidden',
    },

    nivelProgresso: {
        height: '100%',
        borderRadius: 8,
        backgroundColor:'#2877E6',
    },

    barraCompleta: {
        height: 8,
        marginTop: 14,
        borderRadius: 8,
        backgroundColor:'#3DA68D',
    },
});