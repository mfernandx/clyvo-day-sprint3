import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DailyPetLog} from '../model/DailyPetLog';

interface Props {log: DailyPetLog;}

export function DailyPetLogJourneyCard({log}: Props) {

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString('pt-BR',{day: '2-digit',month: 'short'});
    }

    function formatTime(date: string) {
        return new Date(date).toLocaleTimeString('pt-BR',{hour: '2-digit',minute: '2-digit'});
    }

    return (
        <View style={styles.timelineItem}>
            <View style={styles.timelineColumn}>
                <View style={styles.timelineDot}>
                    <Ionicons name="book-outline" size={18} color="#FFFFFF"/>
                </View>

                <View style={styles.timelineLine} />
            </View>

            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.tipoBadge}>
                        <Ionicons name="heart-outline" size={15} color="#2877E6"/>
                        <Text style={styles.tipoText}>{log.dailyPetLogType}</Text>
                    </View>

                    <View style={styles.privacidade}>
                        <Ionicons name={log.privacy === 0 ? 'eye-outline' : 'lock-closed-outline'} size={15} color="#8095A7"/>
                        <Text style={styles.privacidadeText}>{log.privacy === 0 ? 'Visível' : 'Privado'}</Text>
                    </View>
                </View>

                <Text style={styles.conteudo}>{log.content}</Text>

                <View style={styles.footer}>
                    <Ionicons name="time-outline" size={15} color="#8AA0B2"/>

                    <Text style={styles.data}>
                        {formatDate(log.registeredAt)}{' • '}{formatTime(log.registeredAt)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timelineItem: {
        flexDirection: 'row',
    },

    timelineColumn: {
        width: 44,
        alignItems: 'center',
    },

    timelineDot: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#2877E6',
        zIndex: 2,
    },

    timelineLine: {
        flex: 1,
        width: 2,
        marginTop: 3,
        backgroundColor: '#D7E8F7',
    },

    card: {
        flex: 1,
        marginLeft: 5,
        marginBottom: 18,
        padding: 17,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5EEF5',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },

    tipoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#EAF4FF',
    },

    tipoText: {
        color: '#2877E6',
        fontSize: 12,
        fontWeight: '700',
    },

    privacidade: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    privacidadeText: {
        color: '#8095A7',
        fontSize: 11,
    },

    conteudo: {
        marginTop: 15,
        color: '#315B79',
        fontSize: 15,
        lineHeight: 22,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 16,
    },

    data: {
        color: '#8AA0B2',
        fontSize: 12,
    },
});