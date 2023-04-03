import {StatusBar} from "expo-status-bar";
import React, {Component, useDebugValue, useState} from "react";
import {StyleSheet, Text, View, FlatList, SafeAreaView} from "react-native";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {plateau: ["ok"], joueur: null, playerPos: 0, cibles: []};
    }

    componentDidMount() {
        const customData = require("./plateau/plateau-dur.json");
        let temp = customData["text"].split("\n");
        let cible = [];
        let plat = [];
        temp.map((value, key) => {
            let ligne = value.split("");
            const dataWithKeys = ligne.map((item, key2) => {
                id = key * 9 + key2;
                if (item === "P") {
                    this.setState({playerPos: id});
                }
                if (item === "x") {
                    cible.push(id);
                }
                return {...item, key: id};
            });
            plat[key] = dataWithKeys;
        });
        this.setState({plateau: plat, cibles: cible});
    }

    findWithId(id, tab) {
        return tab[(id / 9) >> 0].find((item) => item.key === id);
    }

    checkTarget() {
        let win = true;
        let tab = this.state.plateau;
        this.state.cibles.map((item) => {
            if (this.findWithId(item, tab)[0] !== "C") {
                win = false;
            }
            if (this.findWithId(item, tab)[0] === ".") {
                this.findWithId(item, tab)[0] = "x";
            }
        });
        this.setState({plateau: tab});
        if (win) {
            console.log("Vous avez gagné");
        }
    }

    move(direction) {
        let tab = this.state.plateau;
        let p = this.state.playerPos;
        let devant = this.findWithId(p + direction, this.state.plateau)[0];
        if (devant === "." || devant === "x") {
            this.findWithId(p + direction, tab)[0] = "P";
            this.findWithId(p, tab)[0] = ".";
            this.setState({plateau: tab, playerPos: p + direction});
        } else if (
            devant === "C" &&
            (this.findWithId(p + 2 * direction, this.state.plateau)[0] === "." ||
                this.findWithId(p + 2 * direction, this.state.plateau)[0] === "x")
        ) {
            this.findWithId(p + direction, tab)[0] = "P";
            this.findWithId(p + 2 * direction, tab)[0] = "C";
            this.findWithId(p, tab)[0] = ".";
            this.setState({plateau: tab, playerPos: p + direction});
        }
        this.checkTarget();
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
                            renderItem={({item: item2}) => (
                                <Text style={styles.grid}>{item2[0]}</Text>
                            )}
                        />
                    )}
                />
                <Text onPress={() => this.move(-9)} style={styles.up}>
                    up
                </Text>
                <Text onPress={() => this.move(1)} style={styles.right}>
                    right
                </Text>
                <Text onPress={() => this.move(9)} style={styles.down}>
                    down
                </Text>
                <Text onPress={() => this.move(-1)} style={styles.left}>
                    left
                </Text>
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