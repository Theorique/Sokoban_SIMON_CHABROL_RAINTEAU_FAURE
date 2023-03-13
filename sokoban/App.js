import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { plateau: ["ok"] };
  }

  componentDidMount() {
    const customData = require("./plateau/plateau-dur.json");
    console.log(customData);
    let temp = customData["text"].split("\n");
    let plat = [];
    temp.map((value, key) => (plat[key] = value.split("")));
    console.log(plat);
    console.log(temp);
    this.setState({ plateau: plat });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.plateau["text"]}</Text>
        <FlatList
          data={this.state.plateau}
          numColumns={1}
          renderItem={({ item }) => (
            <FlatList
              data={item}
              numColumns={9}
              keyExtractor={(item2, index) => index.toString()}
              renderItem={({ item: item2 }) => <Text style={styles.grid}>{item2}</Text>}
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
  grid:{
    width:13,
  }
});
