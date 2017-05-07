import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class ResponseOnScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Success',
    headerRight: (<Text onPress={() => {
      const resetAction = NavigationActions.reset(({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SenderList' })
        ]
      }));
      navigation.dispatch(resetAction);
    }}>Done</Text>),
    headerStyle: {
      marginTop: Expo.Constants.statusBarHeight
    }
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