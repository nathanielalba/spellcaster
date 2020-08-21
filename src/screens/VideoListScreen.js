import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useSelector, useAction } from 'redux-zero/react';

import { VideoListItem } from '../components/video-list';
import theme from '../theme';
import videoData from '../videoData.json';

const VideoListScreen = () => {
  const videos = useSelector(({ videos }) => videos);
  const updateVideoData = useAction((state) => {
    return {
      ...state,
      videos: {
        loaded: true,
        data: videoData,
      },
    };
  });
  // first check to see if the store has been loaded with movie dad
  useEffect(() => {
    if (!videos.loaded) {
      updateVideoData();
    }
  }, [videos]);

  const renderItem = ({ item }) => {
    return (
      <VideoListItem
        thumbnail={item.thumbnail}
        title={item.title}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        data={videos.data}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
});

export default VideoListScreen;
