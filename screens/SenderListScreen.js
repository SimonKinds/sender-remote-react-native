import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { getSenders } from '../data/SenderRepository';
import { Separator } from '../common/CommonViews';
import { ListItemStyle } from '../common/CommonStyles';

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
    this.renderItem = this.renderItem.bind(this);
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
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    )
  }

  keyExtractor(sender) {
    return sender.name + sender.number;
  }

  renderItem({ item }) {
    return (
      <TouchableHighlight style={ListItemStyle.container}
        underlayColor='#d3d3d3'
        onPress={() => this.props.navigation.navigate('CommandList', { sender: item })}>
        <Text style={ListItemStyle.text}>{item.name}</Text>
      </TouchableHighlight>);
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

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});