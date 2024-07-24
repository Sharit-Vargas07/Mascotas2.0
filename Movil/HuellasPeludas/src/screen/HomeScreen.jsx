import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import logo from '../assets/logoperro.png'

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bienvenido a Huellas peludas.</Text>
      <Text style={styles.subTitle}>
        Haz del mundo un lugar más feliz, adopta.
      </Text>
      <Image source={require('../assets/logoperro.png')} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper1,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Inicio de Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 250,
    width: 250,
    marginTop:40,
  marginBottom:100
  },

  title: {
    fontSize: 40,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    width: "80%",
    height: 60,
    borderRadius: 100,
    borderColor:"#424242"
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonWrapper1: {
    justifyContent: "center",
    alignItems: "center",
    width: "55%",
    borderRadius: 50,
    backgroundColor:"#FF5722",
  },
  loginButtonText: {
    fontSize: 18,
    color:"#FDFEFE"

  },
  signupButtonText: {
    fontSize: 18,
  },
});