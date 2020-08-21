import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CastButton } from 'react-native-google-cast';

const CastingButton = () => {
  return (
    <View style={styles.container}>
      <CastButton style={styles.castButton} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  castButton: {
    height: 32,
    width: 32,
    tintColor: 'white',
  },
})

export default CastingButton;
