import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { sendSms } from './data/SmsApi';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Testing 5</Text>
        <Button title='Send API request' onPress={() =>
          sendSms('me', 'ON', (event, msg) => {
            console.log('Event: ' + event);
            console.log(msg);
          })} />
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