import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    title: string;
    description: string;
    value: string;
    placeholder: string;
    maxLength?: number;
    loading?: boolean;
    onClose: () => void;
    onSave: (value: string) => Promise<void>;
}

export function EditProfileFieldModal({ visible, title, description, value, placeholder, maxLength, loading = false, onClose, onSave }: Props) {
    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState('');

    useEffect(() => {
        if (visible) {
            setInputValue(value);
            setError('');
        }
    }, [visible,value]);

    async function handleSave() {
        setError('');
        const formattedValue = inputValue.trim();

        if (!formattedValue) {
            setError('Preencha o campo antes de salvar.');
            return;
        }

        try {
            await onSave(formattedValue);

        } catch {
            setError('Não foi possível salvar a alteração.');
        }
    }

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>

                <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitulo}>{title}</Text>
                            <Text style={styles.modalDescricao}>{description}</Text>
                        </View>

                        <TouchableOpacity style={styles.fecharButton} onPress={onClose} disabled={loading}>
                            <Ionicons name="close" size={20} color="#7890A2" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} value={inputValue} onChangeText={setInputValue} placeholder={placeholder} placeholderTextColor="#9AAAB6" autoCapitalize="none" maxLength={maxLength} editable={!loading} />
                    </View>

                    {error.length > 0 && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle-outline" size={17} color="#C45656" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.acoes}>
                        <TouchableOpacity style={styles.cancelarButton} onPress={onClose} disabled={loading}>
                            <Text style={styles.cancelarText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.salvarButton, loading && styles.salvarButtonDisabled]} onPress={handleSave} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />

                            ) : (
                                <Text style={styles.salvarText}>Salvar</Text>

                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor:'rgba(19, 43, 61, 0.35)',
    },

    modalCard: {
        padding: 20,
        borderRadius: 24,
        backgroundColor:'#FFFFFF',
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-start',
    },

    modalTitulo: {
        color: '#174F79',
        fontSize: 19,
        fontWeight: '700',
    },

    modalDescricao: {
        maxWidth: 260,
        marginTop: 5,
        color: '#7890A2',
        fontSize: 11,
        lineHeight: 16,
    },

    fecharButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor:'#F3F7FA',
    },

    inputContainer: {
        minHeight: 52,
        marginTop: 20,
        paddingHorizontal: 14,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#F7FAFC',
        borderWidth: 1,
        borderColor: '#DFE9F0',
    },

    input: {
        color: '#315B79',
        fontSize: 13,
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
    },

    errorText: {
        flex: 1,
        color: '#B75959',
        fontSize: 10,
    },

    acoes: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 22,
    },

    cancelarButton: {
        flex: 1,
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor:'#F1F5F8',
    },

    cancelarText: {
        color: '#6D8496',
        fontSize: 16,
        fontWeight: '700',
    },

    salvarButton: {
        flex: 1,
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor:'#1F6AE1',
    },

    salvarButtonDisabled: {
        opacity: 0.65,
    },

    salvarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});