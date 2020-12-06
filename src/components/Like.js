import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default (props) => {
  const [likeImage, setLikeImage] = useState(dislike);

  async function changeLikeStatus() {
    if (likeImage === dislike) {
      setLikeImage(like);

      const currentLike = { item: props.item, user: props.user };
      let savedLikes = [];
      const response = await AsyncStorage.getItem('likes');

      if (response) savedLikes = JSON.parse(response);
      savedLikes.push(currentLike);

      await AsyncStorage.setItem('likes', JSON.stringify(savedLikes));
    } else {
      setLikeImage(dislike);

      let savedLikes = [];
      const response = await AsyncStorage.getItem('likes');

      if (response) savedLikes = JSON.parse(response);
      const index = savedLikes.findIndex(
        (like) =>
          like.item.id === props.item.id &&
          like.user.username === props.user.username
      );
      if (index) {
        savedLikes.splice(index, 1);
        await AsyncStorage.setItem('likes', JSON.stringify(savedLikes));
      }
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={changeLikeStatus}>
        <Image source={likeImage} />
      </TouchableOpacity>
    </View>
  );
};
