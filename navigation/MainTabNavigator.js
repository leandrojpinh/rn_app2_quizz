import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import QuizzScreen from '../screens/QuizzScreen';
import RankingScreen from '../screens/RankingScreen';
import UserScreen from '../screens/UserScreen';

const QuizzStack = createStackNavigator({
  Quizz: QuizzScreen,
});

QuizzStack.navigationOptions = {
  tabBarLabel: 'Quizz',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `logo-game-controller-b${focused ? '' : '-outline'}`
          : 'logo-game-controller-b'
      }
    />
  ),
};

const RankingStack = createStackNavigator({
  Ranking: RankingScreen,
});

RankingStack.navigationOptions = {
  tabBarLabel: 'Ranking',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const UserStack = createStackNavigator({
  User: UserScreen,
});

UserStack.navigationOptions = {
  tabBarLabel: 'Usuário',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  QuizzStack,
  RankingStack,
  UserStack,
});
