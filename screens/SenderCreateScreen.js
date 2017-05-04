import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Text, TextInput, Button } from 'react-native';
import t from 'tcomb-form-native';

import {insertSender, getSenders} from '../data/SenderRepository';


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
    const sender = this.refs.form.getValue();
    if (sender == null) {
      console.log('Invalid sender is trying to get created');
    } else {
      try {
        await insertSender(sender);
        const senders = await getSenders();
        alert('Sender created successfully!');
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