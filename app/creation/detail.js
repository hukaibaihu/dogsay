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
  ActivityIndicator,
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
      rate: 1.0,
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
    console.log(data);
    let total = data.playableDuration;
    let currentTime = data.currentTime;
    let percent = (currentTime / total).toFixed(2) - 0;

    let newState = {
      duration: total,
      currentTime: currentTime.toFixed(2) - 0,
      percent: percent
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
      percent: 1,
      playing: false
    });
  }
  _onError(err) {
    console.log(err)
  }
  _replay() {
    this.refs.player.seek(0);
  }
  render() {
    let data = this.props.data;
    return (
      <View style={styles.container}>
        <Text onPress={this._back.bind(this)}>详情页面</Text>
        <View style={styles.videoBox}>
          <Video ref={'player'}
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
            onLoadStart={this._onLoadStart}  // Callback when video starts to load
            onLoad={this._onLoad}            // Callback when video loads
            onProgress={this._onProgress}    // Callback every ~250ms with currentTime
            onEnd={this._onEnd}              // Callback when playback finishes
            onError={this._onError} />
          { !this.state.loaded && <ActivityIndicator color={'#fff'} style={styles.loading} /> }
          { this.state.loaded && !this.state.playing
            ? <Icon
              style={styles.playIcon}
              name={'ios-play'}
              size={48}
              onPress={this._replay.bind(this)} />
            : null }
          <View style={styles.progressBox}>
            <View style={[styles.progressBar, {width: width * this.state.percent}]} />
          </View>
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
  },
  loading: {
    position: 'absolute',
    width: width,
    top: 100,
    left: 0,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },
  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#f60'
  },
  playIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: width / 2 - 30,
    top: 80,
    paddingTop: 6,
    paddingLeft: 20,
    color: '#ed7b66',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30
  }
});