import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Button, Alert, Modal } from 'react-native';
import {NavigationActions} from 'react-navigation';
import t from 'tcomb-form-native';
import _ from 'lodash';

import { insertSender } from '../data/SenderRepository';
import SmsProgress from '../components/SmsProgress';

const Form = t.form.Form;

const sender = t.struct({
  name: t.String,
  number: t.String,
  pin: t.String
});

const formOptions = {
  fields: {
    name: {
      autoCapitalize: 'words'
    },
    number: {
      keyboardType: 'phone-pad'
    },
    pin: {
      keyboardType: 'numeric',
      secureTextEntry: true
    }
  }
};

export default class SenderCreateScreen extends Component {
  static navigationOptions = {
    title: 'Create sender'
  };

  constructor(props) {
    super(props);

    this.createSender = this.createSender.bind(this);
    this.onResponse = this.onResponse.bind(this);

    this.state = {to: '', msg: '', sendingCommand: false, formValue: {}}
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.sendingCommand}
          onRequestClose={() => this.setState({ sendingCommand: false })}>
          <SmsProgress
            responseCallback={(msg) => this.onResponse(msg, this.state.formValue)}
            cancelCallback={() => this.setState({sendingCommand: false})}
            to={this.state.to}
            msg={this.state.msg} />
        </Modal>
        <Form
          ref="form"
          type={sender}
          options={formOptions}
          value={this.state.formValue}
          onChange={(value) => this.setState({formValue: value})}
        />
        <Button title='Create'
          onPress={() => {
            Keyboard.dismiss();
            this.createSender()
          }} />
      </View>);
  }

  async createSender() {
    let sender = this.refs.form.getValue();
    if (sender == null) {
      console.log('Invalid sender is trying to get created');
    } else {
      this.setState( {
          to: sender.number,
          msg: 'STATUS ' + sender.pin,
          sendingCommand: true
      });
    }
  }

  async onResponse(msg, sender) {
    // if user canceled the request
    if (!this.state.sendingCommand) {
      return;
    }

    if (msg.toLowerCase().includes('error')) {
      Alert.alert('Error', msg);
    } else {
      const split = msg.split(',');
      const inCount = _.chain(split)
        .filter(x => x.toLowerCase().includes('in'))
        .size()
        .value();
      const outCount = _.chain(split)
        .filter(x => x.toLowerCase().includes('out'))
        .size()
        .value();

      sender = {
        ...sender,
        inCount,
        outCount
      };

      try {
        await insertSender(sender);
        const { navigation } = this.props;

        // if creating more than 1 sender the list doesn't get recreated
        // TODO: currently results in renders of destroyed objects for some reason
        await navigation.state.params.refreshSenders();

        navigation.goBack();

      } catch (error) {
        console.log('Error while saving / getting senders ' + error);
      }
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
})