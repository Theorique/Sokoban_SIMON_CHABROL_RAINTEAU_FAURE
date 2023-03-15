import { StatusBar } from "expo-status-bar";
import React, { Component, useDebugValue, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { plateau: ["ok"], joueur: null };
  }

  componentDidMount() {
    const customData = require("./plateau/plateau-dur.json");
    let temp = customData["text"].split("\n");
    let plat = [];
    temp.map((value, key) => {
      let ligne = value.split("");
      const dataWithKeys = ligne.map((item, key2) => {
        id = key * 9 + key2;
        return { ...item, key: id };
      });
      plat[key] = dataWithKeys;
    });
    this.setState({ plateau: plat });
  }
  handleOnPress(key) {
    console.log("La clé de l'élément est :", ((key / 9) >> 0) + " " + this.state.plateau[(key/9) >> 0]);
    const item = this.state.plateau[(key/9) >> 0].find((item)=> item.key === key);
    console.log(item[0]);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.plateau["text"]}</Text>
        <FlatList
          data={this.state.plateau}
          numColumns={1}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={(item) => (
            <FlatList
              data={item.item}
              numColumns={9}
              keyExtractor={(item2, index2) => `${item.id}*9+${index2}`}
              renderItem={({ item: item2 }) => (
                <Text
                  onPress={() => this.handleOnPress(item2.key)}
                  style={styles.grid}
                >
                  {item2[0]}
                </Text>
              )}
            />
          )}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  grid: {
    width: 13,
  },
});
