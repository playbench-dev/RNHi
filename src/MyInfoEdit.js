import React from 'react'
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, YellowBox, LogBox,} from 'react-native';
import Elevations from 'react-native-elevation';
import AsyncStorage from '@react-native-community/async-storage';
import OneBtnDialog from './Common/OneBtnDialog'

import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'

const TAG = "MyInfoEdit";
const imgBack = require('../assets/ic_back.png');

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

export default class MyInfoEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        myPhoneNumber : '',
        husbandName : '',
        husbandPhoneNumber : '',
        oneBtnDialogVisible : false,
    }

    componentDidMount(){
        if(Users.userName == undefined && Users.guest){
          AsyncStorage.getItem('userInfo', (err, result) => {
            const UserInfo = JSON.parse(result);
            Users.userNo = UserInfo.user_no || '';
            Users.userName = UserInfo.user_name || '';
            Users.userBirthday = UserInfo.birth_date || '';
            Users.userPhoneNumber = UserInfo.phone_num || '';
            Users.paitentNo = UserInfo.patient_no || '';
            Users.spouseName = UserInfo.spouse_name || '';
            Users.spousePhoneNumber = UserInfo.spouse_phone || '';
            Users.userDirectDoctor = UserInfo.doctor_no || '';
            Users.AccessToken = UserInfo.access_token || '';
            Users.RefreshToken = UserInfo.refresh_token || '';
          });
        }
      }

    _MyInfoEdit(){
        console.log(TAG,"phone : " + this.state.myPhoneNumber);
        var details = {
            'access_token' : Users.AccessToken,
            'refresh_token' : Users.RefreshToken,
            'user_no' : Users.userNo,
            'phone_num' : (this.state.myPhoneNumber.length != 0 ? this.state.myPhoneNumber : Users.userPhoneNumber),
            'spouse_name' : (this.state.husbandName.length != 0 ? this.state.husbandName : Users.spouseName),
            'spouse_phone' : (this.state.husbandPhoneNumber.length != 0 ? this.state.husbandPhoneNumber : Users.spousePhoneNumber),
        };
        
        var formBody = [];
  
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
  
        formBody = formBody.join("&");
        
        fetch(ServerUrl.myInfoEditUrl,{
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

                }
            }
        )
    }

    _Login(){
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
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
                    'access_token' : json.Resources[0].access_token || '', 'refresh_token' : json.Resources[0].refresh_token || '', 'loginStatus' : true, 'user_push' : json.Resources[0].use_push || '', 'kakao_push' : json.Resources[0].kakao_push || '',}), () => {
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
                    
                    this.setState({
                        oneBtnDialogVisible : true,
                    })
                }else{

                }
            }
        )
    }

    _OneDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                oneBtnDialogVisible : value.visible,
            })
            this.props.route.params.myInfoEditFunction(true);
            this.props.navigation.goBack();
        }
        if(this.state.oneBtnDialogVisible){
          return <OneBtnDialog title = {"정보수정"} contents = {"정보가 수정되었습니다."} leftBtnText = {"확인"} clcik = {this._OneDialogVisible}></OneBtnDialog>
        }else{
          return null;
        }
    }

    render() {

        return (
            <SafeAreaView>
                <View style={{width: '100%', height: '100%', backgroundColor: '#F6F7F9'}}>
                {this._OneDialogVisible()}
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12, marginBottom : 32}}>내 정보</Text>

                    <ScrollView style = {{flex : 1, paddingLeft : 20, paddingRight : 20}}>
                        <Text style = {{fontFamily : 'KHNPHDotfB', fontSize : 14, color : '#000'}}>핸드폰 번호</Text>
                        <View style = {{width : '100%', height : 52, marginTop : 16}}>
                            <TextInput style = {{width : '100%', height : '100%', backgroundColor : '#fff', borderRadius : 12, paddingLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR'}} placeholder="-없이 숫자만 입력해주세요." autoCapitalize = "none" keyboardType={Platform.select({android : "numeric"}, {ios : "number-pad"})} onChangeText = {(value) => this.setState({myPhoneNumber : value})} defaultValue = {Users.userPhoneNumber}></TextInput>
                        </View>

                        <Text style = {{fontFamily : 'KHNPHDotfB', fontSize : 14, color : '#000', marginTop : 20}}>배우자 이름</Text>
                        <View style = {{width : '100%', height : 52, marginTop : 16}}>
                            <TextInput style = {{width : '100%', height : '100%', backgroundColor : '#fff', borderRadius : 12, paddingLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR'}} placeholder="이름을 입력해주세요. (선택사항)" autoCapitalize = "none" onChangeText = {(value) => this.setState({husbandName : value})} defaultValue = {Users.spouseName}></TextInput>
                        </View>

                        <Text style = {{fontFamily : 'KHNPHDotfB', fontSize : 14, color : '#000', marginTop : 20}}>배우자 핸드폰 번호</Text>
                        <View style = {{width : '100%', height : 52, marginTop : 16}}>
                            <TextInput style = {{width : '100%', height : '100%', backgroundColor : '#fff', borderRadius : 12, paddingLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR'}} placeholder="-없이 숫자만 입력해주세요. (선택사항)" autoCapitalize = "none" keyboardType={Platform.select({android : "numeric"}, {ios : "number-pad"})} onChangeText = {(value) => this.setState({husbandPhoneNumber : value})} defaultValue = {Users.spousePhoneNumber}></TextInput>
                        </View>
                    </ScrollView>

                    <View style={{width : '100%', height :64, paddingLeft : 20, paddingRight : 20, marginBottom : 20}}>
                        <TouchableWithoutFeedback onPress = {() => this._MyInfoEdit()}>
                            <View style={{width : '100%', height :64, borderRadius : 32, backgroundColor : '#4A50CA', ...Elevations[5], alignItems : 'center', justifyContent : 'center'}}>
                                <Text style = {{fontFamily : 'KHNPHDotfR', fontSize : 16, color : '#fff',}}>저장</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                </View>
            </SafeAreaView>
        )
    }
}