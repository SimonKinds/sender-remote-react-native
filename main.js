import Expo from 'expo';
import { StackNavigator } from 'react-navigation';

import SenderListScreen from './screens/SenderListScreen';
import SenderCreateScreen from './screens/SenderCreateScreen';

import CommandListScreen from './screens/CommandListScreen';
import CommandOnScreen from './screens/CommandOnScreen';
import CommandOffScreen from './screens/CommandOffScreen';

import ResponseOnScreen from './screens/ResponseOnScreen';

const App = StackNavigator({
  SenderList: { screen: SenderListScreen },
  SenderCreate: { screen: SenderCreateScreen },

  CommandList: {screen: CommandListScreen},

  CommandOn: {screen: CommandOnScreen},
  CommandOff: {screen: CommandOffScreen},

  ResponseOn: {screen: ResponseOnScreen}
});

Expo.registerRootComponent(App);