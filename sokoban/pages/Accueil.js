import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
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
  SafeAreaView
} from "react-native";
import { Picker } from "@react-native-picker/picker";

class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = { niveau: [] };
  }

  componentDidMount() {

    //charger les plateaux avec une requete API puis foutre les titres dans un state ->
    //passer le titre en parametre dans les boutons
    this.request();

  }

  request() {
    const ip = require('../configAPI.json')['ip'];
    fetch("http://" + ip + ":3001/boards")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ niveau: data })
      })
      .catch((err) => {
      });

  }


  render() {
    const { navigation } = this.props;
    var listNiv = [];
    this.state.niveau.map((board) => {
      listNiv.push(<Picker.Item label={board.name} value={board.board_id} key={board.board_id} />);
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() =>
          navigation.navigate('Partie', { boardID: this.state.niveauChoisi })
        }>
          <Text style={styles.textButton}>CHARGER LE DERNIER NIVEAU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>
          navigation.navigate('Admin', { name: 'Admin' })
        }>
          <Text style={styles.textButton}>ADMIN</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={this.state.niveauChoisi}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ niveauChoisi: itemValue })}
        >
          {listNiv}
        </Picker>
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
