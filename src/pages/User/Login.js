import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import instagram2x from '../../assets/instagram2x.png';

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
  function handleCad() {
    props.navigation.navigate('Cadastro');
  }

  return (
    <View style={style.form}>
      <View style={style.insta}>
        <Image source={instagram2x} />
      </View>
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
      <View style={style.insta}>
        <TouchableOpacity onPress={handleCad}>
          <Text style={style.cadText}>
            Não tem uma conta? Clique aqui e cadastre-se
          </Text>
        </TouchableOpacity>
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
});
