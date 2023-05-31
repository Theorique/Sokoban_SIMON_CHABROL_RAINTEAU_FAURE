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

        let url = "http://" + ip + ":3001/boards/add?name=" + state.name
            + "&boardId=" + state.board_id
            + "&nbCols=" + state.nbCols
            + "&nbRows=" + state.nbRows
        ;
        let endUrl = '';

        state.rows.map((row, key) => {
            let encodedRow = encodeURIComponent(row.toString())
            endUrl += "&rows[" + key + "]=" + encodedRow
        })
        url += endUrl;

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            if (result.status !== 200) {
                Alert.alert('Error', 'Fetching API failed : error ' + result.status);
            } else {
                const { navigation } = this.props;

                Alert.alert('Success', 'The level was successfully created', [
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