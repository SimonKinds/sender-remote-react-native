import Expo from 'expo';
import React from 'react';

import CommandToggleOutput from '../components/CommandToggleOutput';

export default function CommandOffScreen(props) {
  return <CommandToggleOutput sender={props.navigation.state.params.sender} onResponse={(response) => onResponse(response, props.navigation.navigate)}
    commandHeader={'OFF'} />
}

function onResponse(response, navigate) {
  navigate('ResponseOn', { response });
}

CommandOffScreen.navigationOptions = {
  title: 'Off Command',
  headerStyle: {
    marginTop: Expo.Constants.statusBarHeight
  }
};