import Expo from 'expo';
import { StackNavigator } from 'react-navigation';

import SenderListScreen from './screens/SenderListScreen';
import SenderCreateScreen from './screens/SenderCreateScreen';

import CommandListScreen from './screens/CommandListScreen';
import CommandOnScreen from './screens/CommandOnScreen';

//import SmsProgressScreen from './screens/SmsProgressScreen';

const App = StackNavigator({
  Home: { screen: SenderListScreen },
  SenderCreate: { screen: SenderCreateScreen },
  CommandList: {screen: CommandListScreen},
  CommandOn: {screen: CommandOnScreen},
 // SmsProgress: {screen: SmsProgressScreen}
})

Expo.registerRootComponent(App);