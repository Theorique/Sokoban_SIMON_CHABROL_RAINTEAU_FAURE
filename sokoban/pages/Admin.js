import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class Admin extends Component {

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADMINISTRATION INTERFACE - USE WITH CAUTION</Text>
                <TouchableOpacity style={styles.button} onPress={() =>
                    navigation.navigate('BoardsList', {name: 'BoardsList'})
                }>
                    <Text style={styles.textButton}>1. List boards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>
                    navigation.navigate('AddBoard', {name: 'AddBoard'})
                }>
                    <Text style={styles.textButton}>2. Add new board</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>
                    navigation.navigate('BoardsList', {name: 'BoardsList', delete: true})
                }>
                    <Text style={styles.textButton}>3. Remove board from database [DANGEROUS]</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>4. Quit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Admin;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: 50,
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 50
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: "#5D7DFC",
        width: 250,
        alignItems: "center",
        borderRadius: 10
    },
    textButton: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    }
});