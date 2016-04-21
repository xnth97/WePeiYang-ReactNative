/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View,
} from 'react-native';

var NewsList = require('./newsList.js')

class WePeiYangRN extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'news'
    };
  }
  
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="天大要闻"
          selected={this.state.selectedTab === 'news'}
          onPress={() => {
            this.setState({
              selectedTab: 'news',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '天大要闻',
              component: NewsList
            }}
           />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="校园公告"
          selected={this.state.selectedTab === 'notice'}
          onPress={() => {
            this.setState({
              selectedTab: 'notice',
            });
          }}>
          <View></View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

AppRegistry.registerComponent('WePeiYangRN', () => WePeiYangRN);
