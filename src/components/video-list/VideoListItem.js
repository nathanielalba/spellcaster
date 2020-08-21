import React, { useMemo } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'redux-zero/react';

import theme from '../../theme';

export const VideoListItem = (props) => {
  const { id, imageUrl, title } = props;
  const navigation = useNavigation();
  const playbackData = useSelector(({ videoPlayback }) => videoPlayback[id]);
  const showProgressBar = useMemo(() =>
    Boolean(playbackData && playbackData.currentTime && playbackData.duration)
  ,[playbackData]);

  const onPress = () => {
    navigation.navigate('VideoPlayer', { videoId: id });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.thumbnail}
        />

        <View style={styles.content}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>

        {
          showProgressBar && (
            <View style={styles.progressBarContainer}>
              <View style={{ flex: playbackData.currentTime, backgroundColor: theme.colors.primary }} />
              <View style={{ flex: (playbackData.duration - playbackData.currentTime), backgroundColor: theme.colors.gray }} />
            </View>  
          )
        }
      </View>
    </TouchableOpacity>
  );
};

VideoListItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  imageUrl: PropTypes.string.isRequired,
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
  progressBarContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 5,
  },
});

export default VideoListItem;
