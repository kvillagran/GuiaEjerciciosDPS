import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SegundaPantalla = ({ route }) => {
  const {
    nombre,
    apellido,
    genero,
    dui,
    nit,
    direccion,
    Nacimiento,
    telefonoMovil,
    telefonoCasa,
    correoElectronico,
  } = route.params;

  // aqui se calcula la edad con la fecha que pusimos
  const fNacimiento = new Date(Nacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - Nacimiento.getFullYear();

  // aqui decimos que etapa tendria al calcular la edad
  let etapa = '';
  if (edad >= 0 && edad <= 5) {
    etapa = 'Primera infancia';
  } else if (edad >= 6 && edad <= 11) {
    etapa = 'Infancia';
  } else if (edad >= 12 && edad <= 18) {
    etapa = 'Adolescencia';
  } else if (edad >= 19 && edad <= 26) {
    etapa = 'Juventud';
  } else if (edad >= 27 && edad <= 59) {
    etapa = 'Adultez';
  } else {
    etapa = 'Persona mayor';
  }

  return (
    <View style={styles.container}>
      <Image
      source={require('./doctor.png')}
      style={styles.headerImage} 
      />
    <Text style={styles.title}>Información del Paciente</Text>
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Nombre: {nombre}</Text>
      <Text style={styles.infoText}>Apellido: {apellido}</Text>
      <Text style={styles.infoText}>Género: {genero}</Text>
      <Text style={styles.infoText}>DUI: {dui}</Text>
      <Text style={styles.infoText}>NIT: {nit}</Text>
      <Text style={styles.infoText}>Dirección: {direccion}</Text>
      <Text style={styles.infoText}>Fecha de Nacimiento: {Nacimiento.toDateString()}</Text>
      <Text style={styles.infoText}>Teléfono Móvil: {telefonoMovil}</Text>
      <Text style={styles.infoText}>Teléfono de Casa: {telefonoCasa}</Text>
      <Text style={styles.infoText}>Correo Electrónico: {correoElectronico}</Text>
      <Text style={styles.infoText}>Edad: {edad} años</Text>
      <Text style={styles.infoText}>Etapa: {etapa}</Text>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  backgroundColor: '#F5FFFA',
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
},
headerImage: {
  width: 250,
  height: 100, 
},
infoContainer: {
  backgroundColor: '#E0FFFF', 
  borderWidth: 1,
  borderColor: 'gray',
  padding: 16,
  borderRadius: 8,
},
infoText: {
  fontSize: 16,
  marginBottom: 8, 
  letterSpacing: 1,
},
});


export default SegundaPantalla;
