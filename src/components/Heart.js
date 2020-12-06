import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default (props) => {
  const [liked, setLiked] = useState(dislike);
  function handleLiked() {
    if (liked === dislike) {
      setLiked(like);
    } else {
      setLiked(dislike);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={handleLiked}>
        <Image source={liked} />
      </TouchableOpacity>
    </View>
  );
};
