import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Button } from 'react-native';
import t from 'tcomb-form-native';

import SmsProgress from '../components/SmsProgress';

const Form = t.form.Form;

export default class CommandPinScreen extends React.Component {
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
    title: 'PIN Command',
    headerStyle: {
      marginTop: Expo.Constants.statusBarHeight
    }
  }

  constructor(props) {
    super(props);

    this.state = { sendingCommand: false, formValue: { pin: '', newPin: '' } };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.sendingCommand}
          onRequestClose={() => this.setState({ sendingCommand: false })}>
          <SmsProgress
            responseCallback={(response) => {
              this.setState({ sendingCommand: false });
              navigation.navigate('ResponsePin',
                {
                  response,
                  sender: navigation.state.params.sender,
                  newPin: this.state.formValue.newPin
                });
            }}
            cancelCallback={() => this.setState({ sendingCommand: false })}
            to={navigation.state.params.sender.number}
            msg={this.createMessage(this.state.formValue)} />
        </Modal>
        <Form
          ref='form'
          type={formModel}
          options={formOptions}
          value={this.state.formValue}
          onChange={(value) => this.setState({ formValue: value })} />
        <Button title='Send' onPress={() => this.setState({ sendingCommand: true })} />
      </View>
    )
  }

  createMessage({ newPin, pin }) {
    return 'PIN ' + newPin + ' ' + pin;
  }
}

const formModel = t.struct({
  newPin: t.String,
  pin: t.String
});

const formOptions = {
  fields: {
    newPin: { keyboardType: 'numeric', secureTextEntry: true },
    pin: { keyboardType: 'numeric', secureTextEntry: true }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  }
});