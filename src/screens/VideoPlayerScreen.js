import React, { useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'redux-zero/react';

import { VideoPlayer, VideoPlayerDescription } from '../components/video-player';

const VideoPlayerScreen = () => {
  const videoPlayer = useSelector(({ videoPlayer }) => videoPlayer);
  const navigation = useNavigation();
  const route = useRoute();
  const videoId = useMemo(() => {
    if (route.params && route.params.videoId) {
      return route.params.videoId;
    }

    return null;
  }, [route]);
  const videoData = useSelector(({ videos }) => videos.data.find((v) => v.id === videoId));

  // if there isn't a videoId, kick user back to home screen
  useEffect(() => {
    if (!route.params && !route.params.videoId) {
      navigation.goBack();
    }
  }, []);

  // just incase something happened and to prevent errors
  if (!videoData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <VideoPlayer />
      
      {
        (!videoPlayer.isFullScreen && videoData) && (
          <VideoPlayerDescription title={videoData.title} />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoPlayerScreen;
