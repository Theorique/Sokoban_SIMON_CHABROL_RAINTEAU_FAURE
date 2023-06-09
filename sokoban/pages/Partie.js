import { StatusBar } from "expo-status-bar";
import React, { Component, useDebugValue, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Button,
    View,
    ImageBackground,
    FlatList,
    SafeAreaView, Alert,
} from "react-native";

class Partie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateau: ["ok"],

            playerPos: 0,
            cibles: [], tableau: {},
            win: false,
        };
    }

    componentDidMount() {
        this.request();
    }

    request() {
        const ip = require('../configAPI.json')['ip'];
        fetch("http://" + ip + ":3001/boards/" + this.props.route.params.boardID)

            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ tableau: data })
                this.loadBoard();
            })
            .catch((err) => {
                console.log("error", err.message);
            });

    }

    loadBoard() {
        this.setState({ win: false });
        let customData = this.state.tableau.result.text;
        let temp = customData.split("\n");
        let cible = [];
        let plat = [];
        temp.map((value, key) => {
            let ligne = value.split("");
            const dataWithKeys = ligne.map((item, key2) => {
                id = key * this.state.tableau.result.nbCols + key2;
                if (item === "P") {
                    this.setState({ playerPos: id });
                }
                if (item === "x") {
                    cible.push(id);
                }
                return { ...item, key: id };
            });
            plat[key] = dataWithKeys;
        });
        this.setState({ plateau: plat, cibles: cible });
    }

    findWithId(id, tab) {
        return tab[(id / this.state.tableau.result.nbCols) >> 0].find((item) => item.key === id);
    }

    checkTarget() {
        this.setState({ win: true });
        let tab = this.state.plateau;
        this.state.cibles.map((item) => {
            if (this.findWithId(item, tab)[0] !== "C") {
                this.setState({ win: false });
            }
            if (this.findWithId(item, tab)[0] === ".") {
                this.findWithId(item, tab)[0] = "x";
            }
        });
        this.setState({ plateau: tab });
        if (this.state.win) {
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
            this.setState({ plateau: tab, playerPos: p + direction });
        } else if (
            devant === "C" &&
            (this.findWithId(p + 2 * direction, this.state.plateau)[0] === "." ||
                this.findWithId(p + 2 * direction, this.state.plateau)[0] === "x")
        ) {
            this.findWithId(p + direction, tab)[0] = "P";
            this.findWithId(p + 2 * direction, tab)[0] = "C";
            this.findWithId(p, tab)[0] = ".";
            this.setState({ plateau: tab, playerPos: p + direction });
        }
        this.checkTarget();
    }

    render() {
        const { navigation } = this.props;
        if (this.state.tableau.result == undefined) {
            return (
                <View style={styles.container}>
                    <View style={styles.menuTop}>
                        <Text >
                            Partie en cours de chargement
                        </Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.menuTop}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.loadBoard()}>
                            <Image
                                source={require("../images/refresh.png")}
                                style={styles.refresh} />
                        </TouchableOpacity>
                    </View>
                    <Text>{this.state.plateau["text"]}</Text>
                    <FlatList
                        data={this.state.plateau}
                        numColumns={1}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={(item) => (
                            <FlatList
                                data={item.item}
                                numColumns={this.state.tableau.result.nbCols}
                                keyExtractor={(item2, index2) => `${item.id}*${this.state.tableau.result.nbCols}+${index2}`}
                                renderItem={({ item: item2 }) => {
                                    if (item2[0] === "#") {
                                        return (
                                            <ImageBackground
                                                source={require("../images/wall.png")}
                                                style={styles.wall}
                                            ></ImageBackground>
                                        );
                                    } else if (item2[0] === "P") {
                                        return (
                                            <ImageBackground
                                                source={require("../images/tile.png")}
                                                style={styles.wall}
                                            >
                                                <ImageBackground
                                                    source={require("../images/assasin.png")}
                                                    style={styles.wall}
                                                ></ImageBackground>
                                            </ImageBackground>
                                        );
                                    } else if (item2[0] === "C") {
                                        return (
                                            <ImageBackground
                                                source={require("../images/tile.png")}
                                                style={styles.wall}
                                            >
                                                <ImageBackground
                                                    source={require("../images/crate.png")}
                                                    style={styles.wall}
                                                ></ImageBackground>
                                            </ImageBackground>
                                        );
                                    } else if (item2[0] === "x") {
                                        return (
                                            <ImageBackground
                                                source={require("../images/tile.png")}
                                                style={styles.wall}
                                            >
                                                <ImageBackground
                                                    source={require("../images/target.png")}
                                                    style={styles.wall}
                                                ></ImageBackground>
                                            </ImageBackground>
                                        );
                                    } else if (item2[0] === ".") {
                                        return (
                                            <ImageBackground
                                                source={require("../images/tile.png")}
                                                style={styles.wall}
                                            ></ImageBackground>
                                        );
                                    } else {
                                        return <Text style={styles.grid}>{item2[0]}</Text>;
                                    }
                                }}
                            />
                        )}
                    />
                    <TouchableOpacity activeOpacity={1} onPress={() => this.move(-this.state.tableau.result.nbCols)}>
                        <Image source={require("../images/next.png")} style={styles.up} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.move(1)}>
                        <Image source={require("../images/next.png")} style={styles.right} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.move(this.state.tableau.result.nbCols)}>
                        <Image source={require("../images/next.png")} style={styles.down} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.move(-1)}>
                        <Image source={require("../images/next.png")} style={styles.left} />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default Partie;

const styles = StyleSheet.create({
    menuTop: {
        marginTop: 0,
        backgroundColor: "black",
        height: 60,
        width: "100%",
        position: "absolute",
        top: 0,
    },
    refresh: {
        position: "absolute",
        right: 0,
        transform: [{ scaleX: -1 }, { rotate: "30deg" }],
        width: 60,
        height: 60,
    },
    container: {
        paddingTop: 210,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    grid: {
        width: 30,
        height: 30,
        textAlign: "center",
    },
    wall: {
        width: 30,
        height: 30,
        backgroundImage: require("../images/wall.png"),
        resizeMode: "cover",
    },
    up: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -115,
        left: -20,
        width: 50,
        transform: [{ rotate: "270deg" }],
        height: 50,
        padding: 10,
    },
    right: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -175,
        width: 50,
        height: 50,
        left: 40,
        padding: 10,
    },
    down: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -235,
        width: 50,
        left: -20,
        transform: [{ rotate: "90deg" }],
        height: 50,
        padding: 10,
    },
    left: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -175,
        width: 50,
        transform: [{ scaleX: -1 }],
        height: 50,
        left: -80,
        padding: 10,
        zIndex: -1,
    },
});
