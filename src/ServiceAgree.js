import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback,} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, BackHandler } from 'react-native';
>>>>>>> mw
import Elevations from 'react-native-elevation';
import CheckBox from '@react-native-community/checkbox';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import AsyncStorage from '@react-native-community/async-storage';

const TAG = "ServiceAgree";
const imgBack = require('../assets/ic_back.png');
const imgCheckTrue = require('../assets/ic_check_true.png');
const imgCheckFalse = require('../assets/ic_check_false.png');

export default class ServiceAgree extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
    }

    state = {
        allCheck : false,
        firstCheck : false,
        secondCheck : false,
        thirdCheck : false,
        fourCheck : false,
        name : '',
        patientNo : '',
    }

    checkBoxEvent = value => {
        console.log(TAG,'value: ' + value);
        if(value === 1){
            if(this.state.allCheck == true){
                this.setState({
                    allCheck : false,
                    firstCheck : false,
                    secondCheck : false,
                    thirdCheck : false,
                    fourCheck : false,
                })
            }else{
                this.setState({
                    allCheck : true,
                    firstCheck : true,
                    secondCheck : true,
                    thirdCheck : true,
                    fourCheck : false,
                })
            }
        }else if(value === 2){
            if(this.state.firstCheck == true){
                this.setState({
                    allCheck : false,
                    firstCheck : false,
                })
            }else{
                if(this.state.secondCheck == true && this.state.thirdCheck == true && this.state.fourCheck == true ){
                    this.setState({
                        allCheck : true,
                        firstCheck : true,
                    })
                }else{
                    this.setState({
                        firstCheck : true,
                    })
                }
            }
        }else if(value === 3){
            if(this.state.secondCheck == true){
                this.setState({
                    allCheck : false,
                    secondCheck : false,
                })
            }else{
                if(this.state.firstCheck == true && this.state.thirdCheck == true && this.state.fourCheck == true){
                    this.setState({
                        allCheck : true,
                        secondCheck : true,
                    })
                }else{
                    this.setState({
                        secondCheck : true,
                    })
                }
            }
        }else if(value === 4){
            if(this.state.thirdCheck == true){
                this.setState({
                    allCheck : false,
                    thirdCheck : false,
                })
            }else{
                if(this.state.firstCheck == true && this.state.secondCheck == true && this.state.fourCheck == true){
                    this.setState({
                        allCheck : true,
                        thirdCheck : true,
                    })
                }else{
                    this.setState({
                        thirdCheck : true,
                    })
                }
            }
        }else if(value === 5){
            if(this.state.fourCheck == true){
                this.setState({
                    allCheck : false,
                    fourCheck : false,
                })
            }else{
                if(this.state.firstCheck == true && this.state.secondCheck == true && this.state.thirdCheck == true){
                    this.setState({
                        allCheck : true,
                        fourCheck : true,
                    })
                }else{
                    this.setState({
                        fourCheck : true,
=======
        this.backAction = this.backAction.bind(this);
    }

    state = {
        allCheck: false,
        firstCheck: false,
        secondCheck: false,
        thirdCheck: false,
        fourCheck: false,
        name: '',
        patientNo: '',
        autoLogin: false,
    }

    backAction() {
        if (this.state.autoLogin == true) {
            this._Logout();
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    _goBack() {
        if (this.state.autoLogin == true) {
            this._Logout();
        } else {
            this.props.navigation.goBack();
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    checkBoxEvent = value => {
        console.log(TAG, 'value: ' + value);
        if (value === 1) {
            if (this.state.allCheck == true) {
                this.setState({
                    allCheck: false,
                    firstCheck: false,
                    secondCheck: false,
                    thirdCheck: false,
                    fourCheck: false,
                })
            } else {
                this.setState({
                    allCheck: true,
                    firstCheck: true,
                    secondCheck: true,
                    thirdCheck: true,
                    fourCheck: false,
                })
            }
        } else if (value === 2) {
            if (this.state.firstCheck == true) {
                this.setState({
                    allCheck: false,
                    firstCheck: false,
                })
            } else {
                if (this.state.secondCheck == true && this.state.thirdCheck == true && this.state.fourCheck == true) {
                    this.setState({
                        allCheck: true,
                        firstCheck: true,
                    })
                } else {
                    this.setState({
                        firstCheck: true,
                    })
                }
            }
        } else if (value === 3) {
            if (this.state.secondCheck == true) {
                this.setState({
                    allCheck: false,
                    secondCheck: false,
                })
            } else {
                if (this.state.firstCheck == true && this.state.thirdCheck == true && this.state.fourCheck == true) {
                    this.setState({
                        allCheck: true,
                        secondCheck: true,
                    })
                } else {
                    this.setState({
                        secondCheck: true,
                    })
                }
            }
        } else if (value === 4) {
            if (this.state.thirdCheck == true) {
                this.setState({
                    allCheck: false,
                    thirdCheck: false,
                })
            } else {
                if (this.state.firstCheck == true && this.state.secondCheck == true && this.state.fourCheck == true) {
                    this.setState({
                        allCheck: true,
                        thirdCheck: true,
                    })
                } else {
                    this.setState({
                        thirdCheck: true,
                    })
                }
            }
        } else if (value === 5) {
            if (this.state.fourCheck == true) {
                this.setState({
                    allCheck: false,
                    fourCheck: false,
                })
            } else {
                if (this.state.firstCheck == true && this.state.secondCheck == true && this.state.thirdCheck == true) {
                    this.setState({
                        allCheck: true,
                        fourCheck: true,
                    })
                } else {
                    this.setState({
                        fourCheck: true,
>>>>>>> mw
                    })
                }
            }
        }
    }

<<<<<<< HEAD
    _ProvisionUpdate(){
        var details = {
            'user_no' : Users.userNo,
        };
        
        var formBody = [];
  
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
  
        formBody = formBody.join("&");
        
        fetch(ServerUrl.provisionAgree,{
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
                if(json.Error_Cd == "0000"){
                    this._Login();
                }else{
=======
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
            }
        )
    }

    _ProvisionUpdate() {
        var details = {
            'user_no': Users.userNo,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.provisionAgree, {
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
                    this._Login();
                } else {
>>>>>>> mw

                }
            }
        )
    }

<<<<<<< HEAD
    _Login(){
        AsyncStorage.getItem('userInfo', (err, result) => {
              const UserInfo = JSON.parse(result);
              this.state.name = UserInfo.user_name;
              this.state.patientNo = UserInfo.patient_no;
        });
        var details = {
            'patient_no': this.state.patientNo,
            'user_name': this.state.name,
            'token' : Users.token,
        };
        
        var formBody = [];
  
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
  
        formBody = formBody.join("&");
        
        fetch(ServerUrl.loginUrl,{
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
                if(json.Error_Cd == "0000"){
                    AsyncStorage.setItem('userInfo',JSON.stringify({'user_no': json.Resources[0].user_no || '', 
                    'user_name' : json.Resources[0].user_name || '','phone_num' : json.Resources[0].phone_num || '', 'patient_no' : json.Resources[0].patient_no || '',
                    'spouse_name' : json.Resources[0].spouse_name || '','spouse_phone' : json.Resources[0].spouse_phone || '', 'doctor_no' : json.Resources[0].admin_name || '', 
                    'birth_date' : json.Resources[0].birth_date || '', 'spouse_birth_date' : json.Resources[0].spouse_birth_date || '', provision_yn : json.Resources[0].provision_yn || '',
                    'access_token' : json.Resources[0].access_token || '', 'refresh_token' : json.Resources[0].refresh_token || '','loginStatus' : true, 'user_push' : json.Resources[0].use_push || '', 'kakao_push' : json.Resources[0].kakao_push || '',}), () => {
                        Users.userNo = json.Resources[0].user_no || '';
                        Users.userName = json.Resources[0].user_name || '';
                        Users.userBirthday = json.Resources[0].birth_date || '';
                        Users.userPhoneNumber = json.Resources[0].phone_num || '';
                        Users.paitentNo = json.Resources[0].patient_no || '';
                        Users.spouseName = json.Resources[0].spouse_name || '';
                        Users.spousePhoneNumber = json.Resources[0].spouse_phone || '';
                        Users.userDirectDoctor = json.Resources[0].admin_name || '';
                        Users.provisionYN = json.Resources[0].provision_yn || '';
                        Users.AccessToken = json.Resources[0].access_token || '';
                        Users.RefreshToken = json.Resources[0].refresh_token || '';
                        Users.guest = false;
                        Users.userPush = json.Resources[0].use_push || '';
                        Users.kakaoPush = json.Resources[0].kakao_push || '';
                    });

                    this.props.navigation.reset({index:0, routes:[{name: 'Home'}]})
                }else{
=======
    _Login() {
        AsyncStorage.getItem('userInfo', (err, result) => {
            const UserInfo = JSON.parse(result);
            this.state.name = UserInfo.user_name;
            this.state.patientNo = UserInfo.patient_no;
        });
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
            'token': Users.token,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.loginUrl, {
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
                    AsyncStorage.setItem('userInfo', JSON.stringify({
                        'user_no': json.Resources[0].user_no || '',
                        'user_name': json.Resources[0].user_name || '', 'phone_num': json.Resources[0].phone_num || '', 'patient_no': json.Resources[0].patient_no || '',
                        'spouse_name': json.Resources[0].spouse_name || '', 'spouse_phone': json.Resources[0].spouse_phone || '', 'doctor_no': json.Resources[0].admin_name || '',
                        'birth_date': json.Resources[0].birth_date || '', 'spouse_birth_date': json.Resources[0].spouse_birth_date || '', 'provision_yn': json.Resources[0].provision_yn || '',
                        'access_token': json.Resources[0].access_token || '', 'refresh_token': json.Resources[0].refresh_token || '', 'loginStatus': true, 'user_push': json.Resources[0].use_push || '', 'kakao_push': json.Resources[0].kakao_push || '',
                    }), () => {

                    });
                    Users.userNo = json.Resources[0].user_no || '';
                    Users.userName = json.Resources[0].user_name || '';
                    Users.userBirthday = json.Resources[0].birth_date || '';
                    Users.userPhoneNumber = json.Resources[0].phone_num || '';
                    Users.paitentNo = json.Resources[0].patient_no || '';
                    Users.spouseName = json.Resources[0].spouse_name || '';
                    Users.spousePhoneNumber = json.Resources[0].spouse_phone || '';
                    Users.spouseBirthday = json.Resources[0].spouse_birth_date || '';
                    Users.userDirectDoctor = json.Resources[0].admin_name || '';
                    Users.provisionYN = json.Resources[0].provision_yn || '';
                    Users.AccessToken = json.Resources[0].access_token || '';
                    Users.RefreshToken = json.Resources[0].refresh_token || '';
                    Users.guest = false;
                    Users.userPush = json.Resources[0].use_push || '';
                    Users.kakaoPush = json.Resources[0].kakao_push || '';
                    this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                } else {
>>>>>>> mw

                }
            }
        )
    }

    render() {
<<<<<<< HEAD
        return (
            <SafeAreaView>
                <View style={{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
        if (this.props.route.params != undefined) {
            this.state.autoLogin = this.props.route.params.splash;
            console.log(TAG, "push : " + this.props.route.params.splash);
        }
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
                    <ScrollView style={{width : '100%', height : '100%',}}>
                        <Text style = {{marginTop : 16, marginLeft : 24, fontSize : 16, fontFamily : 'KHNPHDotfB'}}>어서오세요. {Users.userName}님</Text>

                        <Text style = {{marginTop : 20, marginLeft : 24, fontSize : 14, fontFamily : 'KHNPHDotfR'}}>원활한 앱사용을 위해</Text>
                        <Text style = {{marginTop : 10, marginLeft : 24, fontSize : 14, fontFamily : 'KHNPHDotfR'}}>아래 약관을 확인해주세요</Text>

                        <View style = {{width: '100%', height: 76, marginTop : 32, paddingLeft : 20, paddingRight : 20}}>
                            <View style = {{width : '100%', height : '100%', borderRadius : 24, borderWidth : 1, borderColor : '#D5D5D5', paddingLeft : 16,alignItems : 'center', flexDirection : 'row'}}>
                                <TouchableWithoutFeedback onPress = {() => this.checkBoxEvent(1)}>
                                    <View style = {{width : 24, height : 24}}>
                                        <Image source = {(this.state.allCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style = {{marginLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>전체동의</Text>
                            </View>
                        </View>

                        <View style = {{width: '100%', height: 24, marginTop : 32, paddingLeft : 44, paddingRight : 20}}>
                            <View style = {{width : '100%', height : '100%', paddingLeft : 16, flexDirection : 'row',alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.checkBoxEvent(2)}>
                                    <View style = {{width : 24, height : '100%'}}>
                                        <Image source = {(this.state.firstCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style = {{marginLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}} onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "1"})}>{"(필수) 개인정보처리방침"}</Text>
                            </View>
                        </View>
                     
                        <View style = {{width: '100%', height: 24, marginTop : 20, paddingLeft : 44, paddingRight : 20}}>
                            <View style = {{width : '100%', height : '100%', paddingLeft : 16, flexDirection : 'row',alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.checkBoxEvent(3)}>
                                    <View style = {{width : 24, height : '100%'}}>
                                        <Image source = {(this.state.secondCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style = {{marginLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}} onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "2"})}>{"(필수) 서비스 이용약관"} </Text>
                            </View>
                        </View>

                        <View style = {{width: '100%', height: 24, marginTop : 20, paddingLeft : 44, paddingRight : 20}}>
                            <View style = {{width : '100%', height : '100%', paddingLeft : 16, flexDirection : 'row',alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.checkBoxEvent(4)}>
                                    <View style = {{width : 24, height : '100%'}}>
                                        <Image source = {(this.state.secondCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style = {{marginLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}} onPress = {() => this.props.navigation.navigate('AgreeDetail',{mode : "3"})}>{"(필수) 개인정보 제3자 제공 동의"} </Text>
                            </View>
                        </View>

                        <View style = {{width: '100%', height: 24, marginTop : 20, paddingLeft : 44, paddingRight : 20}}>
                            <View style = {{width : '100%', height : '100%', paddingLeft : 16, flexDirection : 'row',alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.checkBoxEvent(5)}>
                                    <View style = {{width : 24, height : '100%'}}>
                                        <Image source = {(this.state.fourCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback >
                                <Text style = {{marginLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>{"(선택) 푸시알림 수신"}</Text>
                            </View>
                        </View>

                        <View style = {{width: '100%', height : 64, paddingLeft : 32, paddingRight : 32, marginTop : 171, marginBottom : 20}}>
                            <TouchableWithoutFeedback onPress = {() => this._ProvisionUpdate()} disabled = {(this.state.firstCheck == true && this.state.secondCheck == true ? false : true)}>
                                <View style = {{width: '100%', height : 64, backgroundColor : this.state.firstCheck == true && this.state.secondCheck == true ? '#4A50CA' : '#E6E6E6', alignItems : 'center', justifyContent : 'center', borderRadius : 32, ...Elevations[this.state.firstCheck == true && this.state.secondCheck == true ? 10 : 0]}}>
                                    <Text style = {{fontSize : 16, color : '#fff', fontFamily : 'KHNPHDotfR'}}>확인</Text>
=======
                    <ScrollView style={{ width: '100%', height: '100%', }}>
                        <Text style={{ marginTop: 16, marginLeft: 24, fontSize: 16, fontFamily: 'KHNPHDotfB' }}>어서오세요. {Users.userName}님</Text>

                        <Text style={{ marginTop: 20, marginLeft: 24, fontSize: 14, fontFamily: 'KHNPHDotfR' }}>원활한 앱사용을 위해</Text>
                        <Text style={{ marginTop: 10, marginLeft: 24, fontSize: 14, fontFamily: 'KHNPHDotfR' }}>아래 약관을 확인해주세요</Text>

                        <View style={{ width: '100%', height: 76, marginTop: 32, paddingLeft: 20, paddingRight: 20 }}>
                            <View style={{ width: '100%', height: '100%', borderRadius: 24, borderWidth: 1, borderColor: '#D5D5D5', paddingLeft: 16, alignItems: 'center', flexDirection: 'row' }}>
                                <TouchableWithoutFeedback onPress={() => this.checkBoxEvent(1)}>
                                    <View style={{ width: 24, height: 24 }}>
                                        <Image source={(this.state.allCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>전체동의</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 24, marginTop: 32, paddingLeft: 44, paddingRight: 20 }}>
                            <View style={{ width: '100%', height: '100%', paddingLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => this.checkBoxEvent(2)}>
                                    <View style={{ width: 24, height: '100%' }}>
                                        <Image source={(this.state.firstCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }} onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "1" })}>{"(필수) 개인정보처리방침"}</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 24, marginTop: 20, paddingLeft: 44, paddingRight: 20 }}>
                            <View style={{ width: '100%', height: '100%', paddingLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => this.checkBoxEvent(3)}>
                                    <View style={{ width: 24, height: '100%' }}>
                                        <Image source={(this.state.secondCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }} onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "2" })}>{"(필수) 서비스 이용약관"} </Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 24, marginTop: 20, paddingLeft: 44, paddingRight: 20 }}>
                            <View style={{ width: '100%', height: '100%', paddingLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => this.checkBoxEvent(4)}>
                                    <View style={{ width: 24, height: '100%' }}>
                                        <Image source={(this.state.secondCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }} onPress={() => this.props.navigation.navigate('AgreeDetail', { mode: "3" })}>{"(필수) 개인정보 제3자 제공 동의"} </Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 24, marginTop: 20, paddingLeft: 44, paddingRight: 20 }}>
                            <View style={{ width: '100%', height: '100%', paddingLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => this.checkBoxEvent(5)}>
                                    <View style={{ width: 24, height: '100%' }}>
                                        <Image source={(this.state.fourCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                                    </View>
                                </TouchableWithoutFeedback >
                                <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>{"(선택) 푸시알림 수신"}</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 171, marginBottom: 20 }}>
                            <TouchableWithoutFeedback onPress={() => this._ProvisionUpdate()} disabled={(this.state.firstCheck == true && this.state.secondCheck == true ? false : true)}>
                                <View style={{ width: '100%', height: 64, backgroundColor: this.state.firstCheck == true && this.state.secondCheck == true ? '#4A50CA' : '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 32, ...Elevations[this.state.firstCheck == true && this.state.secondCheck == true ? 10 : 0] }}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'KHNPHDotfR' }}>확인</Text>
>>>>>>> mw
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}