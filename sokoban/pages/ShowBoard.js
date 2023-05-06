import React, {Component} from "react";
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class ShowBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardTemp: [],
            board: [],
            cibles: []
        }
    }

    componentDidMount() {
        const ip = require("../configAPI.json")['ip'];
        fetch("http://" + ip + ":3001/boards/" + this.props.route.params.boardId).then((result) => {
            return result.json();
        }).then((board) => {
            this.setState({boardTemp: board.result});
            this.loadBoard();
        })
    }

    loadBoard() {
        const board = this.state.boardTemp['text'].split('\n');
        let plat = [];
        let cible = [];

        board.map((value, key) => {
            let ligne = value.split("");
            plat[key] = ligne.map((item, key2) => {
                id = key * 9 + key2;
                if (item === "P") {
                    this.setState({playerPos: id});
                }
                if (item === "x") {
                    cible.push(id);
                }
                return {...item, key: id};
            });
        });
        this.setState({board: plat, cibles: cible});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.board["text"]}</Text>
                <FlatList
                    data={this.state.board}
                    numColumns={1}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={(item) => (
                        <FlatList
                            data={item.item}
                            numColumns={9}
                            keyExtractor={(item2, index2) => `${item.id}*9+${index2}`}
                            renderItem={({item: item2}) => {
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
            </View>
        );
    }
}

export default ShowBoard;

const styles = StyleSheet.create({
    refresh: {
        position: "absolute",
        right: 0,
        transform: [{scaleX: -1}, {rotate: "30deg"}],
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
        bottom: -100,
        left: -20,
        width: 50,
        transform: [{rotate: "270deg"}],
        height: 50,
        padding: 10,
    },
    right: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -160,
        width: 50,
        height: 50,
        left: 40,
        padding: 10,
    },
    down: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -220,
        width: 50,
        left: -20,
        transform: [{rotate: "90deg"}],
        height: 50,
        padding: 10,
    },
    left: {
        backgroundColor: "lightgrey",
        position: "absolute",
        bottom: -160,
        width: 50,
        transform: [{scaleX: -1}],
        height: 50,
        left: -80,
        padding: 10,
        zIndex: -1,
    },
});