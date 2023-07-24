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
  IconColor: "#526066"
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

export const storeTasks = async tasks => {
  try {
    await AsyncStorage.setItem('@tasks', tasks);
    console.log('Tasks stored successfully.');
  } catch (error) {
    console.error('Error storing tasks:', error);
  }
};

export const getTasks = async () => {
  try {
    let tasks = await AsyncStorage.getItem('@tasks');
    tasks = JSON.parse(tasks);
    return tasks;
  } catch (error) {
    console.error('Error in getting tasks:', error);
    return null;
  }
};

export function getCurrentFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().padStart(4, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export const getDayNumber = () => {
  const date = new Date();
  const dayNumber = date.getDay();
  return dayNumber;
};
