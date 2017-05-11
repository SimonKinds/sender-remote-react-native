import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { NavigationActions } from 'react-navigation';

import {getValues} from '../common/StatusParser';

export default function ResponseStatusScreen(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {createSections(getValues(props.navigation.state.params.response))}
    </ScrollView>
  ) }

function createSections(values) {
  let sections = [];
  for (const val of values) {
    let header;
    if (val.type == 'in') {
      header = 'Input ' + val.portNumber;
    } else {
      header = 'Output ' + val.portNumber;
    }

    sections.push(
      <View key={header}>
        <Text style={styles.sectionHeader}>
          {header}
        </Text>
        <Text style={styles.sectionText}>
          {val.value}
        </Text>
        </View>)
  }

  return sections;
}

ResponseStatusScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponseStatusScreen.navigationOptions = ({ navigation }) => ({
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionText: {
    fontSize: 16
  }
});