import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button} from 'react-native';

import CommonStyles from '../common/CommonStyles';
import {sendSms} from '../data/SmsApi';

export default class SmsProgress extends React.Component {
  static propTypes = {
    responseCallback: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    cancelCallback: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.smsCallback = this.smsSubscriber.bind(this);
    this.responseStateToString = this.responseStateToString.bind(this);

    this.state = {responseState: 'server'};
  }

  componentWillMount() {
    const {to, msg} = this.props;
    this.smsSubscription = sendSms(to, msg)
                          .subscribe((response) => this.smsSubscriber(response));
  }

  componentWillUnmount() {
    this.smsSubscription.unsubscribe();
  }

  async smsSubscriber({event, msg}) {
    if (event === 'received') {
      await this.props.responseCallback(msg);
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
        <Button style={styles.button} title='Cancel' onPress={() => this.props.cancelCallback()}/>
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
    backgroundColor: CommonStyles.backgroundColor,
    padding: 10
  },
  text: {flex: 0, marginBottom: 20},
  button: {flex: 0}
})