import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default function ResponsePinScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{fancyText(props.navigation.state.params.response)}</Text>
    </View>
  )
}

function fancyText(response) {
  if (response.toLowerCase().includes('ok')) {
    return 'PIN updated successfully';
  } else {
    console.error('Something went wrong with saving PIN on the sender: ' + response);
    return response;
  }
}

ResponsePinScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponsePinScreen.navigationOptions = ({ navigation }) => ({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18
  }
});