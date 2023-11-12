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
      <Tab.Screen name="Dr. Amaya" component={ClinicaNavigation} />
      <Tab.Screen name="Consultando IP" component={IPNavigation} />
      <Tab.Screen name="ApiRest" component={RESTNavigation} />
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
    </LogStack.Navigator>
  );
}
