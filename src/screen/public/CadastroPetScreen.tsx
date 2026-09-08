import React, { useState } from 'react';
import {ActivityIndicator, Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/navigationTypes';
import * as yup from 'yup';
import { useRegisterUser } from '../../context/CadastroContext';
import { useRegisterTutor } from '../../hooks/useRegisterTutor';
import { useRegisterPet } from '../../hooks/useRegisterPet';
import { petRegisterSchema } from '../../utils/validation/petRegisterSchema';
import { calculateAge } from '../../utils/calc/calculateAge';

type Props = NativeStackScreenProps<PublicStackParamList,'CadastroPet'>;

interface PetErrors {
    name?: string;
    species?: string;
    breed?: string;
    sex?: string;
    birthDate?: string;
    general?: string;
}

export function CadastroPetScreen({navigation,}: Props) {

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [errors, setErrors] = useState<PetErrors>({});
    const {registerUserData,clearRegisterUserData} = useRegisterUser();
    const tutorMutation = useRegisterTutor();
    const petMutation = useRegisterPet();
    const isPending = tutorMutation.isPending || petMutation.isPending;

    async function handleCreateAccount() {

    
        try {
            setErrors({});

            if (!registerUserData) {
                setErrors({general:'Os dados do cadastro não foram encontrados. Volte e preencha a primeira etapa novamente.'});

                return;
            }

            if (registerUserData.typeUser !== 'Tutor') {
                setErrors({general:'O tipo de usuário informado não corresponde a Tutor.'});

                return;
            }

            const petData = {
                name: name.trim(),
                species: species.trim(),
                breed: breed.trim(),
                sex,
                birthDate,
            };

            await petRegisterSchema.validate(petData,{abortEarly: false});

            const age = calculateAge(birthDate);

            const tutor = await tutorMutation.mutateAsync({
                fullName:
                registerUserData.fullName,
                email:
                registerUserData.email,
                password:
                registerUserData.password,
                phoneNumber:
                registerUserData.phoneNumber,
            });

            await petMutation.mutateAsync({
                tutorId: tutor.userId,
                name: petData.name,
                species: petData.species,
                breed: petData.breed,
                sex: petData.sex,
                age,
                birthDate: petData.birthDate,
            });

            clearRegisterUserData();

            console.log('Tutor e Pet cadastrados com sucesso.');

            navigation.navigate('Login');

        } catch (error) {

            if (error instanceof yup.ValidationError) {

                const validationErrors: PetErrors ={};

                error.inner.forEach((validationError) => {
                    const field = validationError.path as keyof PetErrors;

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

                    <Text style={styles.titulo}>Agora vamos conhecer seu pet</Text>

                    <Text style={styles.subtitulo}>Nos conte um pouco sobre seu companheiro.</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Nome do pet</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="paw-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite o nome do pet" placeholderTextColor="#9BB0C1" value={name} onChangeText={setName}/>
                        </View>

                        {errors.name && (
                            <Text style={styles.fieldError}>{errors.name}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Espécie</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="paw-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Ex.: Cachorro, gato..." placeholderTextColor="#9BB0C1" value={species} onChangeText={setSpecies}/>
                        </View>
                        
                        {errors.species && (
                            <Text style={styles.fieldError}>{errors.species}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Raça</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="heart-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite a raça" placeholderTextColor="#9BB0C1" value={breed} onChangeText={setBreed}/>
                        </View>
                        
                        {errors.breed && (<Text style={styles.fieldError}>{errors.breed}</Text>)}
                    </View>

                    <View>
                        <View style={styles.sexOpcoes}>
                            <TouchableOpacity style={[styles.sexButton,sex === 'Macho' && styles.sexButtonSelected]} onPress={() => setSex('Macho')}>
                                <Text style={[styles.sexButtonText,sex === 'Macho' && styles.sexButtonTextSelected]}>Macho</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.sexButton,sex === 'Femea' && styles.sexButtonSelected]} onPress={() => setSex('Femea')}>
                                <Text style={[styles.sexButtonText,sex === 'Femea' && styles.sexButtonTextSelected]}>Fêmea</Text>
                            </TouchableOpacity>
                        </View>

                        {errors.sex && (<Text style={styles.fieldError}>{errors.sex}</Text>)}

                    </View>

                    <View>
                        <Text style={styles.label}>Data de nascimento</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="calendar-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="AAAA-MM-DD" placeholderTextColor="#9BB0C1" value={birthDate} onChangeText={setBirthDate}/>
                        </View>

                        {errors.birthDate && (<Text style={styles.fieldError}>{errors.birthDate}</Text>)}
                    </View>

                    {errors.general && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle-outline" size={20} color="#B84B4B"/>
                            <Text style={styles.errorText}>{errors.general}</Text>
                        </View>
                    )}

                    <TouchableOpacity style={[styles.criarContaButton,isPending && styles.criarContaButtonDisabled,]} activeOpacity={0.8} disabled={isPending} onPress={handleCreateAccount}>
                        {isPending ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#FFFFFF"/>
                                <Text style={styles.criarContaButtonText}>Criando conta...</Text>
                            </View>
                        ) : (
                            <Text style={styles.criarContaButtonText}>Criar conta</Text>
                        )}
                    </TouchableOpacity>

                </View>

                <Text style={styles.footerText}>Você poderá cadastrar outros pets depois.</Text>
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
        marginTop: 12,
        maxWidth: 330,
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
        marginTop: 30,
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

    sexOpcoes: {
        flexDirection: 'row',
        gap: 12,
    },

    sexButton: {
        flex: 1,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D8E6F1',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
    },

    sexButtonSelected: {
        borderColor: '#2877E6',
        backgroundColor: '#2877E6',
    },

    sexButtonText: {
        color: '#174F79',
        fontSize: 15,
        fontWeight: '600',
    },

    sexButtonTextSelected: {
        color: '#FFFFFF',
    },

    criarContaButton: {
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F6AE1',
        marginTop: 4,
    },

    criarContaButtonDisabled: {
        opacity: 0.7,
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    criarContaButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    footerText: {
        marginTop: 20,
        color: '#7B9AB3',
        fontSize: 13,
        textAlign: 'center',
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