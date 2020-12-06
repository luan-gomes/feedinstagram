import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleUsernameChange(username) {
    setUsername(username);
  }

  function handlePasswordChange(password) {
    setPassword(password);
  }

  async function handleButtonPress() {
    //const listUsers = { username, password };
    let savedUsers = [];
    const response = await AsyncStorage.getItem('users');

    if (response) savedUsers = JSON.parse(response);
    const currentUser = savedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (currentUser) {
      props.navigation.navigate('Feed', {
        user: {
          name: currentUser.name,
          username: currentUser.username,
          password: currentUser.password,
        },
      });
    } else {
      Alert.alert('Usuário não cadastrado');
    }
    console.log(currentUser);
    //savedUsers.push(listUsers);

    //await AsyncStorage.setItem('users', JSON.stringify(savedUsers));
    //
  }

  return (
    <View style={style.form}>
      <Text>Username</Text>
      <TextInput
        onChangeText={handleUsernameChange}
        style={style.input}
        placeholder="Informe o username"
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={handlePasswordChange}
        style={style.input}
        placeholder="Informe a senha"
      />
      <Button title="Entrar" onPress={handleButtonPress} />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 15,
  },
});
