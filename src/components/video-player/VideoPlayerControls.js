import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'redux-zero/react';
import PropTypes from 'prop-types';

import { IconButton } from '../common';

const VideoPlayerControls = (props) => {
  const { toggleFullScreen } = props;
  const isFullScreen = useSelector(({ videoPlayer }) => videoPlayer.isFullScreen);
  const iconName = useMemo(() => isFullScreen ? 'fullscreen-exit' : 'fullscreen' ,[isFullScreen]);

  return (
    <View style={styles.container}>
      <IconButton
        name={iconName}
        size={32}              
        onPress={toggleFullScreen}
      />
    </View>
  );
};

VideoPlayerControls.propTypes = {
  toggleFullScreen: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default VideoPlayerControls;
