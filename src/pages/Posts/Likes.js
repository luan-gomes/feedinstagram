import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import semimagem from '../../assets/semimagem.png';

export default (props) => {
  const [likes, setLikes] = useState();

  useEffect(() => {
    handleCurtidas();
  }, []);

  console.log(likes);
  async function handleCurtidas() {
    let savedLikes = [];
    const response = await AsyncStorage.getItem('likes');
    if (response) savedLikes = JSON.parse(response);
    const match = savedLikes.filter(
      (like) => like.item.id === props.route.params.id
    );
    setLikes(match);
  }
  const renderItem = ({ item }) => {
    return (
      <View style={style.container}>
        <Image style={style.avatar} source={semimagem} />
        <View>
          <Text style={style.nameUser}>{item.user.username}</Text>
          <Text>{item.user.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <SafeAreaView>
        <FlatList
          key="list"
          data={likes}
          renderItem={renderItem}
          keyExtractor={(item) => {
            item.user.username;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  avatar: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 15,
  },
});
