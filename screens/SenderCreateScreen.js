import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Button, Alert } from 'react-native';
import {NavigationActions} from 'react-navigation';
import t from 'tcomb-form-native';
import _ from 'lodash';

import { insertSender } from '../data/SenderRepository';
import { sendSms } from '../data/SmsApi';


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
      this.props.navigation.navigate('SmsProgress',
        {
          responseCallback: ((msg) => this.onResponse(msg, sender)),
          to: sender.number,
          msg: 'STATUS ' + sender.pin
        });
    }
  }

  async onResponse(msg, sender) {
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

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        })
        navigation.dispatch(resetAction)

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