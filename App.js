import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Feed from './src/pages/Feed';
import Cadastro from './src/pages/User/Cadastro';
import Login from './src/pages/User/Login';
import Likes from './src/pages/Posts/Likes';
import Comentarios from './src/pages/Posts/Comentarios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={style.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              title: 'Formulário de Cadastro',
            }}
          />
          <Stack.Screen
            name="Likes"
            component={Likes}
            options={{
              title: 'Curtidas',
            }}
          />
          <Stack.Screen
            name="Comentarios"
            component={Comentarios}
            options={{
              title: 'Comentários',
            }}
          />
          <Stack.Screen name="Feed" component={Feed} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const screenOptions = {};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
