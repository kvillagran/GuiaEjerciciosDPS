
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrimeraPantalla from './components/PrimeraPantalla';
import SegundaPantalla from './components/SegundaPantalla';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PrimeraPantalla" component={PrimeraPantalla} />
        <Stack.Screen name="SegundaPantalla" component={SegundaPantalla} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
