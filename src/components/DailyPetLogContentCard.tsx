import React from 'react';
import {StyleSheet,Text,TextInput,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    content: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
}

export function DailyPetLogContentCard({content,onChange,error,disabled}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Ionicons name="book-outline" size={27} color="#2877E6"/>
                </View>

                <View style={styles.headerText}>
                    <Text style={styles.titulo}>Como foi o dia?</Text>
                    <Text style={styles.descricao}>Pode contar de forma livre, como em um diário.</Text>
                </View>
            </View>

            <TextInput style={[styles.textArea,error && styles.inputError]}
                placeholder="Ex.: Hoje meu pet se divertiu muito no parque..."
                placeholderTextColor="#9BB0C1"
                multiline
                textAlignVertical="top"
                value={content}
                onChangeText={onChange}
                editable={!disabled}
                maxLength={1000}
            />

            <Text style={styles.limiteTamanho}>{content.length}/1000</Text>

            {error && (<Text style={styles.error}>{error}</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 24,
        padding: 18,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EFF7',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#EAF4FF',
    },

    headerText: {
        flex: 1,
        marginLeft: 13,
    },

    titulo: {
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
    },

    descricao: {
        marginTop: 3,
        color: '#7B91A4',
        fontSize: 13,
        lineHeight: 18,
    },

    textArea: {
        minHeight: 180,
        marginTop: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#D8E6F1',
        borderRadius: 19,
        backgroundColor: '#FAFCFE',
        color: '#174F79',
        fontSize: 15,
        lineHeight: 22,
    },

    inputError: {
        borderColor: '#D77A7A',
    },

    limiteTamanho: {
        marginTop: 7,
        textAlign: 'right',
        color: '#95A7B6',
        fontSize: 12,
    },

    error: {
        marginTop: 6,
        color: '#B84B4B',
        fontSize: 13,
    },
});