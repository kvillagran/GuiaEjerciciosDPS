import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ClinicaAmaya = () => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [dui, setDui] = useState("");
  const [nit, setNit] = useState("");
  const [direccion, setDireccion] = useState("");
  const [Nacimiento, setNacimiento] = useState(new Date());
  const [telefonoMovil, setTelefonoMovil] = useState("");
  const [telefonoCasa, setTelefonoCasa] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
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
      alert("El nombre y el apellido deben contener solo letras.");
      return;
    }

    if (!dui.match(/^[0-9]{8}-[0-9]$/)) {
      alert("El DUI debe tener el formato 00000000-0.");
      return;
    }

    if (!nit.match(/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/)) {
      alert("El NIT debe tener el formato 0000-000000-000-0.");
      return;
    }

    if (!telefonoMovil.match(/^[0-9]{8}$/)) {
      alert("El número de teléfono móvil debe contener exactamente 8 números.");
      return;
    }

    if (!telefonoCasa.match(/^[0-9]{8}$/)) {
      alert(
        "El número de teléfono de su casa debe contener exactamente 8 números."
      );
      return;
    }

    if (!correoElectronico.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    navigation.navigate("Información del Paciente", {
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
      <View style={{alignSelf:'center'}}>
      <Text style={styles.title}>Formulario Paciente</Text>
      </View>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        placeholder="Ingresa tu Nombre..."
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        placeholder="Ingresa tu Apellido..."
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
        placeholder="Ingresa tu DUI, Ejemplo: 00000000-0"
        style={styles.input}
        value={dui}
        onChangeText={setDui}
      />

      <Text style={styles.label}>NIT:</Text>
      <TextInput
        placeholder="Ingresa tu NIT, Ejemplo: 0000-00000-000-0"
        style={styles.input}
        value={nit}
        onChangeText={setNit}
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        placeholder="Ingresa tu dirección..."
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <TouchableOpacity style={[styles.buttonLogin]} onPress={showDatePicker}>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
          Seleccionar Fecha
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={Nacimiento}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Teléfono Móvil:</Text>
      <TextInput
        placeholder="Ingresa tu Número Móvil..."
        style={styles.input}
        value={telefonoMovil}
        onChangeText={setTelefonoMovil}
      />

      <Text style={styles.label}>Teléfono de Casa:</Text>
      <TextInput
        placeholder="Ingresa tu Número de casa..."
        style={styles.input}
        value={telefonoCasa}
        onChangeText={setTelefonoCasa}
      />

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        placeholder="Ingresa tu correo electrónico..."
        style={styles.input}
        value={correoElectronico}
        onChangeText={setCorreoElectronico}
      />

      <TouchableOpacity style={[styles.buttonLogin]} onPress={handleGuardar}>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
          Guardar
        </Text>
      </TouchableOpacity>
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
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderColor: "#64748B",
    shadowOpacity: 1,
    borderRadius: 5,
    fontSize: 14,
    marginBottom: 15,
  },
  picker: {
    marginBottom: 16,
  },
  buttonLogin: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9181F2",
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default ClinicaAmaya;
