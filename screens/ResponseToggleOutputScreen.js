import React from 'react';

import { ResponseNavigationOptions } from '../common/CommonViews';
import ResponseToggleOutput from '../components/ResponseToggleOutput';


export default function ResponseToggleOutputScreen(props) {
  return <ResponseToggleOutput response={props.navigation.state.params.response} />
}

ResponseToggleOutputScreen.navigationOptions = ResponseNavigationOptions;