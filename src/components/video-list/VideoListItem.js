import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import theme from '../../theme';

export const VideoListItem = (props) => {
  const { thumbnail, title } = props;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('VideoPlayer');
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
        />

        <View style={styles.content}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

VideoListItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 2,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    marginVertical: 10,
  },
  thumbnail: {
    resizeMode: 'cover',
    height: 125,
    width: 250,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    padding: 5,
  },
  titleText: {
    fontSize: 14,
  },
});

export default VideoListItem;
