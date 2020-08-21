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

const RootNavigator = () => {
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
