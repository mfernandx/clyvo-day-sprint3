import React, { useState } from 'react';
import {ActivityIndicator,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {TutorStackParamList} from '../../navigation/navigationTypes';
import {DailyPetLogPrivacy, DailyPetLogType} from '../../model/DailyPetLog';
import {useCreateDailyPetLog} from '../../hooks/useCreateDailyPetLog';
import {dailyPetLogSchema} from '../../utils/validation/dailyPetLogSchema';
import { DailyPetLogTypeSelector } from '../../components/DailyPetLogTypeSelector';
import { DailyPetLogContentCard } from '../../components/DailyPetLogContentCard';
import { DailyPetLogPrivacySelector } from '../../components/DailyPetLogPrivacySelector';

type Props = NativeStackScreenProps<TutorStackParamList,'DailyPetLogCreate'>;

interface DailyPetLogErrors {
    dailyPetLogType?: string;
    content?: string;
    privacy?: string;
    general?: string;
}

export function DailyPetLogCreateScreen({navigation,route}: Props) {
    const { petId } = route.params;
    const [dailyPetLogType,setDailyPetLogType] = useState<DailyPetLogType | null>(null);
    const [content, setContent] = useState('');
    const [privacy,setPrivacy] = useState<DailyPetLogPrivacy>(0);
    const [errors, setErrors] = useState<DailyPetLogErrors>({});
    const createMutation = useCreateDailyPetLog();

    async function handleCreate() {
        try {
            setErrors({});

            const formData = {
                dailyPetLogType,
                content: content.trim(),
                privacy,
            };

            await dailyPetLogSchema.validate(formData,{abortEarly: false});

            if (!dailyPetLogType) {
                return;
            }

            await createMutation.mutateAsync({
                petId,
                dailyPetLogType,
                content: formData.content,
                privacy: formData.privacy,
            });

            navigation.goBack();

        } catch (error) {
            if (error instanceof yup.ValidationError) {

                const validationErrors: DailyPetLogErrors = {};

                error.inner.forEach((validationError) => {
                    const field = validationError.path as keyof DailyPetLogErrors;

                    if (field && !validationErrors[field]) {
                        validationErrors[field] =validationError.message;
                    }
                });

                setErrors(validationErrors);
                return;
            }

            setErrors({general:'Não foi possível salvar o registro diário. Tente novamente.'});
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                
                <View style={styles.header}>
                    <TouchableOpacity style={styles.returnButton} activeOpacity={0.7} onPress={() => navigation.goBack()} disabled={createMutation.isPending}>
                        <Ionicons name="arrow-back" size={24} color="#174F79"/>
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.titulo}>Registro diário</Text>
                        <Text style={styles.subtitulo}>Guarde os pequenos momentos que fizeram parte do dia.</Text>
                    </View>
                </View>

                <DailyPetLogTypeSelector 
                    selectedType={dailyPetLogType}
                    onSelect={setDailyPetLogType}
                    error={errors.dailyPetLogType}
                    disabled={createMutation.isPending}
                />

                <DailyPetLogContentCard
                    content={content}
                    onChange={setContent}
                    error={errors.content}
                    disabled={createMutation.isPending}
                />

                <DailyPetLogPrivacySelector
                    privacy={privacy}
                    onChange={setPrivacy}
                    disabled={createMutation.isPending}
                />

                {errors.general && (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={20} color="#B84B4B"/>
                        <Text style={styles.errorText}>{errors.general}</Text>
                    </View>
                )}

                <TouchableOpacity style={[styles.salvarButton,createMutation.isPending && styles.salvarButtonDisabled,]} activeOpacity={0.8} disabled={createMutation.isPending} onPress={handleCreate}>
                    {createMutation.isPending ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#FFFFFF"/>
                            <Text style={styles.salvarButtonText}>Salvando...</Text>
                        </View>
                    ) : (
                        <>
                            
                            <Text style={styles.salvarButtonText}>Guardar momento</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={styles.footerMensagem}>
                    <Ionicons name="sparkles-outline" size={18} color="#65A8EA"/>
                    <Text style={styles.footerText}>Um pequeno registro hoje pode contar uma grande história amanhã.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#F5FAFF',
    },

    conteudo: {
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 35,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 28,
    },

    returnButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
    },

    headerText: {
        flex: 1,
        marginLeft: 13,
    },

    titulo: {
        color: '#174F79',
        fontSize: 27,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 5,
        color: '#6C879C',
        fontSize: 14,
        lineHeight: 20,
    },

    fieldError: {
        marginTop: 6,
        marginLeft: 4,
        color: '#B84B4B',
        fontSize: 13,
    },

    sectionTitulo: {
        marginTop: 27,
        color: '#174F79',
        fontSize: 18,
        fontWeight: '700',
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: '#FFF1F1',
    },

    errorText: {
        flex: 1,
        color: '#A44141',
        fontSize: 14,
        lineHeight: 20,
    },

    salvarButton: {
        minHeight: 60,
        marginTop: 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        borderRadius: 35,
        backgroundColor: '#1F6AE1',
    },

    salvarButtonDisabled: {
        opacity: 0.7,
    },

    salvarButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    footerMensagem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        marginTop: 22,
        paddingHorizontal: 15,
    },

    footerText: {
        flexShrink: 1,
        color: '#71899D',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
        marginTop: 15
    },
  });