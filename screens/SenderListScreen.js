import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { getSenders } from '../data/SenderRepository';
function SenderItem(props) {
  const { item } = props;
  return (
    <TouchableHighlight style={styles.item.container}
      underlayColor='#d3d3d3'
      onPress={() => alert('Clicked: ' + JSON.stringify(item))}>
      <Text style={styles.item.text}>{item.name}</Text>
    </TouchableHighlight>
  )
}

function Separator() {
  const style = { height: StyleSheet.hairlineWidth, backgroundColor: '#a9a9a9', }
  return (
    <View style={style} />
  )
}

function HeaderRight(props) {
  const { navigation } = props;
  let name = 'empty';
  if (navigation.state != null && navigation.state.params != null) {
    params = { refreshSenders: navigation.state.params.refreshSenders };
  }
  return (
    <Text onPress={() => navigation.navigate('SenderCreate', params)}>
      Create Sender
  </Text>);
}

export default class SenderListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sender Remote',
    headerRight: <HeaderRight navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = { senders: [] };
    this.getSenders = this.getSenders.bind(this);
  }

  componentWillMount() {
    this.getSenders();

    // use a callback in the child screen to refresh the sender list
    this.props.navigation.setParams({ refreshSenders: this.getSenders });
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.senders}
        renderItem={SenderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    )
  }

  keyExtractor(sender, index) {
    return sender.name + sender.number;
  }

  async getSenders() {
    try {
      const senders = await getSenders();
      this.setState({ senders })
    } catch (error) {
      console.log('Could not fetch senders: ' + error);
    }
  }
}

const styles = {
  item: {
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      marginLeft: 12,
      fontSize: 16
    }
  },
  list: {
    flex: 1
  }
}