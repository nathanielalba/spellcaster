import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAction } from 'redux-zero/react';

// Screens
import VideoListScreen from './screens/VideoListScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

import { CastingButton } from './components/casting';
import { useCasting } from './hooks';
import theme from './theme';

const Stack = createStackNavigator();

// generic transition config for react navigation
const transitionConfig = {
  damping: 750,
  stiffness: 1000,
  overshootClamping: true,
};

// flips card along Y axis during scene navigation
const flipY = ({ index, current }) => {
  return {
    cardStyle: {
      transform: [
        {
          rotateY: current.progress.interpolate({
            inputRange: [index - 1, index],
            outputRange: ['180deg', '0deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    }
  }
}

const RootNavigator = () => {
  // have this hook here so the chromecast can always be listening to events
  const updateCasting = useAction((state, args) => ({ ...state, casting: { ...args } }));
  const [isCasting, device] = useCasting();
  useEffect(() => {
    updateCasting({ isCasting, device });
  }, [isCasting, device]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: theme.navigation.headerStyle,
          headerTitleStyle: theme.navigation.headerTitleStyle,
          headerRight: () => (
            <CastingButton />
          ),
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
          cardStyleInterpolator: flipY,
        }}
      >
        <Stack.Screen
          name={'VideoList'}
          component={VideoListScreen}
          options={{
            headerTitle: 'Make Some Magic'
          }}
        />

        <Stack.Screen
          name={'VideoPlayer'}
          component={VideoPlayerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
