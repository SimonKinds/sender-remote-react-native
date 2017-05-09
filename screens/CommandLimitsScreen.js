import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Button} from 'react-native';
import t from 'tcomb-form-native';

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

    const {sender} = this.props.navigation.state.params;

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

    this.state = { formValue: { pin: sender.pin } };
  }

  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref='form'
          type={this.formModel}
          value={this.state.formValue}
          onChange={this.onValueChange}/>
        <Button title='Send' 
          onPress={() => alert(JSON.stringify(this.state.formValue))} />
      </View>);
  }

  onValueChange(value) {
    this.setState({formValue: value});
  }

  createFormEnum(inCount) {
    let enumValues = {};
    for (let i = 1; i <= inCount; ++i) {
      enumValues['input' + i] = 'Input ' + i;
    }
    return t.enums(enumValues);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
})