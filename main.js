import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SenderListScreen from './screens/SenderListScreen';
import SenderCreateScreen from './screens/SenderCreateScreen';
import CommandListScreen from './screens/CommandListScreen';

const App = StackNavigator({
  Home: { screen: SenderListScreen },
  SenderCreate: { screen: SenderCreateScreen },
  CommandList: {screen: CommandListScreen}
})

Expo.registerRootComponent(App);