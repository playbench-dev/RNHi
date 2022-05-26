import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, NativeModules, Dimensions } from 'react-native';
import Webview from 'react-native-webview';

const TAG = "AdminWebView";

export default class AdminWebView extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {

  }

  componentWillUnmount() {
    console.log(TAG, 'unmount')
  }

  state = {
    webheight: 100,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    rotate: 0,
  }

  render() {
    let url = 'https://hi-admin.co.kr';

    return (
      <SafeAreaView style={{ transform: [{ rotate: this.state.rotate + 'deg' }] }}>
        <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
          <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <Webview style={{ backgroundColor: 'white', height: this.state.webheight, width: '100%', height: '100%' }} source={{ uri: url }} />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}