import React from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Webview from 'react-native-webview';

const TAG = "AboutWebview";
const imgBack = require('../assets/ic_back.png');

export default class AboutWebview extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        webheight:100,
    }
    onMessage(data) {
        //Prints out data that was passed.
        console.log(data);
    }
  
  true; // note: this is required, or you'll sometimes get silent failures;
    render(){
        console.log(TAG,'tag : ' + this.props.route.params.tag)
        let url = '';

        if(this.props.route.params.tag == 'staff'){
            url = 'https://www.hifertility.co.kr/about/staff.do';
        }else if(this.props.route.params.tag == 'reservation'){
            url = 'https://www.hifertility.co.kr/contact/reservation.do';
        }else if(this.props.route.params.tag == 'news'){
            url = 'https://www.hifertility.co.kr/news/notice_view2?num='+this.props.route.params.num;
        }else if(this.props.route.params.tag == 'question'){
            url = 'https://www.hifertility.co.kr/contact/shout.do';
        }else if(this.props.route.params.tag == 'caution'){
            url = 'https://www.hifertility.co.kr/contact/reservation.do';
        }else if(this.props.route.params.tag == 'business'){
            url = 'https://www.hifertility.co.kr/guide/support.do';
        }else if(this.props.route.params.tag == 'pregnancy'){
            url = 'https://www.hifertility.co.kr/news/pregnancy.do';
        }

        return (
            <SafeAreaView>
                <View style={{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style = {{backgroundColor : 'transparent', flex : 1}}>
                        <Webview style = {{backgroundColor : 'white', height: this.state.webheight, width : '100%', height : '100%'}}  source = {{uri : url}} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}