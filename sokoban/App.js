import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { plateau: ['ok'] };
  }
  
  componentDidMount() {
    const customData = require('./plateau/plateau-dur.json');
    console.log(customData);
    this.setState( {plateau: customData});
  }
  render() {
    return (
      <View>
        <Text>{this.state.plateau["text"]}</Text>
      <FlatList
        data={[1, 2, 3, 4]}
        numColumns={3}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
