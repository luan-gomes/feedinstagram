import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default (props) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    handleComentarios();
  }, []);

  console.log(props);
  async function handleComentarios() {
    let savedComentarios = [];
    const response = await AsyncStorage.getItem('comentarios');
    if (response) savedComentarios = JSON.parse(response);
    let match = savedComentarios.filter(
      (comentario) => comentario.item === props.item.id
    );

    if (match.length >= 2) {
      match = match.slice(0, 2);
      setComentarios(match);
    } else if (match.length === 1) {
      match = match.slice(0, 1);
      setComentarios(match);
    } else if (!match) {
      setComentarios(match);
    }
  }

  const renderComentarios = ({ item }) => {
    return (
      <View style={style.containerComentarios}>
        <Text style={style.name}>{item.user.username}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          key="list"
          data={comentarios}
          renderItem={renderComentarios}
          keyExtractor={(item) => {
            item.user.username;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  name: {
    fontWeight: 'bold',
  },
  containerComentarios: {
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column',
  },
});
