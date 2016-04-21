'use strict';

import React, {
  Component,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View,
  Image,
  WebView
} from 'react-native';

var API_URL = 'http://open.twtstudio.com/api/v1/news/'

class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.fetchData = this.fetchData.bind(this);
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData() {
        fetch(API_URL+this.props.data.index).then((response) => response.json()).then((responseData) => {
            this.setState({
                content: responseData.content
            });
        }).done();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <WebView 
                    source={{uri: 'http://news.twt.edu.cn/?c=default&a=pernews&id='+this.props.data.index}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  baseText: {
      fontSize: 16,
      margin: 0
  }
});

module.exports = NewsDetail