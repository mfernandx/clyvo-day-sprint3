import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import {Ionicons,} from '@expo/vector-icons';

interface Props {
    title: string;
    description: string;
    icon:keyof typeof Ionicons.glyphMap;
    value: number | null;
    onChange: (value: number) => void;
    iconColor?: string;
    iconBackgroundColor?: string;
}

export function MonitoringRatingCard({title,description,icon,value,onChange,iconColor = '#2877E6',iconBackgroundColor = '#EAF4FF'}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={[styles.iconContainer,{backgroundColor:iconBackgroundColor}]}>
                    <Ionicons name={icon} size={22} color={iconColor}/>
                </View>

                <View style={styles.headerText}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.descricao}>{description}</Text>
                </View>

                {value !== null && (
                    <View style={styles.valorBadge}>
                        <Text style={styles.valorBadgeText}>{value}/10</Text>
                    </View>
                )}
            </View>

            <View style={styles.avaliacaoContainer}>
                {Array.from({ length: 11 }, (_, index) => index).map((number) => {
                    const selected =value === number;

                    return (
                        <TouchableOpacity key={number} activeOpacity={0.75} style={[styles.avaliacaoButton, selected && styles.avaliacaoButtonSelected]} onPress={() => onChange(number)}>
                            <Text style={[styles.avaliacaoText,selected && styles.avaliacaoTextSelected]}>{number}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },

    headerText: {
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
        lineHeight: 15,
    },

    valorBadge: {
        marginLeft: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor:'#EAF4FF',
    },

    valorBadgeText: {
        color: '#2877E6',
        fontSize: 11,
        fontWeight: '700',
    },

    avaliacaoContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 15,
    },

    avaliacaoButton: {
        width: 25,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor:'#F3F7FA',
    },

    avaliacaoButtonSelected: {
        backgroundColor:'#2877E6',
    },

    avaliacaoText: {
        color: '#577590',
        fontSize: 11,
        fontWeight: '600',
    },

    avaliacaoTextSelected: {
        color: '#FFFFFF',
        fontWeight: '800',
    },
  });