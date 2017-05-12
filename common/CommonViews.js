import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import CommonStyles from './CommonStyles';

export function Separator() {
  const style = { height: StyleSheet.hairlineWidth, backgroundColor: '#a9a9a9', }
  return (
    <View style={style} />
  )
}

function ResponseHeaderRight({ navigation }) {
  return (
    <Text style={{ marginRight: 10 }}
      onPress={() => {
        const resetAction = NavigationActions.reset(({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SenderList' })
          ]
        }));
        navigation.dispatch(resetAction);
      }}>
      Done
      </Text>)
}

export function ResponseNavigationOptions({navigation}) {
    return {
    title: 'Success',
    headerRight: <ResponseHeaderRight navigation={navigation}/>,
    headerStyle: CommonStyles.headerStyle
  }
}