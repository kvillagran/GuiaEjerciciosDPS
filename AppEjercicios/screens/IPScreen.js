import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios"; //petición a la API
import validator from "validator"; // para validar el formato de la IP
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "@ip_history"; // clave del historial

const ConsultandoIP = () => {
  const [ip, setIp] = useState(""); 
  const [data, setData] = useState(null); // respuesta de la API
  const [error, setError] = useState(null); 
  const [history, setHistory] = useState([]); 

  useEffect(() => {
    // obtener el historial cuando el componente se monta
    setHistory(getHistory());
  }, []);

  const getIPInfo = () => {
    // validar el formato de la IP
    if (validator.isIP(ip)) {
      // hacer la petición a la API
      axios
        .get(`https://ipwho.is/${ip}`)
        .then((response) => {
          // guardar la respuesta en el estado data
          setData(response.data);
          setError(null);
          // guardar la consulta en el historial
          saveToHistory(ip, response.data);
        })
        .catch((err) => {
          // guardar el mensaje de error en el estado error
          setError(err.message);
          setData(null);
        });
    } else {
      // guardar el mensaje de error en el estado error
      setError("La IP ingresada no tiene un formato válido");
      setData(null);
    }
  };

  const saveToHistory = async (ip, data) => {
    // guardar la consulta actual en el historial
    try {
      // obtener el historial actual desde AsyncStorage
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      let historyArray = [];
      if (history) {
        historyArray = JSON.parse(history);
      }
      // crear un objeto con la IP y los demás datos que quieres mostrar
      const ipInfo = {
        ip: ip,
        type: data.type,
        continent: data.continent,
        country: data.country,
        region: data.region,
        city: data.city,
        capital: data.capital,
      };
      // agregar el objeto al final del arreglo
      historyArray.push(ipInfo);
      // convertir el arreglo a una cadena de JSON
      const historyString = JSON.stringify(historyArray);
      // guardar el historial en AsyncStorage
      await AsyncStorage.setItem(HISTORY_KEY, historyString);
      // actualizar el estado del historial
      setHistory(historyArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getHistory = async () => {
    // obtener el historial desde AsyncStorage
    try {
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      let historyArray = [];
      if (history) {
        // convertir el historial a un arreglo de JavaScript
        historyArray = JSON.parse(history);
      }
      // devolver el arreglo del historial
      return historyArray;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const clearHistory = async () => {
    // borrar el historial desde AsyncStorage
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      // actualizar el estado del historial
      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.Screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Ingrese una dirección IP</Text>
          <TextInput
            style={styles.input}
            value={ip}
            onChangeText={(text) => setIp(text)}
            placeholder="Ingrese una dirección IP, Ejemplo: 8.8.8.8"
          />
          <TouchableOpacity onPress={getIPInfo} style={styles.button}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Consultar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {error && <Text style={styles.error}>{error}</Text>}
          {data && (
            <View style={styles.info}>
              <Image
                style={styles.flag}
                source={{ uri: data?.flag?.img }} //NO LA MUESTRA >:C
                resizeMode="contain"
              />
              <Text style={styles.title}>Informacion:</Text>
              <Text style={styles.label}>IP: {data.ip}</Text>
              <Text style={styles.label}>Tipo de IP: {data.type}</Text>
              <Text style={styles.label}>Continente: {data.continent}</Text>
              <Text style={styles.label}>País: {data.country}</Text>
              <Text style={styles.label}>
                Código de País: {data.country_code}
              </Text>
              <Text style={styles.label}>Región: {data.region}</Text>
              <Text style={styles.label}>Ciudad: {data.city}</Text>
              <Text style={styles.label}>Capital: {data.capital}</Text>
              <Text style={styles.label}>
                Hora actual: {data?.timezone?.current_time}
              </Text>
              <Text style={styles.label}>Datos de conexión:</Text>
              <Text style={styles.label}>
                Organización: {data?.connection?.org}
              </Text>
              <Text style={styles.label}>ISP: {data?.connection?.isp}</Text>
              <Text style={styles.label}>
                Dominio: {data?.connection?.domain}
              </Text>
            </View>
          )}
          <HistoryList
            history={history}
            setHistory={setHistory}
            clearHistory={clearHistory}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const HistoryList = ({ history, setHistory, clearHistory }) => {
  // componente para mostrar el historial
  return (
    <View style={styles.history}>
      <Text style={styles.title}>Historial de consultas</Text>
      {history.length > 0 ? (
        <>
          {history.map((ipInfo, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.label}>IP: {ipInfo.ip}</Text>
              <Text style={styles.label}>Tipo de IP: {ipInfo.type}</Text>
              <Text style={styles.label}>Continente: {ipInfo.continent}</Text>
              <Text style={styles.label}>País: {ipInfo.country}</Text>
              <Text style={styles.label}>Región: {ipInfo.region}</Text>
              <Text style={styles.label}>Ciudad: {ipInfo.city}</Text>
              <Text style={styles.label}>Capital: {ipInfo.capital}</Text>
            </View>
          ))}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={clearHistory} style={styles.button}>
              <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Borrar Historial</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.label}>No hay consultas anteriores</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor:'#fff'
  },
  header: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: "#cecece",
  },
  body: {
    margin: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cecece",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    width: "80%",
    padding: 8,
    marginVertical: 16,
    borderWidth: 3,
    borderColor: "#64748B",
    shadowOpacity: 1,
    borderRadius: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#9181F2",
    borderRadius: 5,
    padding: 10,
    width: "70%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  error: {
    color: "red",
    marginVertical: 16,
  },
  info: {
    width: "80%",
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
  },
  flag: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  history: {
    width: "80%",
    marginVertical: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
});

export default ConsultandoIP;
