import React, {
  useEffect,
  useState,
  useRef,
  createRef,
} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { useSelector, useAction } from 'redux-zero/react';
import { useNavigation, useRoute } from '@react-navigation/native';
import GoogleCast from 'react-native-google-cast';

import VideoPlayerControls from './VideoPlayerControls';
import { CurrentlyCastingText } from '../casting';
import theme from '../../theme';

const VideoPlayer = (props) => {
  const route = useRoute();
  const videoId = route.params.videoId;
  const videoPlayer = useSelector(({ videoPlayer }) => videoPlayer);
  const videoData = useSelector(({ videos }) => videos.data.find((v) => v.id === videoId));
  const casting = useSelector(({ casting }) => casting);
  const [isShowingControls, setIsShowingControls] = useState(false);
  // we need to track if it's full screen or not to optionally hide the navbar
  const videoPlayback = useSelector(({ videoPlayback }) => videoPlayback[videoId]);
  const controlsRef = useRef();
  const videoPlayerRef = createRef();
  const navigation = useNavigation();
  const updateFullscreen = useAction((state) => {
    return {
      ...state,
      videoPlayer: {
        isFullScreen: !state.videoPlayer.isFullScreen,
      },
    };
  });
  const updateVideoPlayback = useAction((state, args) => {
    return {
      ...state,
      videoPlayback: {
        ...state.videoPlayback,
        [videoId]: {
          ...state.videoPlayback[videoId],
          ...args,
        },
      },
    };
  });

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
  }, []);

  // conditionally show the header, along with status bar to give that 'fullscreen' effect
  useEffect(() => {
    navigation.setOptions({ headerShown: !videoPlayer.isFullScreen });
    StatusBar.setHidden(videoPlayer.isFullScreen);
  }, [videoPlayer]);

  useEffect(() => {
    if (casting.isCasting) {
      GoogleCast.castMedia({
        ...videoData,
        playPosition: (videoPlayback && videoPlayback.currentTime)
          ? videoPlayback.currentTime
          : 0,
      });

      GoogleCast.launchExpandedControls();
    } else {
      GoogleCast.endSession();
    }
  }, [casting]);

  // RNV related event functions
  const onLoad = (payload) => {
    updateVideoPlayback({ duration: payload.duration });
  };

  const onProgress = (payload) => {
    updateVideoPlayback({ currentTime: payload.currentTime });
  };

  const onError = (args) => {
    console.log('error', args);
  };

  // UI based functions for controls
  const toggleFullScreen = () => {
    if (videoPlayerRef && videoPlayerRef.current !== null) {
      if (videoPlayer.isFullScreen) {
        videoPlayerRef.current.dismissFullscreenPlayer();
        updateFullscreen();
      } else {
        videoPlayerRef.current.presentFullscreenPlayer();
        updateFullscreen();
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

  console.log('casting', casting);

  return (
    <View style={styles.container}>
      {
        casting.isCasting
          ? (
            <View style={styles.videoPlayerContainer}>
              <CurrentlyCastingText />
            </View>
          ) : (
            <View
              style={styles.videoPlayerContainer}
              onStartShouldSetResponder={handleShowingControls}
            >
              {
                isShowingControls && (
                  <VideoPlayerControls toggleFullScreen={toggleFullScreen} />
                )
              }
        
              <Video
                allowsExternalPlayback
                controls
                source={{ uri: videoData.mediaUrl }}
                ref={videoPlayerRef}
                onError={onError}
                onLoad={onLoad}
                fullscreen={true}
                onProgress={onProgress}
                style={styles.videoPlayer}
              />
            </View>
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  videoPlayer: {
    height: '100%',
    width: '100%',
  },
  videoPlayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

export default VideoPlayer;
