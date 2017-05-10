import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import {NavigationActions} from 'react-navigation';

export default function ResponseLimitsScreen(props) {
  const {response, command} = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{fancyText(command, response)}</Text>
    </View>)
}

function fancyText(command, response) {
  if (response.toLowerCase().includes('ok')) {
    return 'Updated limits \n' + (command.low ? 'Low: ' + command.low + '\n' : '') + (command.high ? 'High: ' + command.high : '')
  } else {
    console.error("Couldn't parse limits command");
    // couldn't parse, just return whatever the sender got us
    return response;
  }
}

ResponseLimitsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired,
        command: PropTypes.shape({
          low: PropTypes.number,
          high: PropTypes.number,
          input: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponseLimitsScreen.navigationOptions = ({ navigation }) => ({
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
})