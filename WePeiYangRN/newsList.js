'use strict';

import React, {
  Component,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

var API_URL = 'http://open.twtstudio.com/api/v1/news/1/page/1';
var NewsDetail = require('./newsDetail.js')

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.renderData = this.renderData.bind(this); // 否则无法在 renderData() 里获取到 this
        this.selectData = this.selectData.bind(this)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        };
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                loaded: true,
            });
        }).done();
    }
    
    render() {
        if (!this.state.loaded) {
            // return this.renderLoadingView()
        }
        
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderData}
                style={styles.listView}
            />
        );
    }
    
    renderData(data) {
        return (
            <TouchableHighlight onPress={() => this.selectData(data)}>
            <View style={styles.container}>
                <Image
                    source={{uri: data.pic}}
                    style={styles.image}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{data.subject}</Text>
                    <Text style={styles.summary}>{data.summary}</Text>
                </View>
            </View>
            </TouchableHighlight>
        );
    }
    
    selectData(data) {
        this.props.navigator.push({
            title: data.subject,
            component: NewsDetail,
            passProps: {data}
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
      backgroundColor: 'white'
  },
  rightContainer: {
      flex: 1
  },
  title: {
      fontSize: 16,
      margin: 8,
      textAlign: 'left',
  },
  image: {
      width: 96,
      height: 72,
      margin: 8
  },
  summary: {
      fontSize: 12,
      marginLeft: 8,
      marginRight: 8,
      marginTop: -4,
      textAlign: 'left',
      color: 'gray'
  }
});

module.exports = NewsList