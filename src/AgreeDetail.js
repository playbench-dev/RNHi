import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView,Platform} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
>>>>>>> mw
import Webview from 'react-native-webview';
const TAG = "AgreeDetail";
const imgBack = require('../assets/ic_back.png');

export default class AgreeDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
<<<<<<< HEAD
        webheight : 100,
    }

    _html(){
        if(Platform.OS === 'ios' && this.props.route.params.mode == '1'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {require('../assets/policy.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        }else if(Platform.OS === 'ios' && this.props.route.params.mode == '2'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {require('../assets/policy_service.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        }else if(Platform.OS === 'ios' && this.props.route.params.mode == '3'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {require('../assets/service.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        }else if(Platform.OS === 'android' && this.props.route.params.mode == '1'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {{uri:'file:///android_asset/policy.html'}}></Webview>
            )
        }else if(Platform.OS === 'android' && this.props.route.params.mode == '2'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {{uri:'file:///android_asset/policy_service.html'}}></Webview>
            )
        }else if(Platform.OS === 'android' && this.props.route.params.mode == '3'){
            return(
                <Webview style = {{backgroundColor : 'white', flex : 1}}  source = {{uri:'file:///android_asset/service.html'}}></Webview>
=======
        webheight: 100,
    }

    _html() {
        if (Platform.OS === 'ios' && this.props.route.params.mode == '1') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} originWhitelist={['*']} source={require('../assets/policy.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        } else if (Platform.OS === 'ios' && this.props.route.params.mode == '2') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} originWhitelist={['*']} source={require('../assets/policy_service.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        } else if (Platform.OS === 'ios' && this.props.route.params.mode == '3') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} originWhitelist={['*']} source={require('../assets/service.html')} javaScriptEnabled={true} domStorageEnabled={true}></Webview>
            )
        } else if (Platform.OS === 'android' && this.props.route.params.mode == '1') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} source={{ uri: 'file:///android_asset/policy.html' }}></Webview>
            )
        } else if (Platform.OS === 'android' && this.props.route.params.mode == '2') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} source={{ uri: 'file:///android_asset/policy_service.html' }}></Webview>
            )
        } else if (Platform.OS === 'android' && this.props.route.params.mode == '3') {
            return (
                <Webview style={{ backgroundColor: 'white', flex: 1 }} source={{ uri: 'file:///android_asset/service.html' }}></Webview>
>>>>>>> mw
            )
        }
    }

    render() {
        let title = '';

<<<<<<< HEAD
        if(this.props.route.params.mode == '1'){
            title = "개인정보처리 약관"
        }else if(this.props.route.params.mode == '2'){
            title = "개인정보 제3자 제공 동의"
        }else if(this.props.route.params.mode == '3'){
=======
        if (this.props.route.params.mode == '1') {
            title = "개인정보처리 약관"
        } else if (this.props.route.params.mode == '2') {
            title = "개인정보 제3자 제공 동의"
        } else if (this.props.route.params.mode == '3') {
>>>>>>> mw
            title = "서비스 이용약관"
        }

        return (
            <SafeAreaView>
<<<<<<< HEAD
                <View style = {{width: '100%', height: '100%', backgroundColor: '#fff'}}>    
                    <View style = {{width : '100%', height : 40}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 40, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
                <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                    <View style={{ width: '100%', height: 40 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 40, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
>>>>>>> mw
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

<<<<<<< HEAD
                    <View style = {{backgroundColor : 'white', flex : 1,}}>
=======
                    <View style={{ backgroundColor: 'white', flex: 1, }}>
>>>>>>> mw
                        {this._html()}
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}