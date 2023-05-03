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
    const { navigation } = this.props;
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() =>
              navigation.navigate('Partie', {name: 'Partie'})
          }>
            <Text style={styles.textButton}>CHARGER LE DERNIER NIVEAU</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>
              navigation.navigate('Admin', {name: 'Admin'})
          }>
            <Text style={styles.textButton}>ADMIN</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default Accueil;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: "#5D7DFC",
        width: 250,
        alignItems: "center",
        borderRadius: 10
    },
    textButton: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    }
});
