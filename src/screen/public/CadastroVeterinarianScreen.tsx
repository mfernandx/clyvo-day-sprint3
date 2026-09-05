import React from 'react';
import {Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/navigationTypes';

type Props = NativeStackScreenProps<PublicStackParamList,'CadastroVeterinarian'>;

export function CadastroVeterinarianScreen({navigation,}: Props) {
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

                        <View style={styles.inputContainer}>
                            <Ionicons name="medkit-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite seu CRMV" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Estado</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="location-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Ex.: SP" placeholderTextColor="#9BB0C1" autoCapitalize="characters"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Especialidade</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="medical-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite sua especialidade" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.criarContaButton}>
                        <Text style={styles.criarContaButtonText}>Criar conta</Text>
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

    input: {
        flex: 1,
        marginLeft: 12,
        color: '#174F79',
        fontSize: 16,
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
});