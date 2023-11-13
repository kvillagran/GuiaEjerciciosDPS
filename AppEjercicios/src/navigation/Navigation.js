import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ConsultandoIP from "../../screens/IPScreen";
import ImplementandoIpRest from "../../screens/ApiRest";
import ClinicaAmaya from "../../screens/DrAmaya";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";
import HomeScreenUser from "../../screens/HomeUser";
import InfoPaciente from "../../screens/InfoPaciente";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Equipos from "../../screens/FormEquipos";

const LogStack = createNativeStackNavigator();

export default function LoginNavigation() {
  return (
    <LogStack.Navigator screenOptions={{ headerShown: false }}>
      <LogStack.Screen name="LoginHome" component={HomeScreenUser} />
      <LogStack.Screen name="Login" component={LoginScreen} />
      <LogStack.Screen name="Registro" component={RegisterScreen} />
      <LogStack.Screen name="Inicio" component={AppTabs} />
    </LogStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dr. Amaya"
        component={ClinicaNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hospital-user" color={'#9181F2'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Consultando IP"
        component={IPNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="flag-usa" color={'#9181F2'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="ApiRest"
        component={RESTNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football" color={'#9181F2'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ClinicaNavigation() {
  return (
    <LogStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9181F2",
          height: 60,
        },
      }}
    >
      <LogStack.Screen name="Clinica Dr. Amaya" component={ClinicaAmaya} />
      <LogStack.Screen
        name="Información del Paciente"
        component={InfoPaciente}
      />
    </LogStack.Navigator>
  );
}

function IPNavigation() {
  return (
    <LogStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9181F2",
          height: 60,
        },
      }}
    >
      <LogStack.Screen name="Consultar IP" component={ConsultandoIP} />
    </LogStack.Navigator>
  );
}

function RESTNavigation() {
  return (
    <LogStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9181F2",
          height: 60,
        },
      }}
    >
      <LogStack.Screen
        name="Implementando ApiRest"
        component={ImplementandoIpRest}
      />
      <LogStack.Screen
        name="Equipos"
        component={Equipos}
      />
    </LogStack.Navigator>
  );
}
