import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PrimeraPantalla = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [dui, setDui] = useState('');
  const [nit, setNit] = useState('');
  const [direccion, setDireccion] = useState('');
  const [Nacimiento, setNacimiento] = useState(new Date());
  const [telefonoMovil, setTelefonoMovil] = useState('');
  const [telefonoCasa, setTelefonoCasa] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setNacimiento(date);
    hideDatePicker();
  };
 
    const handleGuardar = () => {
      // Aplicar validaciones aquí
      if (!nombre.match(/^[A-Za-z]+$/) || !apellido.match(/^[A-Za-z]+$/)) {
        alert('El nombre y el apellido deben contener solo letras.');
        return;
      }
  
      if (!dui.match(/^[0-9]{8}-[0-9]$/)) {
        alert('El DUI debe tener el formato 00000000-0.');
        return;
      }
  
      if (!nit.match(/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/)) {
        alert('El NIT debe tener el formato 0000-000000-000-0.');
        return;
      }
  
      if (!telefonoMovil.match(/^[0-9]{8}$/)) {
        alert('El número de teléfono móvil debe contener exactamente 8 números.');
        return;
      }

      if (!telefonoCasa.match(/^[0-9]{8}$/)) {
        alert('El número de teléfono de su casa debe contener exactamente 8 números.');
        return;
      }
  
      if (!correoElectronico.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
        alert('El correo electrónico no es válido.');
        return;
      }

    navigation.navigate('SegundaPantalla', {
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
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Género:</Text>
      <Picker
        style={styles.picker}
        selectedValue={genero}
        onValueChange={(itemValue) => setGenero(itemValue)}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
      </Picker>

      <Text style={styles.label}>DUI:</Text>
      <TextInput
        style={styles.input}
        value={dui}
        onChangeText={setDui}
      />

      <Text style={styles.label}>NIT:</Text>
      <TextInput
        style={styles.input}
        value={nit}
        onChangeText={setNit}
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <Button title="Seleccionar Fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={Nacimiento}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Teléfono Móvil:</Text>
      <TextInput
        style={styles.input}
        value={telefonoMovil}
        onChangeText={setTelefonoMovil}
      />

      <Text style={styles.label}>Teléfono de Casa:</Text>
      <TextInput
        style={styles.input}
        value={telefonoCasa}
        onChangeText={setTelefonoCasa}
      />

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />

      <Button style={styles.button} title="Guardar" onPress={handleGuardar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default PrimeraPantalla;