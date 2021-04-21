import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Imports
import FlatListAnimation from './screens/FlatListAnimation';
import DonutChart from './screens/DonutChart/DonutChart';
import CarouselAnimation from './screens/CarouselAnimation';
import ThreeDCarouselAnimation from './screens/3DCarouselAnimation';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator initialRouteName='3DCarousel' screenOptions={{ headerShown: false }} >
        <Stack.Screen name="FlatList" component={FlatListAnimation} />
        <Stack.Screen name="Donut" component={DonutChart} />
        <Stack.Screen name="Carousel" component={CarouselAnimation} />
        <Stack.Screen name="3DCarousel" component={ThreeDCarouselAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
