import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

//login con firebase
import auth from "@react-native-firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const handleSignIn = async () => {
    if (!validateData()) {
      return;
    }

    const SignInFirebase = async (email, password) => {
      const result = { statusResponseL: true, error: null };
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert("BIENVENIDO","logeado exitosamente: " + email);
          navigation.navigate("Inicio");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-login") {
              Alert.alert("ERROR","El correo Electrónico o Contraseña son incorrectos!")
          }
          if (error.code === "auth/invalid-email") {
            Alert.alert("ERROR","El correo Electrónico no es válido!")
          }
          console.error(error);
        });
        
      return result;
    };

    const result = await SignInFirebase(formData.email, formData.password);
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (formData.email.length == 0) {
      setErrorEmail("Debes ingresar un correo electronico");
      isValid = false;
    }
    if (formData.password.length == 0) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tittlesection}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>

      <View style={styles.inputsection}>
        <View >
          <Text style={styles.InputTittle}>Correo Electrónico:</Text>
          <Input
            placeholder="Ingresa tu Correo Electrónico..."
            onChange={(e) => onChange(e, "email")}
            style={styles.input}
            keyboardType="email-address"
            errorMessage={errorEmail}
            defaultValue={formData.email}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
        <View >
          <Text style={styles.InputTittle}>Contraseña:</Text>
          <Input
            placeholder="Ingresa tu Contraseña..."
            onChange={(e) => onChange(e, "password")}
            secureTextEntry
            style={styles.input}
            errorMessage={errorPassword}
            defaultValue={formData.password}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
      </View>

      <View style={styles.bottonSection}>
        <TouchableOpacity style={[styles.buttonLogin]} onPress={handleSignIn}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.buttonregister}>
            ¿No tienes una cuenta? Registrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const defaultFormValues = () => {
  return { email: "", password: "" };
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
    marginTop:10,
    width: "95%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9181F2",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonLoginGoogle: {
    width: "95%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4285f4",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonregister: {
    textAlign: "center",
    color: "#27374D",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderColor: "#64748B",
    shadowOpacity: 1,
    borderRadius: 5,
    fontSize: 14,
  },
  InputTittle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default LoginScreen;
