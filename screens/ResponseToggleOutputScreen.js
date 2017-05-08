import Expo from 'expo';
import React from 'react';
import {Text} from 'react-native';
import { NavigationActions } from 'react-navigation';

import ResponseToggleOutput from '../components/ResponseToggleOutput';


export default function ResponseToggleOutputScreen(props) {
  return <ResponseToggleOutput response={props.navigation.state.params.response} />
}

ResponseToggleOutputScreen.navigationOptions = ({ navigation }) => ({
  title: 'Success',
  headerRight: (<Text onPress={() => {
    const resetAction = NavigationActions.reset(({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SenderList' })
      ]
    }));
    navigation.dispatch(resetAction);
  }}>Done</Text>),
  headerStyle: {
    marginTop: Expo.Constants.statusBarHeight
  }
});