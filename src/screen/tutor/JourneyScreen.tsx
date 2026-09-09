import React from 'react';
import {SafeAreaView,StyleSheet,Text,View} from 'react-native';

export function JourneyScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.conteudo}>
                <Text style={styles.titulo}>Jornada do Pet</Text>

                <Text style={styles.subtitulo}>Registros longitudinais do PET aparecerão aqui.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F7FBFF',
},

conteudo: {
    flex: 1,
    padding: 24,
},

titulo: {
    color: '#174F79',
    fontSize: 28,
    fontWeight: '700',
},

subtitulo: {
    marginTop: 10,
    color: '#6C879C',
    fontSize: 16,
},
});