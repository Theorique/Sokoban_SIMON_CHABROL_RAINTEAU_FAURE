import { StatusBar } from "expo-status-bar";
import React, { Component, useDebugValue, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";

class Accueil extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props;
    return (
        <Button
          title="Partie"
          onPress={() =>
            navigation.navigate('Partie', {name: 'Partie'})
          }
        />
    );
  }
}

export default Accueil;
