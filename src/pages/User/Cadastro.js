import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default (props) => {
  const user = {
    name: '',
    username: '',
    password: '',
  };

  return (
    <View style={style.form}>
      <Text>Nome completo</Text>
      <TextInput
        onChangeText={(name) => (user.name = name)}
        style={style.input}
        placeholder="Informe o nome completo"
      />
      <Text>Username</Text>
      <TextInput
        onChangeText={(username) => (user.username = username)}
        style={style.input}
        placeholder="Informe o username"
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={(password) => (user.password = password)}
        style={style.input}
        placeholder="Informe a senha"
      />
      <Button title="Cadastre-se" onPress={() => {}} />
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
