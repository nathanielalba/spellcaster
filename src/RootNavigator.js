import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import VideoListScreen from './screens/VideoListScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import theme from './theme';


const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: theme.navigation.headerStyle,
          headerTitleStyle: theme.navigation.headerTitleStyle,
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
          options={{
            headerTitleStyle: {
              color: 'red',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
