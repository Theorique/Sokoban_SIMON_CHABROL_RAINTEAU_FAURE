import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import './node_modules/bootstrap/dist/css/bootstrap.css';
import UploadFiles from "./composants/UploadFiles";

export default function App() {
  return (
      <View className="App">
        <UploadFiles />
      </View>
  );
}