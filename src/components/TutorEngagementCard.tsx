import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Tutor } from './../model/Tutor';

interface Props {
    tutor: Tutor;
    position: number;
}

function formatAchievement(achievement:Tutor['achievement']) {

    const names = {
        Nenhum:'Primeiros passos',
        InicianteAtencioso:'Iniciante Atencioso',
        TutorDedicado:'Tutor Dedicado',
        GuardiãoPet:'Guardião Pet',
        ClyvoMaster:'Clyvo Master',
    };

    return names[achievement];
}

export function TutorEngagementCard({tutor,position}: Props) {

    const initials = tutor.fullName.split(' ').filter(Boolean).slice(0, 2).map((name) => name[0]).join('').toUpperCase();

    return (

        <View style={styles.card}>

            <View style={styles.posicaoContainer}>
                <Text style={styles.posicaoText}>{position}</Text>
            </View>

            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={1}>{tutor.fullName}</Text>

                <View style={styles.conquistaRow}>
                    <Ionicons name="ribbon-outline" size={13} color="#7890A2"/>
                    <Text style={styles.conquista}>{formatAchievement(tutor.achievement)}</Text>
                </View>
            </View>

            <View style={styles.scoreContainer}>
                <Ionicons name="sparkles-outline" size={14} color="#D9912B"/>
                <Text style={styles.score}>{tutor.scoreEngagement}</Text>
                <Text style={styles.pontosLabel}>pts</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 76,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderRadius: 20,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EDF4',
    },

    posicaoContainer: {
        width: 27,
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor:'#F1F5F8',
    },

    posicaoText: {
        color: '#7890A2',
        fontSize: 10,
        fontWeight: '800',
    },

    avatar: {
        width: 43,
        height: 43,
        marginLeft: 9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:
            '#EAF4FF',
    },

    avatarText: {
        color: '#2877E6',
        fontSize: 12,
        fontWeight: '800',
    },

    info: {
        flex: 1,
        marginLeft: 11,
    },

    nome: {
        color: '#174F79',
        fontSize: 13,
        fontWeight: '700',
    },

    conquistaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 5,
    },

    conquista: {
        color: '#7890A2',
        fontSize: 10,
    },

    scoreContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 13,
        backgroundColor:'#FFF3DD',
    },

    score: {
        marginTop: 2,
        color: '#D9912B',
        fontSize: 15,
        fontWeight: '800',
    },

    pontosLabel: {
        color: '#C18A3C',
        fontSize: 8,
        fontWeight: '600',
    },
});