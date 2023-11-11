import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../src/utils/validation";
import { Input } from "react-native-elements";
import auth from "@react-native-firebase/auth";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const handleCreateAccount = async () => {
    if (!validateData()) {
      return;
    }

    const CreateAccountFirebase = async (email, password) => {
      const result = { statusResponse: true, error: null };
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert("AVISO","Se ha registrado su cuenta correctamente.");
          navigation.navigate("Login")
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("AVISO","El correo Electrónico ya se encuentra registrado!")
          }
          console.error(error);
        });
      return result;
    };

    const result = await CreateAccountFirebase(
      formData.email,
      formData.password
    );
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirm("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresas un email válido.");
      isValid = false;
    }
    if (formData.password.length < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    if (formData.confirm.length < 6) {
      setErrorConfirm(
        "Debes ingresar una confirmación de contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    if (formData.password !== formData.confirm) {
      setErrorPassword("La contraseña y la confirmación no son iguales.");
      setErrorConfirm("La contraseña y la confirmación no son iguales.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tittlesection}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>Crear una cuenta</Text>
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
            inputContainerStyle={{ borderBottomWidth: 0, width: "100%" }}
          />
        </View>
        <View>
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
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.InputTittle}>Confirmar Contraseña:</Text>
          <Input
            placeholder="Confirma tu Contraseña..."
            onChange={(e) => onChange(e, "confirm")}
            secureTextEntry
            style={styles.input}
            errorMessage={errorConfirm}
            defaultValue={formData.confirm}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
      </View>
      <View style={styles.bottonSection}>
        <TouchableOpacity
          style={[styles.buttonLogin]}
          onPress={() => handleCreateAccount()}
        >
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonlogin}>
            ¿Ya tienes una cuenta? Ingresa aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
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

export default RegisterScreen;
