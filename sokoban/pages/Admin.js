import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class Admin extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADMINISTRATION INTERFACE - USE WITH CAUTION</Text>
                <FlatList style={styles.list}
                          data={[
                              {key: '1. List boards'},
                              {key: '2. Remove board from database [DANGEROUS]'},
                              {key: '3. Quit'},
                          ]}
                          renderItem={({item}) =>
                              <TouchableOpacity style={styles.item}>
                                  <Text style={styles.textButton}>{item.key}</Text>
                              </TouchableOpacity>
                          }
                />
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
        marginBottom: 150
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    textButton: {
        fontSize: 16
    }
});