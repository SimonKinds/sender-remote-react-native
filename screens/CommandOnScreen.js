import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

export default class CommandOnScreen extends Component {
  static navigationOptions = {
    title: 'On Command'
  };

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);

    const { sender } = props.navigation.state.params;

    let structObject = {};
    for (let i = 1; i <= sender.outCount; ++i) {
      structObject['output ' + i] = t.Boolean;
    }
    structObject['pin'] = t.Number;

    this.formModel = t.struct(structObject);
    this.formOptions = {template: CommandOnTemplate, fields: {pin: {secureTextEntry: true}}};

    this.state = {formValue: {pin: sender.pin}};
  }

  render() {
    return (<View style={styles.container}>
      <Form
        ref='form'
        type={this.formModel}
        options={this.formOptions}
        value={this.state.formValue}
        onChange={this.onValueChange}
      />
      <Button title='Send' onPress={() => alert('should send ' + JSON.stringify(this.refs.form.getValue()))}/>
    </View>)
  }

  onValueChange(value) {
    this.setState({formValue: value})
  }
}

function CommandOnTemplate(locals) {
  return (
    <View style={{flex: 0}}>
      <View style={styles.checkboxContainer}>
        {getOutputs(locals.inputs)}
       </View>
       <View>
        {locals.inputs.pin}
       </View>
    </View>
  )
}

function getOutputs(fields) {
  let outputs = [];
  for (const prop in fields) {
    if (prop.toLocaleLowerCase().includes('output')) {
      outputs.push(<View key={prop} style={styles.checkbox}>{fields[prop]}</View>);
    }
  }

  return outputs;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkbox: {
    width: '50%'
  }
});