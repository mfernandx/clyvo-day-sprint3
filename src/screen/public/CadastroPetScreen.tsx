import React from 'react';
import {Image,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PublicStackParamList } from '../../navigation/navigationTypes';

type Props = NativeStackScreenProps<PublicStackParamList,'CadastroPet'>;

export function CadastroPetScreen({navigation,}: Props) {
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

                            <TextInput style={styles.input} placeholder="Digite o nome do pet" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Espécie</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="paw-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Ex.: Cachorro, gato..." placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Raça</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="heart-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Digite a raça" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Sexo</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="male-female-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="Macho ou fêmea" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Data de nascimento</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="calendar-outline" size={20} color="#7B9AB3"/>

                            <TextInput style={styles.input} placeholder="DD/MM/AAAA" placeholderTextColor="#9BB0C1"/>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.criarContaButton}>
                        <Text style={styles.criarContaButtonText}>Criar conta</Text>
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

    footerText: {
        marginTop: 20,
        color: '#7B9AB3',
        fontSize: 13,
        textAlign: 'center',
    },
});