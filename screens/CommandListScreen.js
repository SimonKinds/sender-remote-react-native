import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableHighlight, Text} from 'react-native';

import { getCommands } from '../data/CommandRepository';
import { Separator } from '../common/CommonViews';
import { ListItemStyle } from '../common/CommonStyles';

function CommandItem(props) {
  const { item } = props;
  return (
    <TouchableHighlight style={ListItemStyle.container}
      underlayColor='#d3d3d3'
      onPress={() => alert('Clicked: ' + JSON.stringify(item))}>
      <Text style={ListItemStyle.text}>{item.description}</Text>
    </TouchableHighlight>
  )
}

export default class CommandListScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.sender.name
    };
  };

  constructor(props) {
    super(props);

    this.state = {commands: []};

    this.getCommands = this.getCommands.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.getCommands();
  } 

  render() {
    return <FlatList
        style={styles.list}
        data={this.state.commands}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={Separator}
    />
  }

  keyExtractor(command, index) {
    return command.type;
  }

  renderItem({item}) {
    return (
      <TouchableHighlight style={ListItemStyle.container}
        underlayColor='#d3d3d3'
        onPress={() => alert('Clicked: ' + JSON.stringify(item))}>
        <Text style={ListItemStyle.text}>{item.description}</Text>
      </TouchableHighlight>
    )
  }

  async getCommands() {
    try {
      const commands = await getCommands();
      this.setState({ commands });
    } catch (error) {
      console.log('Error fetching commands: ' + error);
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});