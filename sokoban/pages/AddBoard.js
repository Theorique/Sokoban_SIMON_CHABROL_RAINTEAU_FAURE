import {Component} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";

class AddBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            board_id: '',
            rows: [],
            nbRows: 0,
            nbCols: 0,
        }
    }

    submit = () => {
        const state = this.state;
        const ip = require("../configAPI.json")['ip'];
        console.log(JSON.stringify({
            board_id: state.board_id,
            name: state.name,
            rows: state.rows,
            nbRows: state.nbRows,
            nbCols: state.nbCols
        }))

        fetch("http://" + ip + ":3001/boards/add", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                board_id: state.board_id,
                name: state.name,
                rows: state.rows,
                nbRows: state.nbRows,
                nbCols: state.nbCols
            }),
        }).then((result) => {
            if (result.status !== 200) {
                Alert.alert('Error', 'Fetching API failed : error ' + result.status);
            }
        })
    }

    render() {

        return (
            <View style={styles.content}>
                <Text style={styles.label}>Name of the board</Text>
                <TextInput
                    placeholder="My board"
                    onChangeText={(text) => {
                        this.setState({name: text})
                    }}
                    style={styles.input}
                />
                <Text style={styles.label}>Difficulty</Text>
                <TextInput
                    placeholder="simple, middle, difficult, ..."
                    onChangeText={(text) => {
                        this.setState({board_id: text})
                    }}
                    style={styles.input}
                />
                <Text style={styles.label}>Board content (rows separated by comas)</Text>
                <TextInput
                    placeholder="ex : '###, #x#, #C#, #P#'"
                    onChangeText={(text) => {
                        this.setState({
                            rows: text.split(',')
                        }, () => {
                            this.setState({nbRows: this.state.rows.reduce((max, element) => Math.max(max, element.length), 0)} );
                            this.setState({nbCols: this.state.rows.length} )
                        })
                    }}
                    style={styles.input}
                />
                <Button title="submit" onPress={() => {
                    this.submit()
                }}/>
            </View>
        )
    }
}

export default AddBoard;

const styles = StyleSheet.create({
    content: {
        marginTop: 100
    },
    input: {
        borderWidth: 2,
        borderColor: '#5D7DFC',
        marginBottom: 20,
        padding: 5
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    }
})