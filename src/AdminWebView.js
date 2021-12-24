import React from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback,NativeModules, Dimensions} from 'react-native';
import Webview from 'react-native-webview';
import Orientation from 'react-native-orientation';

const TAG = "AdminWebView";

export default class AdminWebView extends React.Component {
    constructor(props) {
        super(props);
    }

    
    componentDidMount(){
        // Orientation.addSpecificOrientationListener(this._orientationDidChange);
    }

    componentWillUnmount(){
        console.log(TAG,'unmount')
        // Orientation.removeSpecificOrientationListener(this._orientationDidChange);
    }

    state = {
        webheight:100,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        rotate : 0,
    }
  
    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE-LEFT') {
          // do something with landscape layout
          console.log(TAG,'land left');
          this.setState({
            width : Dimensions.get('screen').height,
            height : Dimensions.get('screen').width,
            rotate : -270,
          })
        }else if (orientation === 'LANDSCAPE-RIGHT') {
            // do something with landscape layout
            console.log(TAG,'land right');
            this.setState({
              width : Dimensions.get('screen').height,
              height : Dimensions.get('screen').width,
              rotate : -90,
            })
        }else if(orientation === 'PORTRAITUPSIDEDOWN'){
            // do something with portrait layout
            console.log(TAG,'port down');
            this.setState({
              width : Dimensions.get('screen').width,
              height : Dimensions.get('screen').height,
              rotate : -180,
            })
        } else {
          // do something with portrait layout
          console.log(TAG,'port');
          this.setState({
            width : Dimensions.get('screen').width,
            height : Dimensions.get('screen').height,
            rotate : 0,
          })
        }
      }

    render(){
        let url = 'https://hi-admin.co.kr';

        return (
            <SafeAreaView style = {{transform: [{ rotate: this.state.rotate+'deg' }]}}>
                <View style={{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{backgroundColor : 'transparent', flex : 1}}>
                        <Webview style = {{backgroundColor : 'white', height: this.state.webheight, width : '100%', height : '100%'}}  source = {{uri : url}} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}