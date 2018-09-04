import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Bookcase from './screens/bookcase';
import Explore from './screens/explore';
import AddBook from './screens/addbook';
import Lists from './screens/lists';
import Profile from './screens/profile';

let screen = Dimensions.get('window');

export const Tabs = TabNavigator({
  'Bookcase': {
    screen: Bookcase,
    navigationOptions: {
      tabBarLabel: 'Bookcase',
      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    }
  },
  'Explore': {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-map" type="ionicon" size={28} color={tintColor} />
    }
  },
  'Add Book': {
    screen: AddBook,
    navigationOptions: {
      tabBarLabel: 'Add Book',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
    }
  },
  'Lists': {
    screen: Lists,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: ({ tintColor }) => <Icon name="lists" type="entypo" size={28} color={tintColor} />
    }
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-person" type="ionicon" size={28} color={tintColor} />
    }
  }
});

export const createRootNavigator = () => {
  return StackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal'
    }
  );
};
