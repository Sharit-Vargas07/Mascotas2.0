import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrimeraScreen from "./PrimeraScreen.js";

import HomeScreen from "./src/screen/HomeScreen";
import InicioSesion from "./src/screen/InicioSesion";
import Registro from "./src/screen/RegistroScreen";
import Listar from './src/screen/ListarScreen';
import Mostrar from './src/screen/ListarMascota';
import FormularioMascota from "./src/screen/Formulario";
import ListarMascota from "./src/screen/ListarMascota";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isShowSplash ? (
          <Stack.Screen
            name="Splash"
            component={PrimeraScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name={"HOME"} component={HomeScreen} />
            <Stack.Screen name={"LOGIN"} component={InicioSesion} />
            <Stack.Screen name="SIGNUP" component={Registro} />
            <Stack.Screen name="LISTAR" component={Listar} />
            <Stack.Screen name="VERMASCOTA" component={Mostrar} />
            <Stack.Screen name="RegistroMascota" component={FormularioMascota} />
            <Stack.Screen name="ListarMascota" component={ListarMascota} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

