import {Component} from "react";
import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Row, Table} from "react-native-table-component";

class BoardsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headTable: ['Difficulty', 'Name', 'Rows', 'Cols'],
            widthArr: [120, 190, 50, 50],
            boards: []
        }
    }

    componentDidMount() {
        const ip = require("../configAPI.json")['ip'];
        fetch("http://" + ip + ":3001/boards").then((result) => {
            return result.json();
        }).then((boards) => {
            this.setState({boards: boards})
        })
    }

    render() {
        const state = this.state;
        const {navigation} = this.props;
        const data = [];

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
                <Text style={styles.title}>Cliquez sur un niveau pour le voir</Text>
                <ScrollView horizontal={true}>
                    <View>
                        <Table>
                            <Row data={state.headTable} widthArr={state.widthArr} style={styles.head}

                            />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table>
                                {data.map((dataRow, index) => (
                                    <TouchableOpacity style={styles.button}
                                                      onPress={() => navigation.navigate('ShowBoard', {boardId: dataRow[0]})}>
                                        <Row
                                            key={index}
                                            data={dataRow}
                                            widthArr={state.widthArr}
                                            style={[styles.row, index % 2 && {backgroundColor: '#ffffff'}]}

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