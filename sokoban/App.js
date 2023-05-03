import { StatusBar } from "expo-status-bar";
import React, { Component, useDebugValue, useState } from "react";
import Accueil from "./pages/Accueil";
import Partie from "./pages/Partie";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen
              name="Partie"
              component={Partie}
              options={{ title: "Partie" }}
            />
            <Stack.Screen name="Accueil" component={Accueil} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

export default App;
