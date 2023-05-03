import { StatusBar } from "expo-status-bar";
import React, { Component }from "react";
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
    this.state = { titres: null, plateaux: ["plateau-1.json", "plateau-2.json"] };
  }

  componentDidMount() {
    //charger les plateaux avec une requete API puis foutre les titres dans un state ->
    //passer le titre en parametre dans les boutons
    this.loadListe();
  }
  loadListe() {
    const titre = {};
      titre["plateau-1.json"] = require("../plateau/plateau-1.json")["Titre"];
      titre["plateau-2.json"] = require("../plateau/plateau-2.json")["Titre"];
    this.setState({ titres: titre });
  }

  render() {
    if (!this.state.titres || !this.state.plateaux) {
      return null; // Ou peut-être vous pouvez afficher un indicateur de chargement ici
    }
    const { navigation } = this.props;
    return (
      <View>
        <FlatList
          keyExtractor={(item) => item}
          data={this.state.plateaux}
          numColumns={1}
          renderItem={({item}) => (
            <Button
              title={this.state.titres[item] + ""}
              onPress={() => navigation.navigate("Partie", { name: item })}
            ></Button>
          )}
        ></FlatList>
      </View>
    );
  }
}

export default Accueil;
