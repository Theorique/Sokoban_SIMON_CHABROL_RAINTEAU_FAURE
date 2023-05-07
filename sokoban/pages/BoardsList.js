import { Component } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Row, Table } from "react-native-table-component";

class BoardsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headTable: ['Difficulty', 'Name', 'Rows', 'Cols'],
            widthArr: [120, 190, 50, 50],
            boards: [],
            delete: false
        }
    }

    componentDidMount() {
        if (this.props.route.params.delete === true) {
            this.setState({ delete: true });
        }

        const ip = require("../configAPI.json")['ip'];
        fetch("http://" + ip + ":3001/boards").then((result) => {
            return result.json();
        }).then((boards) => {
            this.setState({ boards: boards })
        })
    }

    deleteLevel(boardId) {
        const ip = require("../configAPI.json")['ip'];
        const { navigation } = this.props;

        fetch("http://" + ip + ":3001/boards/" + boardId, {
            method: 'DELETE'
        }).then((result) => {
            if (result.status !== 200) {
                Alert.alert('Error', 'Fetching API failed : error ' + result.status);
            } else {
                Alert.alert('Success', 'The level was successfully deleted', [
                    {
                        text: 'Back to the menu',
                        onPress: () => { navigation.navigate('Accueil'); }
                    },
                    {
                        text: 'Back to level list',
                        onPress: () => { navigation.navigate('BoardsList', { name: 'BoardsList' }); }
                    }
                ])
            }
        })
    }

    render() {
        const state = this.state;
        const data = [];
        const { navigation } = this.props;

        for (let i = 0; i < state.boards.length; i++) {
            const dataRow = [];
            const board = state.boards[i];
            for (let key in board) {
                if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
                    dataRow.push(board[key]);
                }
            }
            data.push(dataRow);
        }
        return (
            <View>
                <Text style={styles.title}>Click on a level to watch it</Text>
                <ScrollView horizontal={true}>
                    <View>
                        <Table>
                            <Row data={state.headTable} widthArr={state.widthArr} style={styles.head} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table>
                                {data.map((dataRow, index) => (
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => {
                                            if (this.state.delete === false) {
                                                navigation.navigate('ShowBoard', { boardId: dataRow[0] });
                                            } else {
                                                Alert.alert('Danger', 'Do you really want to delete this level ?', [
                                                    {
                                                        text: 'YES',
                                                        onPress: () => { this.deleteLevel(dataRow[0]) }
                                                    },
                                                    {
                                                        text: 'CANCEL',
                                                        onPress: () => { navigation.navigate('BoardsList', { name: 'BoardsList' }) }
                                                    }
                                                ]);
                                            }
                                        }}>
                                        <Row
                                            key={index}
                                            data={dataRow}
                                            widthArr={state.widthArr}
                                            style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}

                                        />
                                    </TouchableOpacity>
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BoardsList;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 50,
        marginTop: 20
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#ffffff'
    },
    head: {
        height: 50,
        backgroundColor: '#5D7DFC',

    },
    textHead: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'white',
        fontSize: 16
    },
    text: {
        textAlign: 'center',
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#F7F8FA'
    }
});