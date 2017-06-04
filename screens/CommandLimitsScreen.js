import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button, Modal } from 'react-native';
import t from 'tcomb-form-native';

import CommonStyles from '../common/CommonStyles';
import SmsProgress from '../components/SmsProgress';

const Form = t.form.Form;

export default class CommandLimitsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          sender: PropTypes.object.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  static navigationOptions = {
    title: 'Limits Command',
    headerStyle: {
      marginTop: Expo.Constants.statusBarHeight
    }
  };

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.createMessage = this.createMessage.bind(this);

    const { sender } = this.props.navigation.state.params;

    this.formModel = t.struct({
      low: t.maybe(t.Number),
      high: t.maybe(t.Number),
      input: this.createFormEnum(sender.inCount),
      pin: t.String
    });
    this.formOptions = {
      fields: {
        pin: { keyboardType: 'numeric', secureTextEntry: true }
      }
    }

    this.state = { sendingCommand: false, formValue: { pin: sender.pin } };
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.sendingCommand}
          onRequestClose={() => this.setState({ sendingCommand: false })}>
          <SmsProgress
            responseCallback={(msg) => this.onResponse(msg)}
            cancelCallback={() => this.setState({ sendingCommand: false })}
            to={this.props.navigation.state.params.sender.number}
            msg={this.createMessage(this.state.formValue)} />
        </Modal>
        <Form
          ref='form'
          type={this.formModel}
          value={this.state.formValue}
          onChange={this.onValueChange}
          options={this.formOptions} />
        <Button title='Send'
          onPress={() => this.setState({ sendingCommand: true })} />
      </View>);
  }

  onValueChange(value) {
    this.setState({ formValue: value });
  }

  createFormEnum(inCount) {
    let enumValues = {};
    for (let i = 1; i <= inCount; ++i) {
      enumValues['input' + i] = 'Input ' + i;
    }
    return t.enums(enumValues);
  }

  onResponse(msg) {
    this.setState({ sendingCommand: false });
    const { navigation } = this.props;
    let command = this.state.formValue;
    if (command.low) {
      command.low = parseInt(command.low);
    }
    if (command.high) {
      command.high = parseInt(command.high);
    }
    navigation.navigate('ResponseLimits', { command, response: msg });
  }

  createMessage({ input, low, high, pin }) {
    let msg = 'LIMITS ';
    const port = input && input.replace(/input/g, '');

    msg += port;

    if (low) {
      if (low < 0) {
        msg += ' -L' + Math.abs(low);
      } else {
        msg += ' L' + low;
      }
    }
    if (high) {
      if (high < 0) {
        msg += ' -H' + Math.abs(high);
      } else {
        msg += ' H' + high;
      }
    }

    msg += ' ' + pin;

    return msg;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.backgroundColor,
    padding: 10
  }
});