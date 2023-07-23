import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Colors = {
  HeadText: '#18306D',
  SubText: '#1B21B5',
  ButtonColor: '#868BFE',
  DescTextColor: '#CDCFF6',
  CreateButton: '#F82626',
  FadeText: '#D9D9D9',
  BackgroundColor: '#FAFAFA',
  Yellow: '#FDBA5D',
};

export function getCurrentLocalTime() {
  return `${moment().format()}`;
}

export const storeAccessToken = async accessToken => {
  try {
    await AsyncStorage.setItem('@access_token', accessToken);
    console.log('Access token stored successfully.');
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};

export const getAccessToken = async () => {
  try {
    let accessToken = await AsyncStorage.getItem('@access_token');
    accessToken = JSON.parse(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};
