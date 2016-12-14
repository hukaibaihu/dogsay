/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
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
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'list'}
          renderIcon={() => <Icon name='ios-videocam-outline' size={28}/>}
          renderSelectedIcon={() => <Icon name='ios-videocam' color='#ee735c' size={28}/>}
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
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'edit'}
          renderIcon={() => <Icon name='ios-recording-outline' size={28}/>}
          renderSelectedIcon={() => <Icon name='ios-recording' color='#ee735c' size={28}/>}
          onPress={() => {
            this.setState({
              selectedTab: 'edit'
            })
          }}>
          <Edit />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'account'}
          renderIcon={() => <Icon name='ios-more-outline' size={28}/>}
          renderSelectedIcon={() => <Icon name='ios-more' color='#ee735c' size={28}/>}
          onPress={() => {
            this.setState({
              selectedTab: 'account'
            })
          }}>
          <Account />
        </TabNavigator.Item>
      </TabNavigator>
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
