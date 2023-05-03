import {StatusBar} from "expo-status-bar";
import React, {Component, useDebugValue, useState} from "react";
import Accueil from "./pages/Accueil";
import Partie from "./pages/Partie";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Admin from "./pages/Admin.js";
import BoardsList from "./pages/BoardsList";
import ShowBoard from "./pages/ShowBoard";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Stack = createNativeStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Accueil">
                    <Stack.Screen
                        name="Partie"
                        component={Partie}
                        options={{title: "Partie"}}
                    />
                    <Stack.Screen name="Accueil" component={Accueil}/>
                    <Stack.Screen name="Admin" component={Admin}/>
                    <Stack.Screen name="BoardsList" component={BoardsList}/>
                    <Stack.Screen name="ShowBoard" component={ShowBoard}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
