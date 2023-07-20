import React from 'react';
import {Dimensions} from 'react-native';

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const H = percentage => {
  return dimensions.height * (percentage / 100);
};

export const W = percentage => {
  return dimensions.width * (percentage / 100);
};
