import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Webview from 'react-native-webview';

const TAG = "AboutWebview";
const imgBack = require('../assets/ic_back.png');

=======
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import Webview from 'react-native-webview';
import ServerUrl from './Common/ServerUrl';
import Users from './Common/User'
import FetchingIndicator from 'react-native-fetching-indicator'

const TAG = "AboutWebview";
const imgBack = require('../assets/ic_back.png');
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
>>>>>>> mw
export default class AboutWebview extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
<<<<<<< HEAD
        webheight:100,
=======
        webheight: 100,
        url: '',
        isFetching: true,
>>>>>>> mw
    }
    onMessage(data) {
        //Prints out data that was passed.
        console.log(data);
    }
<<<<<<< HEAD
  
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
=======

    componentDidMount() {
        if (this.props.route.params.tag == 'staff') {
            this.state.url = 'https://www.hifertility.co.kr/about/staff.do';
        } else if (this.props.route.params.tag == 'reservation') {
            this.state.url = 'https://www.hifertility.co.kr/contact/reservation.do';
        } else if (this.props.route.params.tag == 'news') {
            this.state.url = 'https://www.hifertility.co.kr/news/notice_view2?num=' + this.props.route.params.num;
        } else if (this.props.route.params.tag == 'question') {
            this.state.url = 'https://www.hifertility.co.kr/contact/shout.do';
        } else if (this.props.route.params.tag == 'caution') {
            this.state.url = 'https://www.hifertility.co.kr/contact/reservation.do';
        } else if (this.props.route.params.tag == 'business') {
            this.state.url = 'https://www.hifertility.co.kr/guide/support.do';
        } else if (this.props.route.params.tag == 'pregnancy') {
            this.state.url = 'https://www.hifertility.co.kr/news/pregnancy.do';
        } else if (this.props.route.params.tag == 'banner') {
            this.state.url = this.props.route.params.url;
        } else if (this.props.route.params.tag == 'loginStatusChart') {
            this.state.url = 'https://hi-admin.co.kr/ValidateUserIndex';
        }
    }

    _ChartCheck() {
        var details = {
            'name': Users.userName,
            'phone': Users.userPhoneNumber,
            'birthDate': Users.userBirthday,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.Server + "/userApi/select-checkup-list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default',
            body: formBody,
        }).then(
            response => response.json()
        ).then(
            json => {
                console.log(TAG, json);
                if (json.Error_Cd == "0000") {
                    // console.log(Users.userName,)
                    if (Object.keys(json.Resources).length > 0) {
                        console.log('1')
                        this.state.url = ServerUrl.Server + '/MedicalExamIndex?patient_no=' + Users.paitentNo
                    } else {
                        console.log('2')
                        this.state.url = ServerUrl.Server + '/ValidateUserIndex'
                    }
                } else {
                    this.setState({
                        isLoading: true,
                    })
                }
            }
        )
    }

    render() {
        if (this.props.route.params.tag == 'staff') {
            this.state.url = 'https://www.hifertility.co.kr/about/staff.do';
        } else if (this.props.route.params.tag == 'reservation') {
            this.state.url = 'https://www.hifertility.co.kr/contact/reservation.do';
        } else if (this.props.route.params.tag == 'news') {
            this.state.url = 'https://www.hifertility.co.kr/news/notice_view2?num=' + this.props.route.params.num;
        } else if (this.props.route.params.tag == 'question') {
            this.state.url = 'https://www.hifertility.co.kr/contact/shout.do';
        } else if (this.props.route.params.tag == 'caution') {
            this.state.url = 'https://www.hifertility.co.kr/contact/reservation.do';
        } else if (this.props.route.params.tag == 'business') {
            this.state.url = 'https://www.hifertility.co.kr/guide/support.do';
        } else if (this.props.route.params.tag == 'pregnancy') {
            this.state.url = 'https://www.hifertility.co.kr/news/pregnancy.do';
        } else if (this.props.route.params.tag == 'banner') {
            this.state.url = this.props.route.params.url;
        } else if (this.props.route.params.tag == 'loginStatusChart') {
            this.state.url = 'https://hi-admin.co.kr/ValidateUserIndex';
        } else if (this.props.route.params.tag == 'home') {
            console.log(ServerUrl.Server + '/MedicalExamIndex?patient_no=' + Users.paitentNo)
            console.log(Users.paitentNo)
            this.state.url = ServerUrl.Server + '/MedicalExamIndex?patient_no=' + Users.paitentNo
        } else if (this.props.route.params.tag == 'home_first_chart') {
            this.state.url = ServerUrl.Server + '/ValidateUserIndex'
        } else if (this.props.route.params.tag == 'adminChart') {
            this.state.url = this.props.route.params.url
        }
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                        <Webview onLoad={() => this.setState({ isFetching: false })} mediaPlaybackRequiresUserAction={true} originWhitelist={['*']} style={{ backgroundColor: 'white', height: this.state.webheight, width: '100%', height: '100%' }} source={{ uri: this.state.url }} />
                    </View>
                    <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' />
>>>>>>> mw
                </View>
            </SafeAreaView>
        )
    }
}