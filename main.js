import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { sendSms } from './data/SmsApi';

class App extends React.Component {
  componentWillMount() {
    sendSms('test', null);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Testing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
