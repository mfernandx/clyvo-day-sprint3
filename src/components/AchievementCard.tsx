import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {Ionicons,} from '@expo/vector-icons';
import {AchievementConfig,} from './../model/Achievement';

interface Props {
    achievement: AchievementConfig;
    unlocked: boolean;
    current: boolean;
}

export function AchievementCard({achievement,unlocked,current}: Props) {
    return (
        <View style={[styles.card,current && styles.nivelAtualCard,!unlocked && styles.nivelBloqueadoCard]}>
            <View style={[styles.iconContainer,unlocked ? styles.iconDesbloqueado : styles.iconBloqueado]}>
                <Ionicons name={unlocked? achievement.icon: 'lock-closed-outline'} size={24} color={unlocked ? '#2877E6' : '#9AAAB6'}/>
            </View>

            <View style={styles.info}>
                <View style={styles.tituloRow}>
                    <Text style={[styles.titulo, !unlocked && styles.nivelBloqueadoText]}>{achievement.title}</Text>

                    {current && (
                        <View style={styles.nivelAtualBadge}>
                        <Text style={styles.nivelAtualBadgeText}>Atual</Text>
                        </View>
                    )}
                </View>

                <Text style={[styles.descricao, !unlocked && styles.nivelBloqueadoText]}>{achievement.description}</Text>
                <Text style={styles.scoreText}>{unlocked ? 'Conquistado' : `A partir de ${achievement.minScore} pontos`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 22,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EDF4',
    },

    nivelAtualCard: {
        borderColor: '#8DBEFF',
        backgroundColor:'#F4F9FF',
    },

    nivelBloqueadoCard: {
        opacity: 0.72,
    },

    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },

    iconDesbloqueado: {
        backgroundColor:'#EAF4FF',
    },

    iconBloqueado: {
        backgroundColor:'#F1F4F6',
    },

    info: {
        flex: 1,
        marginLeft: 13,
    },

    tituloRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },

    titulo: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 5,
        color: '#738B9D',
        fontSize: 11,
        lineHeight: 16,
    },

    nivelBloqueadoText: {
        color: '#8F9FA9',
    },

    scoreText: {
        marginTop: 8,
        color: '#2877E6',
        fontSize: 10,
        fontWeight: '700',
    },

    nivelAtualBadge: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 8,
        backgroundColor:'#DCEEFF',
    },

    nivelAtualBadgeText: {
        color: '#2877E6',
        fontSize: 9,
        fontWeight: '800',
    },
  });