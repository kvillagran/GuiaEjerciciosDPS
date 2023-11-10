// Importar los componentes necesarios de React Native
import React from 'react';
import { View, Text, TextInput, Button, Image, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear un componente de clase llamado IPScreen
class IPScreen extends React.Component {
  // En el constructor de la clase, inicializar el estado
  constructor(props) {
    super(props);
    this.state = {
      ip: '', // Almacenar el valor del TextInput
      data: null, // Almacenar el objeto con los datos de la API
      loading: false, // Indicar si se está realizando una petición a la API
      history: [] // Almacenar un arreglo con las consultas realizadas
    };
  }

  // Crear un método para validar el formato de la dirección IP
  validateIP(ip) {
    // Usar una expresión regular para validar el formato
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  }

  // Crear un método para obtener los datos de la API
  fetchData(ip) {
    // Cambiar el estado de loading a true
    this.setState({ loading: true });
    // Realizar una petición GET a la API con el formato adecuado
    fetch(`https://ipwhois.io/json/${ip}`)
      .then(response => response.json()) // Convertir la respuesta a un objeto JSON
      .then(data => {
        if (data.success) { // Si la respuesta tiene una propiedad success con valor true
          // Actualizar el estado de data con el objeto JSON
          this.setState({ data: data });
          // Agregar la consulta al arreglo de history
          this.setState(prevState => ({
            history: [...prevState.history, data]
          }));
          // Guardar el arreglo de history en el almacenamiento local con la clave ip_history
          AsyncStorage.setItem('ip_history', JSON.stringify(this.state.history));
        } else { // Si la respuesta tiene una propiedad success con valor false
          // Mostrar una alerta con el mensaje de error
          Alert.alert('Error', data.message);
        }
      })
      .catch(error => { // Si ocurre algún error en la petición
        // Mostrar una alerta con el mensaje de error
        Alert.alert('Error', error.message);
      })
      .finally(() => { // Al finalizar la petición
        // Cambiar el estado de loading a false
        this.setState({ loading: false });
      });
  }

  // Crear un método para borrar los datos del estado y del almacenamiento local
  clearData() {
    // Usar el método setState para asignar un valor vacío a las propiedades ip, data y history
    this.setState({
      ip: '',
      data: null,
      history: []
    });
    // Usar el método AsyncStorage.removeItem para eliminar el elemento con la clave ip_history
    AsyncStorage.removeItem('ip_history');
  }

  // Crear un método que se ejecute cuando el componente se monte en el árbol de renderizado
  componentDidMount() {
    // Usar el método AsyncStorage.getItem para obtener el elemento con la clave ip_history
    AsyncStorage.getItem('ip_history')
      .then(value => { // Si el elemento existe
        if (value) {
          // Actualizar el estado de history con el valor del elemento, que debe ser un arreglo de consultas
          this.setState({ history: JSON.parse(value) });
        }
      })
      .catch(error => { // Si ocurre algún error al obtener el elemento
        // Mostrar una alerta con el mensaje de error
        Alert.alert('Error', error.message);
      });
  }

  // Crear un método para devolver el elemento JSX que se mostrará en la pantalla
  render() {
    // Usar los componentes de React Native para crear la interfaz gráfica
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Consultando IP</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese una dirección IP"
          value={this.state.ip}
          onChangeText={text => this.setState({ ip: text })}
        />
        <Button
          title="Consultar"
          onPress={() => {
            if (this.validateIP(this.state.ip)) {
              this.fetchData(this.state.ip);
            } else {
              Alert.alert('Error', 'Formato de IP inválido');
            }
          }}
        />
        <Button
          title="Eliminar"
          onPress={() => this.clearData()}
        />
        <FlatList
          data={this.state.history}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>IP: {item.ip}</Text>
              <Text>Tipo de IP: {item.type}</Text>
              <Text>Continente: {item.continent}</Text>
              <Text>País: {item.country}</Text>
              <Text>Código de País: {item.country_code}</Text>
              <Text>Región: {item.region}</Text>
              <Text>Ciudad: {item.city}</Text>
              <Text>Capital: {item.country_capital}</Text>
              <Image
                style={styles.flag}
                source={{ uri: item.country_flag }}
              />
              <Text>Hora actual: {item.time_zone.current_time}</Text>
              <Text>Datos de conexión: {item.org}, {item.isp}, {item.domain}</Text>
            </View>
          )}
          keyExtractor={item => item.ip}
        />
      </View>
    );
  }
}

// Exportar el componente IPScreen
export default IPScreen;

// Definir los estilos para la pantalla
const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  flag: {
    width: 50,
    height: 30,
    margin: 10
  }
};