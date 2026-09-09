import React, { useState } from 'react';
import {ActivityIndicator, Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/navigationTypes';
import { useRegisterUser } from '../../context/CadastroContext';
import { useRegisterVeterinarian } from '../../hooks/useRegisterVeterinarian';
import { veterinarianRegisterSchema } from '../../utils/validation/veterinarianRegisterSchema';
import * as yup from 'yup';

type Props = NativeStackScreenProps<PublicStackParamList,'CadastroVeterinarian'>;

interface VeterinarianErrors {
    crmv?: string;
    state?: string;
    specialty?: string;
    general?: string;
}

export function CadastroVeterinarianScreen({navigation,}: Props) {

    const [crmv, setCrmv] = useState('');
    const [state, setState] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [errors, setErrors] = useState<VeterinarianErrors>({});
    const {registerUserData,clearRegisterUserData} = useRegisterUser();
    const veterinarianMutation = useRegisterVeterinarian();

    async function handleCreateAccount() {
        try {
            setErrors({});

            if (!registerUserData) {
                setErrors({general:'Os dados da primeira etapa do cadastro não foram encontrados.',});

                return;
            }

            if (registerUserData.typeUser !== 'Veterinario') {
                setErrors({general:'O tipo de usuário informado não corresponde a Veterinário.',});

                return;
            }

            const veterinarianData = {
                crmv: crmv.trim(),
                state: state.trim().toUpperCase(),
                specialty: specialty.trim(),
            };

            await veterinarianRegisterSchema.validate(veterinarianData,{abortEarly: false});

            const veterinarian = await veterinarianMutation.mutateAsync({
                fullName: registerUserData.fullName,
                email: registerUserData.email,
                password: registerUserData.password,
                phoneNumber: registerUserData.phoneNumber,
                crmv: veterinarianData.crmv,
                state: veterinarianData.state,
                specialty: veterinarianData.specialty,
            });

            console.log('Veterinário cadastrado:',veterinarian);

            clearRegisterUserData();

            navigation.navigate('Login');

        } catch (error) {
            
            if (error instanceof yup.ValidationError) {
                const validationErrors:VeterinarianErrors = {};

                error.inner.forEach((validationError) => {
                    const field = validationError.path as keyof VeterinarianErrors;

                    if (field && !validationErrors[field]) {
                        validationErrors[field] =
                        validationError.message;
                    }
                });

                setErrors(validationErrors);

                return;
            }

            setErrors({general:'Não foi possível concluir o cadastro. Tente novamente.'});
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#174F79"/>
                </TouchableOpacity>

                <View style={styles.progressoContainer}>
                    <View style={styles.progressoAtivo} />
                    <View style={styles.linhaProgresso} />
                    <View style={styles.progressoAtivo} />
                </View>

                <Text style={styles.progressoText}>Etapa 2 de 2</Text>

                <View style={styles.header}>
                    <Image source={require('../../../assets/icon-cat.png')} style={styles.catIcon} resizeMode="contain"/>

                    <Text style={styles.titulo}>Complete seu perfil profissional</Text>

                    <Text style={styles.subtitulo}>Essas informações ajudam a identificar seu perfil veterinário.</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>CRMV</Text>

                        <View style={[styles.inputContainer,errors.crmv && styles.inputContainerError]}>
                            <Ionicons name="medkit-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite seu CRMV" placeholderTextColor="#9BB0C1" keyboardType="numeric" value={crmv} onChangeText={setCrmv} editable={!veterinarianMutation.isPending}/>
                        </View>

                        {errors.crmv && (<Text style={styles.fieldError}>{errors.crmv}</Text>)}
                    </View>

                    <View>
                        <Text style={styles.label}>Estado</Text>

                        <View style={[styles.inputContainer,errors.state && styles.inputContainerError]}>
                            <Ionicons name="location-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Ex.: SP" placeholderTextColor="#9BB0C1" autoCapitalize="characters" maxLength={2} value={state} onChangeText={(value) => setState(value.toUpperCase())} editable={!veterinarianMutation.isPending}/>
                        </View>

                        {errors.state && (<Text style={styles.fieldError}>{errors.state}</Text>)}
                    </View>

                    <View>
                        <Text style={styles.label}>Especialidade</Text>

                        <View style={[styles.inputContainer,errors.specialty && styles.inputContainerError]}>
                            <Ionicons name="medical-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite sua especialidade" placeholderTextColor="#9BB0C1" value={specialty} onChangeText={setSpecialty} editable={!veterinarianMutation.isPending}/>
                        </View>

                        {errors.specialty && (<Text style={styles.fieldError}>{errors.specialty}</Text>)}
                    </View>

                    {errors.general && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle-outline" size={20} color="#B84B4B"/>
                            <Text style={styles.errorText}>{errors.general}</Text>
                        </View>
                    )}

                    <TouchableOpacity style={[styles.criarContaButton, veterinarianMutation.isPending && styles.criarContaButtonDisabled]} activeOpacity={0.8} disabled={veterinarianMutation.isPending} onPress={handleCreateAccount}>
                        {veterinarianMutation.isPending ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#FFFFFF"/>
                                <Text style={styles.criarContaButtonText}>Criando conta...</Text>
                            </View>
                        ) : (
                            <Text style={styles.criarContaButtonText}>Criar conta</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footerContainer}>
                    <Ionicons name="shield-checkmark-outline" size={18} color="#2877E6"/>

                    <Text style={styles.footerText}>Seus dados profissionais serão protegidos.</Text>
                </View>
            </ScrollView>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7FBFF',
    },

    container: {
        flex: 1,
    },

    conteudo: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: 12,
        paddingBottom: 40,
    },

    returnButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },

    progressoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },

    progressoAtivo: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2877E6',
    },

    linhaProgresso: {
        width: 90,
        height: 3,
        marginHorizontal: 7,
        borderRadius: 2,
        backgroundColor: '#2877E6',
    },

    progressoText: {
        marginTop: 8,
        color: '#7B9AB3',
        fontSize: 13,
        textAlign: 'center',
    },

    header: {
        alignItems: 'center',
        marginTop: 14,
    },

    catIcon: {
        width: 95,
        height: 78,
    },

    titulo: {
        maxWidth: 340,
        marginTop: 12,
        color: '#174F79',
        fontSize: 27,
        lineHeight: 34,
        fontWeight: '700',
        textAlign: 'center',
    },

    subtitulo: {
        maxWidth: 340,
        marginTop: 10,
        color: '#5D7890',
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'center',
    },

    form: {
        marginTop: 34,
        gap: 19,
    },

    label: {
        marginBottom: 8,
        color: '#174F79',
        fontSize: 15,
        fontWeight: '600',
    },

    inputContainer: {
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#D8E6F1',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
    },

    inputContainerError: {
        borderColor: '#D77A7A',
    },

    input: {
        flex: 1,
        marginLeft: 12,
        color: '#174F79',
        fontSize: 16,
    },

    fieldError: {
        marginTop: 6,
        marginLeft: 4,
        color: '#B84B4B',
        fontSize: 13,
    },

    criarContaButton: {
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F6AE1',
        marginTop: 4,
    },

    criarContaButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    criarContaButtonDisabled: {
        opacity: 0.7,
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 24,
    },

    footerText: {
        color: '#6C879C',
        fontSize: 13,
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 14,
        backgroundColor: '#FFF1F1',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    errorText: {
        flex: 1,
        color: '#A44141',
        fontSize: 14,
        lineHeight: 20,
    },
});