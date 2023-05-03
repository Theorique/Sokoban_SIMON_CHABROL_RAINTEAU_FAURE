import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

class Accueil extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() =>
                    navigation.navigate('Partie', {name: 'Partie'})
                }>
                    <Text style={styles.textButton}>CHARGER LE DERNIER NIVEAU</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>
                    navigation.navigate('Admin', {name: 'Admin'})
                }>
                    <Text style={styles.textButton}>ADMIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Accueil;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
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
