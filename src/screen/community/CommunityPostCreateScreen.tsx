import React, {useState} from 'react';
import {ActivityIndicator,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NativeStackScreenProps,} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {TutorStackParamList} from '../../navigation/navigationTypes';
import {useCreateCommunityPost} from '../../hooks/useCreateCommunityPost';
import {communityPostSchema} from '../../utils/validation/communityPostSchema';
import {CommunityCategorySelector} from '../../components/CommunityCategorySelector';
import {CommunityPostForm} from '../../components/CommunityPostForm';

type Props = NativeStackScreenProps<TutorStackParamList,'CommunityPostCreate'>;

interface Errors {
    category?: string;
    content?: string;
    location?: string;
    general?: string;
}

export function CommunityPostCreateScreen({navigation,}: Props) {
    const [category,setCategory] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const createMutation = useCreateCommunityPost();

    async function handleCreate() {
        try {
            setErrors({});

            const formData = {
                category,
                content: content.trim(),
                location: location.trim(),
            };

            await communityPostSchema.validate(formData,{abortEarly: false,});

            if (!category) {
                return;
            }

            await createMutation.mutateAsync({
                category,
                content: formData.content,
                imageUrl: null,
                location:
                formData.location.length > 0 ? formData.location : null,
            });

            navigation.goBack();

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                
                const validationErrors:
                Errors = {};

                error.inner.forEach((validationError) => {
                    const field = validationError.path as keyof Errors;

                    if (field && !validationErrors[field]) {
                    validationErrors[field] = validationError.message;
                    }
                });

                setErrors(validationErrors);

                return;
            }

            setErrors({general:'Não foi possível publicar. Tente novamente.'});
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity style={styles.returnButton} activeOpacity={0.8} disabled={createMutation.isPending} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#174F79"/>
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.titulo}>Nova publicação</Text>
                        <Text style={styles.subtitulo}>Compartilhe experiências com a comunidade de cuidado.</Text>
                    </View>
                </View>

                <CommunityCategorySelector selectedCategory={category} onSelect={setCategory} error={errors.category} disabled={createMutation.isPending}/>

                <CommunityPostForm content={content} location={location} onChangeContent={setContent} onChangeLocation={setLocation} contentError={errors.content} locationError={errors.location} disabled={createMutation.isPending}/>

                {errors.general && (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={20} color="#B84B4B"/>
                        <Text style={styles.errorText}>{errors.general}</Text>
                    </View>
                )}

                <TouchableOpacity style={[styles.publicarButton, createMutation.isPending && styles.buttonDisabled,]} activeOpacity={0.8} disabled={createMutation.isPending} onPress={handleCreate}>
                    {createMutation.isPending ? (
                        <>
                            <ActivityIndicator size="small" color="#FFFFFF"/>
                            <Text style={styles.publicarButtonText}>Publicando...</Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="paper-plane-outline" size={21} color="#FFFFFF"/>
                            <Text style={ styles.publicarButtonText}>Publicar</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Ionicons name="sparkles-outline" size={18} color="#65A8EA"/>
                    <Text style={styles.footerText}>Compartilhar experiências também é uma forma de cuidar.</Text>
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

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 18,
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#FFF1F1',
    },

    errorText: {
        flex: 1,
        color: '#A44141',
        fontSize: 14,
    },

    publicarButton: {
        minHeight: 60,
        marginTop: 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        borderRadius: 35,
        backgroundColor: '#1F6AE1',
    },

    buttonDisabled: {
        opacity: 0.7,
    },

    publicarButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        marginTop: 22,
    },

    footerText: {
        flexShrink: 1,
        color: '#71899D',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
        marginTop: 15,
    },
  });