import {StyleSheet} from 'react-native';

const ListItemStyle = StyleSheet.create({
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
});

const backgroundColor = '#fff';

module.exports = {
  ListItemStyle,
  backgroundColor
};