import React from 'react';
import {StyleSheet, View} from 'react-native';

export function Separator() {
  const style = { height: StyleSheet.hairlineWidth, backgroundColor: '#a9a9a9', }
  return (
    <View style={style} />
  )
}