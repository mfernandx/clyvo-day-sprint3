import React, { useState } from 'react';
import {ActivityIndicator, Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/navigationTypes';
import { useLogin } from '../../hooks/useLogin';
import { loginSchema} from '../../utils/validation/loginSchema';
import * as yup from 'yup';

type Props = NativeStackScreenProps<PublicStackParamList,'Login'>;

interface LoginErrors {
    email?: string;
    password?: string;
}

export function LoginScreen({ navigation }: Props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});
    const loginMutation = useLogin();

    async function handleLogin() {
        try {

            setErrors({});

            await loginSchema.validate(
                {email,password,},
                {abortEarly: false,},
            );

            const result = await loginMutation.mutateAsync({
                email: email.trim(),
                password,
            });

            console.log('Usuário autenticado:',result.user.fullName);
        
        } catch (error) {
            if (error instanceof yup.ValidationError) {

                const validationErrors: LoginErrors = {};
                error.inner.forEach((validationError) => {

                    if (validationError.path === 'email') {
                        validationErrors.email = validationError.message;
                    }

                    if (validationError.path === 'password') {
                        validationErrors.password = validationError.message;
                    }
                });

                setErrors(validationErrors);

                return;
            }
        }
    }

    return (

        <SafeAreaView style={styles.container}>
      
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()} disabled={loginMutation.isPending}>
                <Ionicons name="arrow-back" size={24} color="#174F79"/>
            </TouchableOpacity>

            <View style={styles.header}>
                <Image source={require('../../../assets/icon-cat.png')} style={styles.catIcon} resizeMode="contain"/>

                <Image source={require('../../../assets/logo-clyvoday.png')} style={styles.logo} resizeMode="contain"/>

                <Text style={styles.titulo}>Seja bem-vindo de volta!</Text>

                <Text style={styles.subtitulo}>Entre para continuar acompanhando a jornada do seu pet.</Text>
            </View>

            <View style={styles.form}>
                <View>

                    <Text style={styles.label}>E-mail</Text>

                    <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
                        <Ionicons name="mail-outline" size={20} color="#7B9AB3"/>
                        <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#9BB0C1" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} editable={!loginMutation.isPending}/>
                    </View>

                    {errors.email && (<Text style={styles.fieldError}>{errors.email}</Text>)}

                </View>

                <View>
                    <Text style={styles.label}>Senha</Text>

                    <View style={[styles.inputContainer, errors.password && styles.inputContainerError]}>
                        <Ionicons name="lock-closed-outline" size={20} color="#7B9AB3"/>
                        <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#9BB0C1" secureTextEntry value={password} onChangeText={setPassword} editable={!loginMutation.isPending}/>
                    </View>

                    {errors.password && (<Text style={styles.fieldError}>{errors.password}</Text>)}

                </View>


                <TouchableOpacity style={[styles.buttonLogin,loginMutation.isPending && styles.loginButtonDisabled]} activeOpacity={0.8} disabled={loginMutation.isPending} onPress={handleLogin}>
                    
                    {loginMutation.isPending ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#FFFFFF"/>

                            <Text style={styles.buttonLoginText}>Entrando...</Text>
                        </View>
                        ) : (
                        <Text style={styles.buttonLoginText}>Entrar</Text>
                    )}
                    
                </TouchableOpacity>

            </View>

            <View style={styles.divisorContainer}>
                <View style={styles.divisor} />
                <Text style={styles.divisorText}>ou</Text>
                <View style={styles.divisor} />
            </View>

            <View style={styles.cadastroContainer}>
                <Text style={styles.cadastroText}>Ainda não tem uma conta?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroUser')} disabled={loginMutation.isPending}>
                    <Text style={styles.cadastroLink}>Criar conta</Text>
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
        paddingBottom: 32,
    },

    returnButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginTop: 12,
    },

    catIcon: {
        width: 105,
        height: 85,
    },

    logo: {
        width: 220,
        height: 62,
        marginTop: -8,
    },

    titulo: {
        marginTop: 24,
        fontSize: 27,
        lineHeight: 34,
        fontWeight: '700',
        color: '#174F79',
        textAlign: 'center',
    },

    subtitulo: {
        marginTop: 12,
        maxWidth: 330,
        fontSize: 16,
        lineHeight: 23,
        color: '#5D7890',
        textAlign: 'center',
    },

    form: {
        marginTop: 38,
        gap: 20,
    },

    label: {
        marginBottom: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#174F79',
    },

    inputContainer: {
        height: 58,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#D8E6F1',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    inputContainerError: {
        borderColor: '#D77A7A',
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#174F79',
    },

    fieldError: {
        marginTop: 6,
        marginLeft: 4,
        color: '#B84B4B',
        fontSize: 13,
    },

    buttonLogin: {
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F6AE1',
        marginTop: 4,
    },

    loginButtonDisabled: {
        opacity: 0.7,
    },    

    buttonLoginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    divisorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 34,
    },

    divisor: {
        flex: 1,
        height: 1,
        backgroundColor: '#D8E6F1',
    },

    divisorText: {
        marginHorizontal: 14,
        color: '#8BA2B6',
    },

    cadastroContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 28,
        gap: 5,
    },

    cadastroText: {
        color: '#5D7890',
        fontSize: 15,
    },

    cadastroLink: {
        color: '#2877E6',
        fontSize: 15,
        fontWeight: '700',
    },
});