import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ResponseOnScreen extends React.Component {
  static navigationOptions = ({
    title: 'Success'
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.navigation.state.params.response}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});