import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export async function getSenders() {
  try {
    //await AsyncStorage.clear();
    const senders = await AsyncStorage.getItem('senders');
    return JSON.parse(senders);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function insertSender(sender) {
  try {
    let senders = await getSenders();
    if (senders == null) {
      senders = [];
    }
    senders.push(sender);

    await AsyncStorage.setItem('senders', JSON.stringify(senders));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSender(sender) {
  try {
    let senders = await getSenders();

    senders = _.filter(senders, (e) => _.isEqual(e, sender));
    await AsyncStorage.setItem('senders', JSON.stringify(senders));
  } catch (error) {
    console.log(error);
  }
}

export async function updateSender(prevValue, newValue) {
  try {
    let senders = await getSenders();

    senders = _.map(senders, (s) => _.isEqual(s, prevValue) ? newValue : s);
    await AsyncStorage.setItem('senders', JSON.stringify(senders));
  } catch (error) {
    console.log(error);
  }
}