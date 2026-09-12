import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {careEventTypes} from '../utils/constants/careEventTypes';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function CareEventTypeSelector({value,onChange,}: Props) {
    return (

        <View>
            <Text style={styles.titulo}>Tipo de cuidado</Text>

            <Text style={styles.subtitulo}>O que você deseja registrar?</Text>

            <View style={styles.opcoes}>{careEventTypes.map((option) => {

                const selected =value === option.label;

                return (
                    <TouchableOpacity key={option.label} activeOpacity={0.8} style={[styles.opcao,{backgroundColor:option.backgroundColor}, selected && {borderColor:option.color}]} onPress={() => onChange(option.label)}>
                        
                        <View style={[styles.iconContainer,{backgroundColor:'#FFFFFF'}]}>
                            <Ionicons name={option.icon} size={21} color={option.color}/>
                        </View>

                        <Text style={[styles.opcaoText,{color:option.color}]}>{option.label}</Text>

                            {selected && (
                                <View style={[styles.checkContainer,{backgroundColor:option.color}]}>
                                    <Ionicons name="checkmark" size={12} color="#FFFFFF"/>
                                </View>
                            )}
                    </TouchableOpacity>
                );
            })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    titulo: {
        color: '#174F79',
        fontSize: 17,
        fontWeight: '700',
    },

    subtitulo: {
        marginTop: 3,
        color: '#8194A3',
        fontSize: 11,
    },

    opcoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 9,
        marginTop: 13,
    },

    opcao: {
        width: '48%',
        minHeight: 67,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 18,
        backgroundColor:'#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4EDF4',
    },

    iconContainer: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor:'#F1F5F8',
    },

    iconContainerSelected: {
        backgroundColor:'#DDEEFF',
    },

    opcaoText: {
        flex: 1,
        marginLeft: 8,
        color: '#607D92',
        fontSize: 11,
        fontWeight: '600',
    },

    checkContainer: {
        width: 19,
        height: 19,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 4,
    },
});