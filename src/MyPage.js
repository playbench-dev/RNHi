import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TowBtnDialog from './Common/TwoBtnDialog'
import Users from './Common/User'
import VersionInfo from 'react-native-version-info';
import ServerUrl from './Common/ServerUrl'
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TowBtnDialog from './Common/TwoBtnDialog'
import LogoutDialog from './Common/LogoutDialog'
import Users from './Common/User'
import VersionInfo from 'react-native-version-info';
import ServerUrl from './Common/ServerUrl'
import Toast from 'react-native-toast-message';
import Moment from 'moment'
>>>>>>> mw

const TAG = "MyPage";
const imgBack = require('../assets/ic_calendar_back.png');
const imgLogo = require('../assets/ic_my_page_logo.png');
const imgName = require('../assets/ic_my_page_name.png');
const imgBirth = require('../assets/ic_my_page_birth.png');
const imgNumber = require('../assets/ic_my_page_number.png');
const imgHusbandName = require('../assets/ic_my_page_husband_name.png');
const imgHusbandPhone = require('../assets/ic_my_page_husband_phone.png');
const imgDirect = require('../assets/ic_my_page_direct.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');

<<<<<<< HEAD
export default class MyPage extends React.Component{
    constructor(props){
=======
export default class MyPage extends React.Component {
    constructor(props) {
>>>>>>> mw
        super(props);
    }

    state = {
<<<<<<< HEAD
        twoDialogVisible : false,
        refresh : false,
    }

    _TwoDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                twoDialogVisible : value.visible,
            })
            if(value.status == "done"){
=======
        twoDialogVisible: false,
        refresh: false,
        updatetedDay: Moment().format('YYYY.MM.DD HH:mm'),
    }

    _TwoDialogVisible = value => {
        if (value != undefined) {
            this.setState({
                twoDialogVisible: value.visible,
            })
            if (value.status == "done") {
>>>>>>> mw
                this._Logout();
                AsyncStorage.clear();
                Users.userNo = '';
                Users.userName = '';
                Users.userBirthday = '';
                Users.userPhoneNumber = '';
                Users.paitentNo = '';
                Users.spouseName = '';
                Users.spousePhoneNumber = '';
                Users.userDirectDoctor = '';
                Users.guest = false;
                Users.provisionYN = 0;
<<<<<<< HEAD
                this.props.navigation.reset({index:0, routes:[{name: 'Login'}]})
            }
        }
        if(this.state.twoDialogVisible){
          return <TowBtnDialog title = {"로그아웃"} contents = {"로그아웃 하시겠습니까?"} leftBtnText = {"취소"} rightBtnText = {"확인"} clcik = {this._TwoDialogVisible}></TowBtnDialog>
        }else{
          return null;
        }
    }

    _Logout(){
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
            'access_token' : Users.AccessToken,
        };
        
        var formBody = [];
  
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
  
        formBody = formBody.join("&");
        
        fetch(ServerUrl.logoutUrl,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode : 'cors',
            cache : 'default',
            body : formBody,
            }).then(
                response => response.json()  
            ).then(
                json => {
                console.log(TAG,json);
=======
                this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
            }
        }
        if (this.state.twoDialogVisible) {
            return <LogoutDialog contents={"로그아웃하시면 시술 정보를 받아볼 수 없습니다.\n로그아웃 하시겠습니까?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._TwoDialogVisible}></LogoutDialog>
        } else {
            return null;
        }
    }

    _Logout() {
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
            'access_token': Users.AccessToken,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.logoutUrl, {
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
>>>>>>> mw
            }
        )
    }

    _MyInfoEditFunction = data => {
<<<<<<< HEAD
        if(data == true){
            this.setState({
                refresh : true,
=======
        if (data == true) {
            this.setState({
                refresh: true,
>>>>>>> mw
            })
        }
    }

    render() {
<<<<<<< HEAD

        return (
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                {this._TwoDialogVisible()}
                    <View style = {{width : '100%', height : 48, flexDirection : 'row', alignItems : 'center'}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style = {{flex : 1}}></View>

                        <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000', marginRight : 20}} onPress={() => this.props.navigation.navigate('MyInfoEdit',{myInfoEditFunction : this._MyInfoEditFunction})}>편집</Text>
                    </View>

                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12, marginBottom : 22}}>마이 페이지</Text>
                    <ScrollView>
                        <View style = {{width : '100%', height : '100%', paddingLeft : 20 , paddingRight : 20}}>
                            <View style = {{width : '100%', borderRadius : 24, backgroundColor : '#fff', paddingTop : 30, paddingBottom : 31, paddingLeft : 20, paddingRight : 20}}>
                                <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source = {imgLogo} style = {{width : 28 , height : 32, resizeMode : 'contain',}}></Image>
                                </View>
                                <View style = {{flexDirection : 'row', marginTop : 28, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgName}></Image>
                                    <Text style = {{flex: 1}}></Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.userName}</Text>
                                </View>

                                <View style = {{flexDirection : 'row', marginTop : 16, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgBirth}></Image>
                                    <Text style = {{flex: 1,fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', marginLeft : 12}}>생년월일</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.userBirthday.substring(0,10)}</Text>
                                </View>

                                <View style = {{flexDirection : 'row', marginTop : 16, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgNumber}></Image>
                                    <Text style = {{flex: 1,fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', marginLeft : 12}}>환자번호</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.paitentNo}</Text>
                                </View>

                                <View style = {{flexDirection : 'row', marginTop : 16, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgHusbandName}></Image>
                                    <Text style = {{flex: 1,fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', marginLeft : 12}}>배우자 이름</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.spouseName}</Text>
                                </View>

                                <View style = {{flexDirection : 'row', marginTop : 16, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgHusbandPhone}></Image>
                                    <Text style = {{flex: 1,fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', marginLeft : 12}}>배우자 핸드폰 번호</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.spousePhoneNumber}</Text>
                                </View>

                                <View style = {{flexDirection : 'row', marginTop : 16, alignItems : 'center'}}>
                                    <Image style = {{width : 24, height : 24, resizeMode : 'contain',}} source = {imgDirect}></Image>
                                    <Text style = {{flex: 1,fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', marginLeft : 12}}>담당의</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Users.userDirectDoctor}</Text>
                                </View>
                            </View>

                            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('NoticeList')}>
                                <View style = {{width : '100%', height : 52, borderRadius : 24, backgroundColor : '#fff', flexDirection : 'row', marginTop : 20, paddingLeft : 20, paddingRight : 32, alignItems : 'center'}}>
                                    <Text style = {{flex : 1, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>공지사항</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AlarmSetting')}>
                                <View style = {{width : '100%', height : 52, borderRadius : 24, backgroundColor : '#fff', flexDirection : 'row', marginTop : 20, paddingLeft : 20, paddingRight : 32, alignItems : 'center'}}>
                                    <Text style = {{flex : 1, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>알림설정</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('MyPageAgree')}>
                                <View style = {{width : '100%', height : 52, borderRadius : 24, backgroundColor : '#fff', flexDirection : 'row', marginTop : 20, paddingLeft : 20, paddingRight : 32, alignItems : 'center'}}>
                                    <Text style = {{flex : 1, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>약관 및 개인정보 처리 동의</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('Inquire')}>
                                <View style = {{width : '100%', height : 52, borderRadius : 24, backgroundColor : '#fff', flexDirection : 'row', marginTop : 20, paddingLeft : 20, paddingRight : 32, alignItems : 'center'}}>
                                    <Text style = {{flex : 1, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>문의하기</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style = {{width : '100%', height : 52, borderRadius : 24, backgroundColor : '#fff', flexDirection : 'row', marginTop : 20, paddingLeft : 20, paddingRight : 20, alignItems : 'center'}}>
                                    <Text style = {{flex : 1, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>앱 버전 정보</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{VersionInfo.appVersion}</Text>
                            </View>

                            <View style = {{width : '100%',alignItems : 'center', justifyContent : 'center', marginTop : 32, marginBottom : 23}}>
                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000', textDecorationLine: 'underline'}} onPress = {() => this.setState({twoDialogVisible : true})}>로그아웃</Text>
=======
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._TwoDialogVisible()}
                    <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ flex: 1 }}></View>

                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000', marginRight: 20 }} onPress={() => this.props.navigation.navigate('MyInfoEdit', { myInfoEditFunction: this._MyInfoEditFunction })}>편집</Text>
                    </View>

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12, marginBottom: 22 }}>마이 페이지</Text>
                    <ScrollView>
                        <View style={{ width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20 }}>
                            <View style={{ width: '100%', borderRadius: 24, backgroundColor: '#fff', paddingTop: 30, paddingBottom: 31, paddingLeft: 20, paddingRight: 20 }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={imgLogo} style={{ width: 28, height: 32, resizeMode: 'contain', }}></Image>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 28, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgName}></Image>
                                    <Text style={{ flex: 1 }}></Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.userName}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgBirth}></Image>
                                    <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 12 }}>생년월일</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.userBirthday.substring(0, 10)}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgNumber}></Image>
                                    <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 12 }}>등록번호</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.paitentNo}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgHusbandName}></Image>
                                    <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 12 }}>배우자 이름</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.spouseName}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgHusbandPhone}></Image>
                                    <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 12 }}>배우자 핸드폰 번호</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.spousePhoneNumber}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
                                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', }} source={imgDirect}></Image>
                                    <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 12 }}>담당의</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Users.userDirectDoctor}</Text>
                                </View>
                            </View>

                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('NoticeList')}>
                                <View style={{ width: '100%', height: 52, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', marginTop: 20, paddingLeft: 20, paddingRight: 32, alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>공지사항</Text>
                                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AlarmSetting')}>
                                <View style={{ width: '100%', height: 52, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', marginTop: 20, paddingLeft: 20, paddingRight: 32, alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>알림설정</Text>
                                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('MyPageAgree')}>
                                <View style={{ width: '100%', height: 52, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', marginTop: 20, paddingLeft: 20, paddingRight: 32, alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>약관 및 개인정보 처리 동의</Text>
                                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Inquire')}>
                                <View style={{ width: '100%', height: 52, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', marginTop: 20, paddingLeft: 20, paddingRight: 32, alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>문의하기</Text>
                                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => Toast.show({ type: 'success', text1: 'CodePush', text2: this.state.updatetedDay })}>
                                <View style={{ width: '100%', height: 52, borderRadius: 24, backgroundColor: '#fff', flexDirection: 'row', marginTop: 20, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>앱 버전 정보</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{VersionInfo.appVersion}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 23 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', textDecorationLine: 'underline' }} onPress={() => this.setState({ twoDialogVisible: true })}>로그아웃</Text>
>>>>>>> mw
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}