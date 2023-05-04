import {Component} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";

class AddBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            board_id: '',
            rows: []
        }
    }

    submit = () => {
        const state = this.state;
        const ip = require("../configAPI.json")['ip'];

        fetch("http://" + ip + ":3001/board/add", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                boardId: state.boardId,
                name: state.name,
                rows: state.rows
                // TODO rajouter les champs manquants
            }),
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
                <Text style={styles.label}>Board content (separated by comas)</Text>
                <TextInput
                    placeholder="ex : '###, #x#, #C#, #P#'"
                    onChangeText={(text) => {
                        this.setState({rows: text.split(',')})
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