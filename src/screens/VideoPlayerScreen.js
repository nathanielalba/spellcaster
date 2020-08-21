import React, { createRef, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { useNavigation } from '@react-navigation/native';

import { useCasting, useDimensions } from '../hooks';
import { isPortrait } from '../utils';
import theme from '../theme';

const VideoPlayerScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [castState, device] = useCasting();
  const videoPlayerRef = createRef();
  const navigation = useNavigation();

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

  const toggleFullScreen = () => {
    if (videoPlayerRef && videoPlayerRef.current !== null) {
      if (isFullScreen) {
        videoPlayerRef.current.dismissFullscreenPlayer();
        setIsFullScreen(false);
      } else {
        videoPlayerRef.current.presentFullscreenPlayer();
        setIsFullScreen(true);  
      }
    }
  };

  useEffect(() => {
    // conditionally show the header, along with status bar
    navigation.setOptions({ headerShown: !isFullScreen });
    StatusBar.setHidden(isFullScreen);
  }, [isFullScreen])

  return (
    <View style={styles.container}>
      <View style={styles.videoPlayerContainer}>
        <View style={styles.videoPlayer}>
          <View style={{position: 'absolute', top: 0, right: 0, left: 0, flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, zIndex: 10}}>
            <TouchableOpacity onPress={toggleFullScreen}>
              <View>
                <Text style={{color: 'white', fontSize: 24}}>FS</Text>
              </View>
            </TouchableOpacity>
            <CastButton style={{ height: 24, width: 24, backgroundColor: 'white' }} />
          </View>

          <VideoPlayer
            allowsExternalPlayback
            controls
            source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
            ref={videoPlayerRef}
            onError={onError}
            onBuffer={onBuffer}
            onLoad={onLoad}
            fullscreen={true}
            onProgress={onProgress}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
      
      {
        !isFullScreen && (
          <View style={styles.videoDetailsContainer}>
          </View>  
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayerContainer: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  videoPlayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  videoContentContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoDetailsContainer: {
    flex: 1,
  },
});

export default VideoPlayerScreen;
