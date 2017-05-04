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
  console.log('creating header');
  return (
    <Text
      onPress={() => this.props.navigate('SenderCreate')}>
      Create
  </Text>);
}

export default class SenderListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      title: 'Sender Remote',
      headerRight: (
        <Text onPress={() => navigation.navigate('SenderCreate')}>
          Create Sender
        </Text>
      )
    });
  };

  constructor(props) {
    super(props);

    this.state = { senders: [] };
  }

  async componentWillMount() {
    try {
      const senders = await getSenders();
      console.log(JSON.stringify(senders));
      this.setState({ senders })
    } catch (error) {
      console.log('Could not fetch senders: ' + error);
    }
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