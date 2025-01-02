import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, ScrollView, StyleSheet,TouchableWithoutFeedback} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
>>>>>>> mw
import SwitchToggle from 'react-native-switch-toggle';

const TAG = "MyPageAgree";
const imgBack = require('../assets/ic_back.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');

export default class MyPageAgree extends React.Component {
<<<<<<< HEAD
    constructor(props){
=======
    constructor(props) {
>>>>>>> mw
        super(props);
    }

    state = {
<<<<<<< HEAD
        pushAlarm : false,
        kakaoAlarm : false,
    }

    render(){
        return (
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>

                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
        pushAlarm: false,
        kakaoAlarm: false,
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>

                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
>>>>>>> mw
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

<<<<<<< HEAD
                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12}}>약관 및 개인정보 처리 동의</Text>

                    <View style = {{marginTop: 32, paddingLeft : 20, paddingRight : 20}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "1"})}>
                            <View style={{borderRadius : 24, backgroundColor : "#fff", paddingLeft : 20 , paddingRight : 20, flexDirection : 'row', width : '100%', height : 76, alignItems : 'center'}}>
                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000', flex : 1,}}>{"개인정보처리방침"}</Text>
                                <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>           
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "2"})}>
                            <View style={{marginTop: 16, borderRadius : 24, backgroundColor : "#fff", paddingLeft : 20 , paddingRight : 20, flexDirection : 'row', width : '100%', height : 76, alignItems : 'center'}}>
                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000', flex : 1,}}>{"개인정보 제3자 제공 동의"}</Text>
                                <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>                
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "3"})}>
                        <View style={{marginTop: 16, borderRadius : 24, backgroundColor : "#fff", paddingLeft : 20 , paddingRight : 20, flexDirection : 'row', width : '100%', height : 76, alignItems : 'center'}}>
                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000', flex : 1,}}>{"서비스 이용약관"}</Text>
                            <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>                 
                        </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                    
=======
                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>약관 및 개인정보 처리 동의</Text>

                    <View style={{ marginTop: 32, paddingLeft: 20, paddingRight: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "1" })}>
                            <View style={{ borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"개인정보처리방침"}</Text>
                                <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "2" })}>
                            <View style={{ marginTop: 16, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"개인정보 제3자 제공 동의"}</Text>
                                <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "3" })}>
                            <View style={{ marginTop: 16, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"서비스 이용약관"}</Text>
                                <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

>>>>>>> mw
                </View>
            </SafeAreaView>
        )
    }
}