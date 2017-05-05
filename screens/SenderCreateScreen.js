import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Button, Alert } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';

import { insertSender } from '../data/SenderRepository';
import { sendSms } from '../data/SmsApi';


const Form = t.form.Form;

const sender = t.struct({
  name: t.String,
  number: t.String,
  pin: t.Number
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
    this.fetchPorts = this.fetchPorts.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={sender}
          options={formOptions}
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
      Alert.alert('Contacting Sender', 'Validating PIN and getting port count...');

      this.fetchPorts(sender, async (event, msg) => {
        if (event == 'response') {
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
              navigation.state.params.refreshSenders();
              navigation.goBack();
            } catch (error) {
              console.log('Error while saving / getting senders ' + error);
            }
          }
        }
      });
    }
  }

  fetchPorts(sender, callback) {
    sendSms(sender.number, 'STATUS ' + sender.pin, callback);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
})