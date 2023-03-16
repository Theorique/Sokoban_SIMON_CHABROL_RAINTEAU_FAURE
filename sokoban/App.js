import { StatusBar } from "expo-status-bar";
import React, { Component, useDebugValue, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { plateau: ["ok"], joueur: null, playerPos: 0 };
  }

  componentDidMount() {
    const customData = require("./plateau/plateau-dur.json");
    let temp = customData["text"].split("\n");
    let plat = [];
    temp.map((value, key) => {
      let ligne = value.split("");
      const dataWithKeys = ligne.map((item, key2) => {
        id = key * 9 + key2;
        if (item === "P") {
          this.setState({ playerPos: id });
        }
        return { ...item, key: id };
      });
      plat[key] = dataWithKeys;
    });
    this.setState({ plateau: plat });
  }
  handleOnPress(key) {
    console.log(
      "La clé de l'élément est :",
      ((key / 9) >> 0) + " " + this.state.plateau[(key / 9) >> 0]
    );
    const item = this.state.plateau[(key / 9) >> 0].find(
      (item) => item.key === key
    );
    console.log(item[0]);
  }
  findWithId(id, tab) {
    return tab[(id / 9) >> 0].find((item) => item.key === id);
  }
  moveUp() {
    let tab = this.state.plateau;
    let p = this.state.playerPos;
    if (
      p > 8 &&
      this.findWithId(p - 9, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p - 9, tab)[0] = "P";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p - 9 });
    } else if (
      p > 17 &&
      this.findWithId(p - 9, this.state.plateau)[0] ===
        "C" &&
      this.findWithId(p - 18, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p - 9, tab)[0] = "P";
      this.findWithId(p - 18, tab)[0] = "C";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p - 9 });
    }
  }
  moveRight() {
    let tab = this.state.plateau;
    let p = this.state.playerPos;
    if (
      (p%9) < 8 &&
      this.findWithId(p + 1, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p + 1, tab)[0] = "P";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p + 1 });
    } else if (
      (p%9) > 7 &&
      this.findWithId(p + 1, this.state.plateau)[0] ===
        "C" &&
      this.findWithId(p + 2, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p + 1, tab)[0] = "P";
      this.findWithId(p + 2, tab)[0] = "C";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p + 1 });
    }
  }
  moveLeft() {
    let tab = this.state.plateau;
    let p = this.state.playerPos;
    if (
      (p%9) > 0 &&
      this.findWithId(p - 1, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p - 1, tab)[0] = "P";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p - 1 });
    } else if (
      (p%9) > 1 &&
      this.findWithId(p - 1, this.state.plateau)[0] ===
        "C" &&
      this.findWithId(p - 2, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p - 1, tab)[0] = "P";
      this.findWithId(p - 2, tab)[0] = "C";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p - 1 });
    }
  }
  moveDown() {
    let tab = this.state.plateau;
    let p = this.state.playerPos;
    if (
      p < 45 &&
      this.findWithId(p + 9, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p + 9, tab)[0] = "P";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p + 9 });
    } else if (
      p < 36 &&
      this.findWithId(p + 9, this.state.plateau)[0] ===
        "C" &&
      this.findWithId(p + 18, this.state.plateau)[0] === "."
    ) {
      this.findWithId(p + 9, tab)[0] = "P";
      this.findWithId(p + 18, tab)[0] = "C";
      this.findWithId(p, tab)[0] = ".";
      this.setState({ plateau: tab, playerPos: p + 9 });
    }
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
        <Text onPress={() => this.moveUp()} style={styles.up}>
          up
        </Text>
        <Text onPress={() => this.moveRight()} style={styles.right}>
          right
        </Text>
        <Text onPress={() => this.moveDown()} style={styles.down}>down</Text>
        <Text onPress={() => this.moveLeft()} style={styles.left}>left</Text>
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
  arrow: {},
  up: {
    backgroundColor: "blue",
    color: "white",
    margin: 10,
    padding: 10,
  },
  right: {
    backgroundColor: "blue",
    color: "white",
    margin: 10,
    padding: 10,
  },
  down: {
    backgroundColor: "blue",
    color: "white",
    margin: 10,
    padding: 10,
  },
  left: {
    backgroundColor: "blue",
    color: "white",
    margin: 10,
    padding: 10,
  },
});
