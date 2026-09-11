import React from 'react';
import {StyleSheet,Text,TextInput,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    content: string;
    location: string;
    onChangeContent: (value: string) => void;
    onChangeLocation: (value: string) => void;
    contentError?: string;
    locationError?: string;
    disabled?: boolean;
}

export function CommunityPostForm({content,location,onChangeContent,onChangeLocation,contentError,locationError,disabled}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Ionicons name="chatbubble-ellipses-outline" size={26} color="#2877E6"/>
                </View>

                <View style={styles.headerText}>
                    <Text style={styles.titulo}>Compartilhe sua experiência</Text>
                    <Text style={styles.descricao}>Conte algo que possa aproximar, inspirar ou ajudar outros tutores.</Text>
                </View>
            </View>

            <TextInput style={[styles.textArea,contentError && styles.inputError]} placeholder="O que você gostaria de compartilhar?" placeholderTextColor="#9BB0C1" multiline textAlignVertical="top" maxLength={1500} value={content} onChangeText={onChangeContent} editable={!disabled}/>

            <Text style={styles.limiteTamanho}>{content.length}/1500</Text>

            {contentError && (<Text style={styles.error}>{contentError}</Text>)}

            <View style={styles.localizacaoHeader}>
                <Ionicons name="location-outline" size={20} color="#2877E6" />
                <Text style={styles.localizacaoLabel}>Localização</Text>
                <Text style={styles.opcional}>opcional</Text>
            </View>

            <TextInput style={[styles.input,locationError && styles.inputError]} placeholder="Ex.: São Paulo - SP" placeholderTextColor="#9BB0C1" value={location} onChangeText={onChangeLocation} editable={!disabled} maxLength={120}/>

            {locationError && (<Text style={styles.error}>{locationError}</Text>)}
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
        minHeight: 170,
        marginTop: 20,
        padding: 15,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: '#D8E6F1',
        backgroundColor: '#FAFCFE',
        color: '#174F79',
        fontSize: 15,
        lineHeight: 22,
    },

    limiteTamanho: {
        marginTop: 7,
        textAlign: 'right',
        color: '#95A7B6',
        fontSize: 12,
    },

    localizacaoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        gap: 6,
    },

    localizacaoLabel: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '700',
    },

    opcional: {
        color: '#94A6B5',
        fontSize: 12,
    },

    input: {
        height: 54,
        marginTop: 10,
        paddingHorizontal: 15,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#D8E6F1',
        backgroundColor: '#FAFCFE',
        color: '#174F79',
        fontSize: 14,
    },

    inputError: {
        borderColor: '#D77A7A',
    },

    error: {
        marginTop: 6,
        color: '#B84B4B',
        fontSize: 13,
    },
});