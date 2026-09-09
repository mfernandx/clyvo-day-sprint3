import React, { useState } from 'react';
import {Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/navigationTypes';
import { TypeUser } from '../../model/User';
import { useRegisterUser} from '../../context/CadastroContext';
import { userRegisterSchema } from '../../utils/validation/userRegisterSchema';
import * as yup from 'yup';

type Props = NativeStackScreenProps<PublicStackParamList,'CadastroUser'>;

interface CadastroErrors {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    typeUser?: string;
}

export function CadastroUserScreen({navigation}: Props) {

    const [selectedUserType, setSelectedUserType] = useState<TypeUser | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<CadastroErrors>({});
    const { saveRegisterUserData } = useRegisterUser();

    async function handleContinue() {

        try {
            setErrors({});

            if (!selectedUserType) {
                setErrors({typeUser: 'Selecione um tipo de usuário.',});
                return;
            }

            const data = {
                fullName: fullName.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                password,
                typeUser: selectedUserType,
            };

            await userRegisterSchema.validate(data, {abortEarly: false});

            saveRegisterUserData(data);

            if (selectedUserType === 'Tutor') {
                navigation.navigate('CadastroPet');
                return;
            }

            navigation.navigate('CadastroVeterinarian');

        } catch (error) {

            if (error instanceof yup.ValidationError) {
                const validationErrors: CadastroErrors = {};

                error.inner.forEach((validationError) => {
                    const field = validationError.path as keyof CadastroErrors;

                    if (field && !validationErrors[field]) {
                        validationErrors[field] = validationError.message;
                    }
                },);

                setErrors(validationErrors);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#174F79"/>
                </TouchableOpacity>

                <View style={styles.progressoContainer}>
                    <View style={styles.progressoAtivo} />
                    <View style={styles.linhaProgresso} />
                    <View style={styles.progressoAtivo} />
                </View>
                
                <Text style={styles.progressoText}>Etapa 1 de 2</Text>

                <View style={styles.header}>
                    <Image source={require('../../../assets/icon-cat.png')} style={styles.catIcon} resizeMode="contain"/>

                    <Text style={styles.titulo}>Cadastre-se na plataforma</Text>

                    <Text style={styles.subtitulo}>A jornada de cuidado do seu {'\n'}pet começa aqui.</Text>
                </View>

                <View style={styles.tipoPerfilSection}>
                    <Text style={styles.tipoPerfilTitulo}>Como você usará o CLYVO DAY?</Text>

                    <View style={styles.opcoesPerfil}>
                        <TouchableOpacity style={[styles.perfilCard, selectedUserType === 'Tutor' && styles.perfilCardSelected]} onPress={() => setSelectedUserType('Tutor')}>
                            <Ionicons name="paw-outline" size={27} color={selectedUserType === 'Tutor' ? '#FFFFFF' : '#2877E6'}/>

                            <Text style={[styles.perfilCardTitulo, selectedUserType === 'Tutor' && styles.perfilCardTituloSelected,]}>Tutor</Text>

                            <Text style={[styles.perfilCardDescricao, selectedUserType === 'Tutor' && styles.perfilCardDescricaoSelected,]}>Cuido dos meus pets</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.perfilCard, selectedUserType === 'Veterinario' && styles.perfilCardSelected]} onPress={() => setSelectedUserType('Veterinario')}>
                            <Ionicons name="medical-outline" size={27} color={selectedUserType === 'Veterinario' ? '#FFFFFF' : '#2877E6'}/>

                            <Text style={[styles.perfilCardTitulo, selectedUserType === 'Veterinario' && styles.perfilCardTituloSelected,]}>Veterinário</Text>

                            <Text style={[styles.perfilCardDescricao, selectedUserType === 'Veterinario' && styles.perfilCardDescricaoSelected,]}>Acompanho pacientes</Text>
                        </TouchableOpacity>
                    </View>

                    {errors.typeUser && (<Text style={styles.fieldError}>{errors.typeUser}</Text>)}
                </View>

                <View style={styles.form}>

                    <View>
                        <Text style={styles.label}>Nome completo</Text>

                        <View style={[styles.inputContainer, errors.fullName && styles.inputContainerError]}>
                            <Ionicons name="person-outline" size={20} color="#7B9AB3"/>
                            <TextInput style={styles.input} placeholder="Digite seu nome completo" placeholderTextColor="#9BB0C1" value={fullName} onChangeText={setFullName}/>
                        </View>

                        {errors.fullName && (<Text style={styles.fieldError}>{errors.fullName}</Text>)}
                    </View>

                    <View>
                        <Text style={styles.label}>E-mail</Text>

                        <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
                            <Ionicons name="mail-outline" size={20} color="#7B9AB3"/>
                            <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#9BB0C1" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail}/>
                        </View>

                        {errors.email && (<Text style={styles.fieldError}>{errors.email}</Text>)}
                    </View>

                    <View>
                        <Text style={styles.label}>Telefone</Text>

                        <View style={[styles.inputContainer, errors.phoneNumber && styles.inputContainerError]}>
                            <Ionicons name="call-outline" size={20} color="#7B9AB3"/>
                            <TextInput style={styles.input} placeholder="Digite seu telefone" placeholderTextColor="#9BB0C1" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber}/>
                        </View>

                        {errors.phoneNumber && (<Text style={styles.fieldError}>{errors.phoneNumber}</Text>)}
                    </View>

                    <View>
                        <Text style={styles.label}>Senha</Text>
                        
                        <View style={[styles.inputContainer,errors.password && styles.inputContainerError]}>
                            <Ionicons name="lock-closed-outline" size={20} color="#7B9AB3"/>
                            <TextInput style={styles.input} placeholder="Crie uma senha" placeholderTextColor="#9BB0C1" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword}/>
                        </View>

                        {errors.password && (<Text style={styles.fieldError}>{errors.password}</Text>)}
                    </View>

                    <TouchableOpacity style={styles.buttonContinuar} onPress={handleContinue}>
                        <Text style={styles.buttonContinuarText}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já possui uma conta?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FBFF',
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
        borderRadius: 22,
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
        color: '#174F79',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: '700',
        textAlign: 'center',
    },

    subtitulo: {
        maxWidth: 330,
        marginTop: 11,
        color: '#5D7890',
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'center',
    },

    tipoPerfilSection: {
        marginTop: 30,
    },

    tipoPerfilTitulo: {
        color: '#174F79',
        fontSize: 16,
        fontWeight: '600',
    },

    opcoesPerfil: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },

    perfilCard: {
        flex: 1,
        minHeight: 112,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D5E6F5',
        backgroundColor: '#FFFFFF',
        padding: 12,
    },

    perfilCardTitulo: {
        marginTop: 7,
        color: '#174F79',
        fontSize: 16,
        fontWeight: '700',
    },

    perfilCardDescricao: {
        marginTop: 3,
        color: '#7890A3',
        fontSize: 12,
        textAlign: 'center',
    },

    perfilCardSelected: {
        backgroundColor: '#2877E6',
        borderColor: '#2877E6',
    },

    perfilCardTituloSelected: {
        color: '#FFFFFF',
    },

    perfilCardDescricaoSelected: {
        color: '#EAF3FF',
    },

    form: {
        marginTop: 28,
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

    buttonContinuar: {
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F6AE1',
        marginTop: 4,
    },

    buttonContinuarText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 28,
    },

    loginText: {
        color: '#5D7890',
        fontSize: 15,
    },

    loginLink: {
        color: '#2877E6',
        fontSize: 15,
        fontWeight: '700',
    },
});