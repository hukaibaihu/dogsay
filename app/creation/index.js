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
  ListView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
  AlertIOS,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Detail from './detail';

import config from '../common/config';
import httpClient from '../common/httpClient';
import rowData from './rowData.json';

const width = Dimensions.get('window').width;
const store = {
  total: 0,
  page: 1,
  items: []
};

class Item extends Component {
  constructor(props) {
    super(props);
    let row = props.row;
    this.state = {
      row: row,
      up: false
    };
  }
  _up() {
    httpClient.post(config.api.up, {
      accessToken: 'abde',
      up: this.state.up ? '0' : '1'
    })
      .then((data) => {
        if(data && data.success) {
          this.setState({
            up: !this.state.up
          });
        } else {
          AlertIOS.alert('点赞失败，请稍后再试');
        }
      })
      .catch((err) => {
        AlertIOS.alert('点赞失败，请稍后再试');
        console.log(err);
      });
  }
  render() {
    let row = this.state.row;
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image source={{uri: row.thumb}} style={styles.thumb}>
            <Icon name='ios-play' size={28} style={styles.play} />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                size={28}
                style={[styles.handleIcon, this.state.up ? styles.up : null]}
                onPress={this._up.bind(this)}
              />
              <Text style={styles.handleTxt} onPress={this._up.bind(this)}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon name='ios-chatboxes-outline' size={28} style={styles.handleIcon} />
              <Text style={styles.handleTxt}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class List extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      isRefreshing: false,
      dataSource: ds.cloneWithRows(rowData)
    };
  }
  _loadPage(row) {
    this.props.navigator.push({
      title: 'detail',
      index: 1,
      component: Detail,
      params: {
        data: row
      }
    });
  }
  _renderRow(row){
    return <Item
              key={row.id}
              row={row}
              onSelect={(() => this._loadPage(row)).bind(this)} />
  }
  componentDidMount(){
    this._fetchData(store.page);
  }
  _fetchData(page){

    if(page != 0) {
      this.setState({
        isLoading: true
      });
    } else {
      this.setState({
        isRefreshing: true
      });
    }

    httpClient.get(config.api.creations, {
      accessToken: 'abcdef',
      page: page
    })
      .then((json) => {
        if(json.success) {
          let items = store.items.slice();

          if(page != 0) {
            items = items.concat(json.data);
            store.page += 1;
          } else {
            items = json.data.concat(items);
          }

          store.items = items;
          store.total = json.total;

          if(page != 0) {
            this.setState({
              isLoading: false,
              dataSource: this.state.dataSource.cloneWithRows(items)
            });
          } else {
            this.setState({
              isRefreshing: false,
              dataSource: this.state.dataSource.cloneWithRows(items)
            });
          }
        }
      })
      .catch((error) => {
        if(page != 0) {
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({
            isRefreshing: false
          })
        }
        console.error(error);
      });
  }
  _fetchMoreData(){
    if(this._hasMore() && !this.state.isLoading) {
      this._fetchData(store.page);
    }
  }
  _onRefresh() {
    if(this._hasMore() && !this.state.isRefreshing) {
      this._fetchData(0);
    }
  }
  _hasMore(){
    return store.items.length < store.total;
  }
  _renderFooter(){
    if(!this._hasMore() && store.total != 0) {
      return (
        <View style={styles.loadWrap}>
          <Text style={styles.loadTxt}>没有更多了</Text>
        </View>
      )
    }

    if(!this.state.isLoading) {
      return <View style={styles.loadWrap} />
    }

    return <ActivityIndicator style={styles.loadWrap} />
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          onEndReached={this._fetchMoreData.bind(this)}
          onEndReachedThreshold={20}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#ff6600'
              title='正在刷新...'
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff'
  },
  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  thumb: {
    width: width,
    height: width * 9 / 16,
    resizeMode: 'cover'
  },
  play: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#ed7b66',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 23
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width / 2 - 0.5,
    padding: 10,
    backgroundColor: '#fff'
  },
  handleIcon: {
    fontSize: 22,
    color: '#333'
  },
  up: {
    color: '#ed7b66'
  },
  handleTxt: {
    paddingLeft: 18,
    fontSize: 18,
    color: '#333'
  },
  loadWrap: {
    marginVertical: 20
  },
  loadTxt: {
    color: '#777',
    textAlign: 'center'
  }
});