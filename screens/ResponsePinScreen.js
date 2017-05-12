import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import CommonStyles from '../common/CommonStyles';
import { updateSender } from '../data/SenderRepository';

export default class ResponsePinScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          response: PropTypes.string.isRequired,
          sender: PropTypes.object.isRequired,
          newPin: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  static navigationOptions = ({ navigation }) => ({
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

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.updateSender(this.props.navigation.state.params);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.fancyText(this.props.navigation.state.params.response)}</Text>
      </View>
    )
  }

  fancyText(response) {
    if (response.toLowerCase().includes('ok')) {
      return 'PIN updated successfully';
    } else {
      console.error('Something went wrong with saving PIN on the sender: ' + response);
      return response;
    }
  }

  async updateSender({ response, sender, newPin }) {
    if (response.toLowerCase().includes('ok')) {
      updateSender(sender, { ...sender, pin: newPin });
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyles.backgroundColor
  },
  text: {
    fontSize: 18
  }
});