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
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import config from '../common/config';
import httpClient from '../common/httpClient';

const width = Dimensions.get('window').width;
const store = {
  total: 0,
  page: 1,
  items: []
};

export default class List extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      dataSource: ds.cloneWithRows([
        {
            "id": "150000201302058122",
            "thumb": "http://dummyimage.com/1280x720/75ee50)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "220000201406032523",
            "thumb": "http://dummyimage.com/1280x720/21e490)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "640000198312085652",
            "thumb": "http://dummyimage.com/1280x720/34c2a0)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "71000020010602358X",
            "thumb": "http://dummyimage.com/1280x720/4e8a8d)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "450000199706096986",
            "thumb": "http://dummyimage.com/1280x720/7a62ac)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "810000199803252896",
            "thumb": "http://dummyimage.com/1280x720/62fad9)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "710000199007233041",
            "thumb": "http://dummyimage.com/1280x720/3a7957)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "120000201108318829",
            "thumb": "http://dummyimage.com/1280x720/b3b5d3)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "370000197510240721",
            "thumb": "http://dummyimage.com/1280x720/9952d3)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        },
        {
            "id": "440000201309041648",
            "thumb": "http://dummyimage.com/1280x720/965de8)",
            "title": "测试内容rpk3",
            "url": "http://v2.mukewang.com/28ae0fa3-e71e-4f3e-99c9-58458e5a9b51/L.mp4?auth_key=1480942624-0-0-05697b5c07624d5d4f815188fa8af34e"
        }
      ])
    };
  }
  _renderRow(row){
    return (
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image source={{uri: row.thumb}} style={styles.thumb}>
            <Icon name='ios-play' size={28} style={styles.play} />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon name='ios-heart-outline' size={28} style={styles.handleIcon} />
              <Text style={styles.handleTxt}>喜欢</Text>
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
  componentDidMount(){
    this._fetchData(store.page);
  }
  _fetchData(page){

    this.setState({
      isLoading: true
    });

    httpClient.get(config.api.creations, {
      accessToken: 'abcdef',
      page: page
    })
      .then((json) => {
        store.total = json.total;
        let items = store.items.slice();
        items = items.concat(json.data);
        store.items = items;
        if(json.success) {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
        console.error(error);
      });
  }
  _fetchMoreData(){
    if(this._hasMore() && !this.state.isLoading) {
      this._fetchData(store.page);
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
          renderRow={this._renderRow}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._fetchMoreData.bind(this)}
          onEndReachedThreshold={20}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
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
    color: '#ed7b06',
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