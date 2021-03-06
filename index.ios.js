/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  TabBarIOS,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/account/index';

export default class dogsay extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'list'
    };
  }
  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }
  render() {
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list'
            })
          }}>
          <Navigator
            initialRoute={{
              title: 'list',
              index: 0,
              component: List
            }}
            configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) => {
              let ListComponent = route.component;
              return <ListComponent {...route.params} navigator={navigator} />
            }} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            })
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          }}>
          <Account />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('dogsay', () => dogsay);
