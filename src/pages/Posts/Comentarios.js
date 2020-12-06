import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import semimagem from '../../assets/semimagem.png';
import Heart from '../../components/Heart';

export default (props) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    handleComentarios();
  }, []);

  console.log(comentarios);
  async function handleComentarios() {
    let savedComentarios = [];
    const response = await AsyncStorage.getItem('comentarios');
    if (response) savedComentarios = JSON.parse(response);
    const match = savedComentarios.filter(
      (comentario) => comentario.item === props.route.params.item.id
    );
    setComentarios(match);
  }
  const RenderItem = () => {
    const [text, setText] = useState('');
    async function onSave() {
      const currentComent = {
        item: props.route.params.item.id,
        user: props.route.params.user,
        text,
      };
      let savedComentarios = [];
      const response = await AsyncStorage.getItem('comentarios');

      if (response) savedComentarios = JSON.parse(response);
      savedComentarios.push(currentComent);

      await AsyncStorage.setItem(
        'comentarios',
        JSON.stringify(savedComentarios)
      );
      handleComentarios();
    }

    return (
      <View>
        <TextInput
          onChangeText={(texto) => setText(texto)}
          style={style.input}
          placeholder={'Adicione um comentário'}
          value={text}
        />

        <Button
          title="Publicar"
          onPress={onSave}
          accessibilityLabel="Publicar"
        ></Button>
      </View>
    );
  };

  const renderComentarios = ({ item }) => {
    return (
      <View style={style.containerAll}>
        <View style={style.container}>
          <Image style={style.avatar} source={semimagem} />
          <View>
            <Text style={style.nameUser}>{item.user.username}</Text>
            <Text>{item.text}</Text>
          </View>
        </View>
        <Heart />
      </View>
    );
  };

  return (
    <View>
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
      <View style={style.containerInput}>
        <RenderItem />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerAll: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 15,
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 15,
  },
});
