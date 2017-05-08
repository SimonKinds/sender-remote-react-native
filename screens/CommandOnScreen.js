import Expo from 'expo';
import React from 'react';

import CommandToggleOutput from '../components/CommandToggleOutput';

export default function CommandOnScreen(props) {
  return <CommandToggleOutput sender={props.navigation.state.params.sender} onResponse={(response) => onResponse(response, props.navigation.navigate)}
    commandHeader={'ON'} />
}

function onResponse(response, navigate) {
  navigate('ResponseToggleOutput', { response });
}

CommandOnScreen.navigationOptions = {
  title: 'On Command',
  headerStyle: {
    marginTop: Expo.Constants.statusBarHeight
  }
};