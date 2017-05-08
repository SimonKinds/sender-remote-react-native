import Expo from 'expo';
import { StackNavigator } from 'react-navigation';

import SenderListScreen from './screens/SenderListScreen';
import SenderCreateScreen from './screens/SenderCreateScreen';

import CommandListScreen from './screens/CommandListScreen';
import CommandOnScreen from './screens/CommandOnScreen';
import CommandOffScreen from './screens/CommandOffScreen';

import ResponseToggleOutputScreen from './screens/ResponseToggleOutputScreen';

const App = StackNavigator({
  SenderList: { screen: SenderListScreen },
  SenderCreate: { screen: SenderCreateScreen },

  CommandList: {screen: CommandListScreen},

  CommandOn: {screen: CommandOnScreen},
  CommandOff: {screen: CommandOffScreen},

  ResponseToggleOutput: {screen: ResponseToggleOutputScreen}
});

Expo.registerRootComponent(App);