import React, {
  createRef,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from '../components/common';
import { useCasting } from '../hooks';
import { isPortrait } from '../utils';
import theme from '../theme';

const VideoPlayerScreen = () => {
  // we need to track if it's full screen or not to optionally hide the navbar
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowingControls, setIsShowingControls] = useState(false);
  const [castState, device] = useCasting();
  const videoPlayerRef = createRef();
  const navigation = useNavigation();
  const controlsRef = useRef();

  useEffect(() => {
    // ensure that the status bar is set to visible
    return () => {
      StatusBar.setHidden(false);
      
      // if it just so happens that we back out of the screen,
      // clear the timer
      if (controlsRef.current) {
        clearTimeout(controlsRef.current);
      }
    };
  },[]);

  // conditionally show the header, along with status bar to give that 'fullscreen' effect
  useEffect(() => {
    navigation.setOptions({ headerShown: !isFullScreen });
    StatusBar.setHidden(isFullScreen);
  }, [isFullScreen]);

  // keep track of the icon name based on is full screen or not
  const iconName = useMemo(() => isFullScreen ? 'fullscreen-exit' : 'fullscreen' ,[isFullScreen]);

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

  // handle showing controls to 'mimic' the controls that exoplayer provides us
  const handleShowingControls = () => {
    // if it's already showing, clear out the timeout and set to null to remove dangling
    if (isShowingControls) {
      clearTimeout(controlsRef.current);
      controlsRef.current = null;
      setIsShowingControls(false);
    } else {
      // doesn't exist yet, so set it up
      setIsShowingControls(true);
      controlsRef.current = setTimeout(() => setIsShowingControls(false), 5000);  
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoPlayerContainer}>
          <View style={styles.videoPlayer} onStartShouldSetResponder={handleShowingControls}>
            {
              isShowingControls && (
                <View style={{position: 'absolute', top: 0, right: 0, left: 0, flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, zIndex: 1}}>
                  <IconButton
                    name={iconName}
                    size={32}              
                    onPress={toggleFullScreen}
                  />
    
                  <CastButton style={{ height: 24, width: 24, backgroundColor: 'white' }} />
                </View>
              )
            }

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
