import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PublicStackParamList } from '../../navigation/navigationTypes';

type Props = NativeStackScreenProps<PublicStackParamList,'Inicio'>;

export function InicioScreen({navigation }: Props) {

    return (

        <ImageBackground source={require('../../../assets/background-telainicial.png')} style={styles.background} resizeMode="cover">
        
            <View style={styles.conteudo}>
                
                <Image source={require('../../../assets/icon-cat.png')} style={styles.catIcon} resizeMode="contain"/>

                <Image source={require('../../../assets/logo-clyvoday.png')} style={styles.logo} resizeMode="contain"/>
                
                <View style={styles.slogan}>
                    <Text style={styles.textoSlogan}>O <Text style={styles.destaqueSlogan}>diário digital</Text> do seu pet.</Text>
                </View>
                
                <View style={styles.opcoes}>

                    <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.buttonCadastroText}>Começar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonLoginText}>Já tenho uma conta</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </ImageBackground>
    
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    conteudo: {
        flex: 1,
        padding: 24,
    },

    catIcon: {
        width: 350,
        height: 190,
        alignSelf: "center",
        marginTop: 30,
    },
  
    logo: {
        width: 320,
        height: 70,
        alignSelf: "center",
    },

    slogan: {
        alignItems: 'center',
        marginTop: 5,
    },

    textoSlogan: {
        fontSize: 22,
        lineHeight: 37,
        fontWeight: '700',
        color: '#174F79',
        textAlign: 'center',
    },

    destaqueSlogan: {
        color: '#347DE5',
    },
  
    opcoes: {
        marginTop: 310,
    },

    buttonCadastro: {
        backgroundColor: '#1F6AE1',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 14,
    },

    buttonCadastroText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonLogin: {
        borderWidth: 1,
        borderColor: '#1F6AE1',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
    },

    buttonLoginText: {
        color: '#1F6AE1',
        fontSize: 16,
        fontWeight: 'bold',
    },

});