import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

export default class CommandOnScreen extends Component {
  static navigationOptions = {
    title: 'On Command'
  };

  constructor(props) {
    super(props);

    const { sender } = props.navigation.state.params;

    let structObject = {};
    for (let i = 1; i <= sender.outCount; ++i) {
      structObject['Output ' + i] = t.Boolean;
    }
    this.formModel = t.struct(structObject);
  }

  render() {
    return (<View style={styles.container}>
      <Form
        ref='form'
        type={this.formModel}
        options={{template: CommandOnTemplate}}
      />
    </View>)
  }
}

function CommandOnTemplate(locals) {
  return (
    <View style={{flex:1}}>
      <View style={styles.checkboxContainer}>
        {getOutputs(locals.inputs)}
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
    padding: 10
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  checkbox: {
    width: '50%'
  }
});