import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import instagram2x from '../../assets/instagram2x.png';

export default (props) => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleNameChange(name) {
    setName(name);
  }

  function handleUsernameChange(username) {
    setUsername(username);
  }

  function handlePasswordChange(password) {
    setPassword(password);
  }

  async function handleButtonPress() {
    const listUsers = { name, username, password };
    let savedUsers = [];
    const response = await AsyncStorage.getItem('users');

    if (response) savedUsers = JSON.parse(response);
    savedUsers.push(listUsers);

    await AsyncStorage.setItem('users', JSON.stringify(savedUsers));
    navigation.navigate('Login');
  }

  return (
    <View style={style.form}>
      <View style={style.insta}>
        <Image source={instagram2x} />
      </View>
      <Text>Nome completo</Text>
      <TextInput
        onChangeText={handleNameChange}
        style={style.input}
        placeholder="Informe o nome completo"
      />
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
      <Button title="Cadastre-se" onPress={handleButtonPress} />
      <View style={style.insta}>
        <Text style={style.subtitle}>
          Ao se cadastrar, você concorda com nossos Termos, Política de Dados e
          Política de Cookies.
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 15,
  },
  insta: {
    paddingTop: 30,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cadText: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: 'bold',
    color: '#b4b4b4',
  },
});
