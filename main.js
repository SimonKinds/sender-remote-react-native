import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SenderCreateScreen from './screens/SenderCreateScreen';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Sender Remote'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Click button to navigate to sender create view</Text>
        <Button title='Click me!'
          onPress={() => navigate('SenderCreate')} />
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

const App = StackNavigator({
  Home: { screen: HomeScreen },
  SenderCreate: { screen: SenderCreateScreen }
})

Expo.registerRootComponent(App);