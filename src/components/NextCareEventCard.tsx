import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CareEvent } from './../model/CareEvent';

interface Props {
    event?: CareEvent;
    isLoading?: boolean;
}

function formatDate(date: string) {
    const value = new Date(date);
    return value.toLocaleDateString('pt-BR');
}

function getEventStyle(typeEvent: string) {

    switch (typeEvent.toLowerCase()) {

        case 'vacinação':
            return { icon: 'medical-outline' as const, color: '#4F83CC', background: '#E7F1FF' };
        
        case 'consulta':
            return { icon: 'medkit-outline' as const, color: '#3DA68D', background: '#E5F6F1' };

        case 'medicação':
            return { icon: 'bandage-outline' as const, color: '#9B72CF', background: '#F1E9FB' };

        case 'exame':
            return { icon: 'document-text-outline' as const, color: '#E19A3B', background: '#FFF2DE' };

        case 'higiene':
            return { icon: 'water-outline' as const, color: '#43A6B8', background: '#E4F6F8' };
            
        default:
            return { icon: 'calendar-outline' as const, color: '#2877E6', background: '#EAF4FF' };
    }
    
}

export function NextCareEventCard({ event, isLoading }: Props) {
    if (isLoading) {
        return (
            <View style={styles.card}>
                <View style={[styles.icon, { backgroundColor: '#EAF4FF' }]}>
                    <Ionicons name="calendar-outline" size={30} color="#2877E6" />
                </View>

                <View style={styles.conteudo}>
                    <Text style={styles.titulo}>Carregando próximos cuidados...</Text>
                </View>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.card}>
                <View style={[styles.icon, { backgroundColor: '#EAF4FF' }]}>
                    <Ionicons name="calendar-outline" size={30} color="#2877E6" />
                </View>

                <View style={styles.conteudo}>
                    <Text style={styles.titulo}>Sua agenda de cuidados</Text>
                    <Text style={styles.text}>Nenhum cuidado agendado no momento.</Text>
                </View>
            </View>
        );
    }

    const eventStyle = getEventStyle(event.typeEvent);

    return (
        <View style={styles.card}>
            <View style={[styles.icon, { backgroundColor: eventStyle.background }]}>
                <Ionicons name={eventStyle.icon} size={30} color={eventStyle.color} />
            </View>

            <View style={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tipo}>{event.typeEvent}</Text>

                    <View style={styles.dataBadge}>
                        <Ionicons name="calendar-outline" size={13} color="#2877E6" />
                        <Text style={styles.data}>{formatDate(event.eventDate)}</Text>
                    </View>
                </View>

                <Text style={styles.titulo}>{event.description}</Text>

                {event.observations ? <Text style={styles.text} numberOfLines={2}>{event.observations}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 120,
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EFF7',
    },

    icon: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    conteudo: {
        flex: 1,
        marginLeft: 16,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },

    tipo: {
        flex: 1,
        color: '#6C879C',
        fontSize: 11,
        fontWeight: '700',
    },

    titulo: {
        marginTop: 4,
        color: '#174F79',
        fontSize: 16,
        fontWeight: '700',
    },

    text: {
        marginTop: 5,
        color: '#6C879C',
        fontSize: 12,
        lineHeight: 18,
    },

    dataBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#EEF6FF',
    },

    data: {
        color: '#2877E6',
        fontSize: 10,
        fontWeight: '700',
    },
});