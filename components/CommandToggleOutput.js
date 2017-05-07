import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button, Text, Modal } from 'react-native';
import t from 'tcomb-form-native';

import SmsProgress from '../components/SmsProgress';

const Form = t.form.Form;

export default class CommandToggleOutput extends React.Component {
  static propTypes = {
    sender: PropTypes.object.isRequired,
    onResponse: PropTypes.func.isRequired,
    commandHeader: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.onResponse = this.onResponse.bind(this);

    const { sender } = props;

    let structObject = {
      pin: t.String,
      hours: t.Number,
      minutes: t.Number,
      seconds: t.Number
    };
    for (let i = 1; i <= sender.outCount; ++i) {
      structObject['output ' + i] = t.Boolean;
    }

    this.formModel = t.struct(structObject);
    this.formOptions = {
      template: CommandOnTemplate,
      fields: {
        pin: { keyboardType: 'numeric', secureTextEntry: true }
      }
    };

    this.state = {
      formValue:
      { pin: sender.pin },
      sendingCommand: false
    };
  }

  render() {
    return (<View style={styles.container}>
      <Modal
        visible={this.state.sendingCommand}
        onRequestClose={() => this.setState({ sendingCommand: false })}>
        <SmsProgress
          responseCallback={(msg) => this.onResponse(msg)}
          cancelCallback={() => this.setState({ sendingCommand: false })}
          to={this.props.sender.number}
          msg={this.createMessage(this.state.formValue)} />
      </Modal>

      <Form
        ref='form'
        type={this.formModel}
        options={this.formOptions}
        value={this.state.formValue}
        onChange={this.onValueChange}
      />
      <Button title='Send' onPress={() => this.setState({sendingCommand: true})} />
    </View>)
  }

  onValueChange(value) {
    this.setState({ formValue: value })
  }

  createMessage(formValue) {
    const { pin, hours, minutes, seconds } = formValue;

    let portString = '';
    for (const prop in formValue) {
      if (prop.toLowerCase().includes('output') && formValue[prop]) {
        portString += ',' + prop.replace(/^\D+/g, '');
      }
    }
    portString = portString.substr(1);

    let durationString = '';
    if (hours && hours.length > 0) {
      durationString += 'T' + hours;
    }
    if (minutes && minutes.length > 0) {
      durationString += 'M' + minutes;
    }
    if (seconds && seconds.length > 0) {
      durationString += 'S' + seconds;
    }

    return this.props.commandHeader + ' ' + portString + ' '
      + (durationString.length > 0 ? (durationString + ' ') : '') + pin;
  }

  onResponse(response) {
    this.setState({sendingCommand: false});
    this.props.onResponse(response);
  }
}

function CommandOnTemplate(locals) {
  return (
    <View style={{ flex: 0 }}>
      <View style={styles.checkboxContainer}>
        {getOutputs(locals.inputs)}
      </View>
      <Text style={locals.stylesheet.controlLabel.normal}>Duration</Text>
      <View style={styles.durationContainer}>
        <View style={{ flex: 1, marginRight: 5 }}>
          {locals.inputs.hours}
        </View>
        <View style={{ flex: 1, marginRight: 5 }}>
          {locals.inputs.minutes}
        </View>
        <View style={{ flex: 1 }}>
          {locals.inputs.seconds}
        </View>
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
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  durationElement: {
    flex: 1
  }
});