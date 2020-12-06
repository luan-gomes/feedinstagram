import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default (props) => {
  return (
    <View>
      <Text>{props.username}</Text>;<Text>{props.item.id}</Text>;
    </View>
  );
};
