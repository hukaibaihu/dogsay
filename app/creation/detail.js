/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data,
      rate: 3.0,
      volume: 1.0,
      muted: false,
      paused: false,
      resizeMode: 'contain',
      repeat: false,

      duration: 0,
      currentTime: 0,
      percent: 0.01,

      playing: false,
      loaded: false
    };
  }
  _back() {
    this.props.navigator.pop();
  }
  _onLoadStart() {
    console.log('load start')
  }
  _onLoad() {
    console.log('load');
  }
  _onProgress(data) {
    let total = data.playableDuration;
    let newState = {
      duration: total,
      currentTime: data.currentTime,
      percent: (total / data.currentTime).toFixed(2) - 0
    };

    if(!this.state.loaded) {
      newState.loaded = true;
    }

    if(!this.state.playing) {
      newState.playing = true;
    }

    this.setState(newState);
  }
  _onEnd() {
    this.setState({
      playing: false
    });
    console.log('end')
  }
  _onError(err) {
    console.log(err)
  }
  render() {
    let data = this.props.data;
    return (
      <View style={styles.container}>
        <Text onPress={this._back.bind(this)}>详情页面</Text>
        <View style={styles.videoBox}>
          <Video ref={((ref) => {this.player = ref}).bind(this)}
            style={styles.video}
            source={{uri: data.url}}
            rate={this.state.rate}                      // 0 is paused, 1 is normal.
            muted={this.state.muted}                    // Mutes the audio entirely.
            volume={this.state.volume}                  // 0 is muted, 1 is normal.
            paused={this.state.paused}                  // Pauses playback entirely.
            resizeMode={this.state.resizeMode}          // Fill the whole screen at aspect ratio.
            repeat={this.state.repeat}                  // Repeat forever.
            playInBackground={false}                    // Audio continues to play when app entering background.
            playWhenInactive={false}                    // [iOS] Video continues to play when control or notification center are shown.
            progressUpdateInterval={250.0}              // [iOS] Interval to fire onProgress (default to ~250ms)
            onLoadStart={this._onLoadStart.bind(this)}  // Callback when video starts to load
            onLoad={this._onLoad.bind(this)}            // Callback when video loads
            onProgress={this._onProgress.bind(this)}    // Callback every ~250ms with currentTime
            onEnd={this._onEnd.bind(this)}              // Callback when playback finishes
            onError={this._onError.bind(this)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  videoBox: {
    width: width,
    height: width * 9 / 16,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: width * 9 / 16,
    backgroundColor: '#000'
  }
});