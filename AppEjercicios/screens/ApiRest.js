import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ImplementandoIpRest = () => {
  const navigation = useNavigation();

  const user = auth().currentUser;
  const uid = user.uid;

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorNombre, setErrorNombre] = useState("");
  const [errorFacultad, setErrorFacultad] = useState("");
  const [errorCiclo, setErrorCiclo] = useState("");
  const [errorTorneo, setErrorTorneo] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const save = () => {
    if (!validateData()) {
      return;
    }
    // Obtener una referencia al documento con el ID igual al nombre del equipo
    const equipoRef = firestore().collection("Equipos").doc(formData.nombre);
    // Asignar los datos al documento
    equipoRef.set({
      nombre: formData.nombre,
      facultad: formData.facultad,
      ciclo: formData.ciclo,
      torneo: formData.torneo,
      userId: uid,
    });
  
    Alert.alert("Se ha agregado exitosamente su Equipo");
    navigation.navigate("Equipos");
  };

  const validateData = () => {
    setErrorNombre("");
    setErrorFacultad("");
    setErrorCiclo("");
    setErrorTorneo("");
    let isValid = true;

    if (!formData.nombre.match(/^[A-Za-z]+$/)) {
      setErrorNombre("El nombre del equipo debe llevar solo letras");
      isValid = false;
    }
    if (!formData.facultad.match(/^[A-Za-z]+$/)) {
      setErrorFacultad("La facultad debe llevar solo letras");
      isValid = false;
    }
    if (!formData.torneo.match(/^(Masculino|masculino|Femenino|femenino)$/)) {
      setErrorTorneo("El campo Torneo debe ser Masculino o Femenino");
      isValid = false;
    }
    if (formData.ciclo.length == 0) {
      setErrorCiclo("El campo de año y ciclo no puede estar vacio.");
      isValid = false;
    }
    return isValid;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.tittlesection}>
          <Text style={styles.title}>Registra tu equipo</Text>
        </View>
        <View style={styles.inputsection}>
          <View>
            <Text style={styles.InputTittle}>Nombre del equipo:</Text>
            <Input
              placeholder="Ingresa el nombre de tu equipo..."
              onChange={(e) => onChange(e, "nombre")}
              style={styles.input}
              errorMessage={errorNombre}
              defaultValue={formData.nombre}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Facultad del equipo:</Text>
            <Input
              placeholder="Ingresa la facultad de tu equipo..."
              onChange={(e) => onChange(e, "facultad")}
              style={styles.input}
              errorMessage={errorFacultad}
              defaultValue={formData.facultad}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Año y ciclo de inscripción:</Text>
            <Input
              placeholder="Ingresa el año y el ciclo..."
              onChange={(e) => onChange(e, "ciclo")}
              style={styles.input}
              errorMessage={errorCiclo}
              defaultValue={formData.ciclo}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>
              Torneo que participara (masculino o femenino):
            </Text>
            <Input
              placeholder="Ingresa en que torneo participará..."
              onChange={(e) => onChange(e, "torneo")}
              style={styles.input}
              errorMessage={errorTorneo}
              defaultValue={formData.torneo}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
        </View>
        <View style={styles.bottonSection}>
          <TouchableOpacity style={[styles.buttonLogin]} onPress={save}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Agregar Equipo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonLogin]}
            onPress={() => navigation.navigate("Equipos")}
          >
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Equipos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const defaultFormValues = () => {
  return { nombre: "", facultad: "", ciclo: "", torneo: "" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 8,
  },
  tittlesection: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsection: {
    justifyContent: "space-between",
  },
  bottonSection: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonLogin: {
    width: "95%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9181F2",
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderColor: "#64748B",
    shadowOpacity: 1,
    borderRadius: 5,
    fontSize: 14,
  },
  buttonlogin: {
    textAlign: "center",
    color: "#27374D",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  InputTittle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ImplementandoIpRest;
