import React from 'react';
import {Platform} from 'react-native';
import SelectDateIOS from './SelectDateIOS';
import SelectDateAndroid from './SelectDateAndroid';

export default function(p) {
  if (Platform.OS == 'android') {
    return <SelectDateAndroid {...p} />;
  }
  return <SelectDateIOS {...p} />;
}
