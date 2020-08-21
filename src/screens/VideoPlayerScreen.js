import React, { createRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video';
import { CastButton } from 'react-native-google-cast';

const VideoPlayerScreen = () => {
  const videoPlayerRef = createRef();

  const onBuffer = () => {};

  const onLoad = (payload) => {
    // dispatch here to update store with data if it doesn't already exist
    // payload.duration
  };

  const onProgress = () => {

  };

  const onError = (...args) => {
    console.log('error', ...args);
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoPlayerContainer}>
        <VideoPlayer
          allowsExternalPlayback
          controls
          source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
          ref={videoPlayerRef}
          onError={onError}
          onBuffer={onBuffer}
          onLoad={onLoad}
          onProgress={onProgress}
          style={styles.videoPlayer}
        >
          <View style={styles.videoContentContainer}>
            <Text>FS</Text>
            
            <CastButton />
          </View>
        </VideoPlayer>
      </View>

      <View style={styles.videoDetailsContainer}>
        <Text>EXAMPLE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayerContainer: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  videoContentContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoDetailsContainer: {
    flex: 1,
  },
});

export default VideoPlayerScreen;
