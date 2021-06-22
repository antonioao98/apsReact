import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Home, Cart, Details, Options } from '../pages/screens';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Icon name="home-outline" color="#000" size={18} />;
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{ color: focused ? color : '#000' }}>Home</Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Lista"
        component={Cart}
        options={{
          tabBarIcon: () => {
            return <Icon name="cart-outline" color="#000" size={18} />;
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{ color: focused ? color : '#000' }}>Lista</Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
