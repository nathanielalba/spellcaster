import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes, { string } from 'prop-types';

const VideoPlayerDescription = (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Text>
        Now Playing:
      </Text>

      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

VideoPlayerDescription.propTypes = {
  title: string,
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: 15,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default VideoPlayerDescription;
