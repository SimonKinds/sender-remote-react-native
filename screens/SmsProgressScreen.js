import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {sendSms} from '../data/SmsApi';

export default class SmsProgressScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacting Sender'
  };

  constructor(props) {
    super(props);

    this.smsCallback = this.smsCallback.bind(this);
    this.responseStateToString = this.responseStateToString.bind(this);

    this.state = {responseState: 'server'};
  }

  componentWillMount() {
    const {to, msg} = this.props.navigation.state.params;
    sendSms(to, msg, this.smsCallback);
  }

  async smsCallback(event, msg) {
    if (event === 'response') {
      const {navigation} = this.props;
      await navigation.state.params.responseCallback(msg);
    } else {
      this.setState({ responseState: event })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.responseStateToString(this.state.responseState)}
        </Text>
      </View>)
  }

  responseStateToString(responseState) {
    switch (responseState) {
      case 'server':
        return 'Connecting to server...';
      case 'sent':
        return 'Command was sent. Waiting for delivery report...';
      case 'delivered':
        return 'Command was delivered. Waiting for response...'
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  text: {}
})