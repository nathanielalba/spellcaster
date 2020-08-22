import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'redux-zero/react';

import theme from '../../theme';

const CurrentlyCastingText = () => {
  const castingDevice = useSelector(({ casting }) => casting.device);

  return castingDevice && (
    <View style={styles.container}>
      <Text style={styles.text}>
        Currently casting to: {castingDevice.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: theme.colors.white,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default CurrentlyCastingText;
