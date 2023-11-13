import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Equipos = () => {
  const navigation = useNavigation();

  const user = auth().currentUser;
  const uid = user.uid;

  const [formData, setFormData] = useState(defaultFormValues());
  const [loading, setLoading] = useState(true); // Activar la carga en el montaje de componentes
  const [listEquipos, setListEquipos] = useState([]); // Matriz inicial vacía de lista equipos
  const [errorEquipo, setErrorEquipo] = useState("");
  const [errorCarnet, setErrorCarnet] = useState("");
  const [errorEstudiante, setErrorEstudiante] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorGenero, setErrorGenero] = useState("");
  const [errorPosicion, setErrorPosicion] = useState("");
  const [errorNCamisa, setErrorNCamisa] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection("Equipos")
      .where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const listEquipos = [];

        querySnapshot.forEach((documentSnapshot) => {
          listEquipos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setListEquipos(listEquipos);
        setLoading(false);
      });

    // Cancelar la suscripción a eventos cuando ya no se utilicen
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const save = () => {
    if (!validateData()) {
      return;
    }

    // Obtener una referencia al documento con el ID igual al nombre del equipo
    const equipoRef = firestore().collection("Equipos").doc(formData.equipo);

    // Obtener una referencia a la colección con el nombre "Jugadores"
    const jugadoresRef = equipoRef.collection("Jugadores");

    // Asignar los datos al documento en la colección "Jugadores" con el ID igual al nombre del estudiante
    jugadoresRef.doc(formData.estudiante).set({
      Carnet: formData.carnet,
      Estudiante: formData.estudiante,
      Fecha: formData.fecha,
      Genero: formData.genero,
      Posicion: formData.posicion,
      Ncamisa: formData.nCamisa,
      userId: uid,
    });
    Alert.alert("Se ha agregado exitosamente su jugador");
    navigation.navigate("Equipos");
  };

  const validateData = () => {
    setErrorEquipo("");
    setErrorCarnet("");
    setErrorEstudiante("");
    setErrorFecha("");
    setErrorGenero("");
    setErrorPosicion("");
    setErrorNCamisa("");
    let isValid = true;

    if (!formData.equipo.match(/^[A-Za-z]+$/)) {
      setErrorEquipo("El nombre no es valido...");
      isValid = false;
    }
    if (!formData.carnet.match(/^[A-Za-z]{2}\d{6}$/)) {
      setErrorCarnet("El carnet no es valido...");
      isValid = false;
    }
    if (!formData.estudiante.match(/^[A-Za-z]+$/)) {
      setErrorEstudiante("El nombre debe llevar solo letras");
      isValid = false;
    }
    if (formData.fecha.length == 0) {
      setErrorFecha("La fecha no debe estar vacia...");
      isValid = false;
    }
    if (!formData.genero.match(/^(Masculino|masculino|Femenino|femenino)$/)) {
      setErrorGenero("El genero debe ser valido");
      isValid = false;
    }
    if (!formData.posicion.match(/^[A-Za-z]+$/)) {
      setErrorPosicion("La posicion debe llevar solo letras");
      isValid = false;
    }
    if (!formData.nCamisa.match(/^[0-9]+$/)) {
      setErrorNCamisa("El numero de camisa debe llevar solo numeros");
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tittlesection}>
        <Text style={styles.title}>Equipos Inscritos</Text>
      </View>
      <FlatList
        style={{
          height: 100,
          borderWidth: 3,
          borderColor: "#64748B",
          shadowOpacity: 1,
          borderRadius:5
        }}
        data={listEquipos}
        renderItem={({ item }) => (
          <View
            style={{
              height: 25,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue" }}>
              Equipo: {item.nombre}
            </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ScrollView>
        <View style={styles.tittlesection}>
          <Text style={styles.title}>Agregar Jugadores</Text>
        </View>
        <View style={styles.inputsection}>
          <View>
            <Text style={styles.InputTittle}>Equipo a agregar jugadores:</Text>
            <Input
              placeholder="Ingresa el nombre del equipo..."
              onChange={(e) => onChange(e, "equipo")}
              style={styles.input}
              errorMessage={errorEquipo}
              defaultValue={formData.equipo}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Carnet:</Text>
            <Input
              placeholder="Ingresa el Carnet..."
              onChange={(e) => onChange(e, "carnet")}
              style={styles.input}
              errorMessage={errorCarnet}
              defaultValue={formData.carnet}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Nombre y Apellido:</Text>
            <Input
              placeholder="Ingresa tu nombre y apellido..."
              onChange={(e) => onChange(e, "estudiante")}
              style={styles.input}
              errorMessage={errorEstudiante}
              defaultValue={formData.estudiante}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Fecha de nacimiento:</Text>
            <Input
              placeholder="Ingresa tu fecha de nacimiento..."
              onChange={(e) => onChange(e, "fecha")}
              style={styles.input}
              errorMessage={errorFecha}
              defaultValue={formData.fecha}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>
              Genero (masculino o femenino):
            </Text>
            <Input
              placeholder="Ingresa tu genero..."
              onChange={(e) => onChange(e, "genero")}
              style={styles.input}
              errorMessage={errorGenero}
              defaultValue={formData.genero}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Posicion en el equipo:</Text>
            <Input
              placeholder="Ingresa tu posicion..."
              onChange={(e) => onChange(e, "posicion")}
              style={styles.input}
              errorMessage={errorPosicion}
              defaultValue={formData.posicion}
              inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
            />
          </View>
          <View>
            <Text style={styles.InputTittle}>Numero de camisa:</Text>
            <Input
              placeholder="Ingresa tu numero de camisa..."
              onChange={(e) => onChange(e, "nCamisa")}
              style={styles.input}
              errorMessage={errorNCamisa}
              defaultValue={formData.nCamisa}
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
        </View>
      </ScrollView>
    </View>
  );
};

const defaultFormValues = () => {
  return {
    equipo: "",
    carnet: "",
    estudiante: "",
    fecha: "",
    genero: "",
    posicion: "",
    nCamisa: "",
  };
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

export default Equipos;
