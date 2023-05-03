import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
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
    this.state = { titres: [], plateaux: [] };
  }

  componentDidMount() {
    //CHARGER LES FICHIERS ET LIRE LES NOMS DES FICHIERS POUR LES PLATEAUX
    this.loadListe();
  }
  loadListe() {
    const titre = {};
    for (const file of this.state.plateaux) {
        console.log(file);
        const chemin = "../plateau/plateau-1.json";
        console.log(chemin);
      titre[file] = require("../plateau/plateau-1.json")["titre"];
    }
    this.setState({ titres: titre });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <FlatList
          keyExtractor={(item) => item}
          data={this.state.plateaux}
          numColumns={1}
          renderItem={(item) => (
            <Button
              title={this.state.plateaux[item]}
              onPress={() => navigation.navigate("Partie", { name: item })}
            ></Button>
          )}
        ></FlatList>
      </View>
    );
  }
}

export default Accueil;
