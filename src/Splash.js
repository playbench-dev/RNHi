import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, Animated,Linking} from 'react-native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Users from '../src/Common/User'
import ServerUrl from './Common/ServerUrl'
import OneBtnDialog from './Common/OneBtnDialog'
import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';
=======
import { SafeAreaView, View, Text, Image, Animated, Linking, Platform } from 'react-native';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Users from '../src/Common/User'
import ServerUrl from './Common/ServerUrl'
import OneBtnDialog from './Common/OneBtnDialog'
import UpdateDialog from './Common/UpdateDialog'
import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';
import checkVersion from 'react-native-store-version'
>>>>>>> mw

const TAG = "Splash";
const imgLogoText = require('../assets/img_logo_text.png');
const imgLogo = require('../assets/ic_logo.png');

// 구글 플레이 스토어 링크
const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.hicenter';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.hicenter';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK =
  'itms-apps://itunes.apple.com/us/app/id1585606989?mt=8';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK =
  'https://apps.apple.com/us/app/antodo-%EC%8B%AC%ED%94%8C%ED%95%9C-%EC%86%90%EA%B8%80%EC%94%A8-%ED%95%A0%EC%9D%BC-%EA%B3%84%ED%9A%8D-%EB%A9%94%EB%AA%A8/id1585606989';

<<<<<<< HEAD
const CustomStatusBare = ({
    backgroundColor,
    barStyle = "dark-content",
  }) => {
    const insets = useSafeAreaInsets();
  
    return(
      <View style = {{height : insets.top, backgroundColor}}>
        <StatusBar animated={true} backgroundColor = {backgroundColor} barStyle = {barStyle}></StatusBar>
      </View>
    )
  }


export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
      animation : new Animated.Value(0),
      name : '',
      patientNo : '',
      checking : false,
      oneBtnDialogVisible : false,
    }

    _Login(){
      // this.props.navigation.navigate('AdminUserSelect');
      // return;
      var details = {
          'patient_no' : this.state.patientNo,
          'user_name' : this.state.name,
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

                  
                  if(this.props.route.params != undefined){
                    if(this.props.route.params.channelId == 'medicine'){
                      this.props.navigation.reset({index:0, routes:[{name: 'MedicineCalendar', params : {push : true}}]});
                    }else if(this.props.route.params.channelId == 'embryo'){
                      this.props.navigation.reset({index:0, routes:[{name: 'CellDevelop', params : {push : true}}]});
                    }else if(this.props.route.params.channelId == 'home'){
                      this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
                    }else{
                      this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
                    }
                  }else{
                    // provision_yn == 0 일때 약관 동의 화면으로 이동
                    if(json.Resources[0].joined_date == null){
                      this.props.navigation.navigate('HusbandInsert');
                    }else{
                      if(json.Resources[0].provision_yn == 0){
                          this.props.navigation.navigate('ServiceAgree');
                      }else{
                          this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
                      }
                    }
                  }
              }else{
                this.props.navigation.reset({index:0, routes:[{name: 'Login'}]});
              }
          }
      )
  }
  _UrlCheck(url, mUrl){
    // const supported = Linking.canOpenURL(url); 
    // console.log(TAG,supported);
    Linking.canOpenURL(url).then((supported) => {
      console.log(TAG,supported)
      if (supported) { // 설치되어 있으면
        Linking.openURL(url);   
=======
export default class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    animation: new Animated.Value(0),
    name: '',
    patientNo: '',
    checking: false,
    oneBtnDialogVisible: false,
  }

  _Login() {
    // this.props.navigation.navigate('AdminUserSelect');
    // return;
    var details = {
      'patient_no': this.state.patientNo,
      'user_name': this.state.name,
      'token': Users.token,
      'os_type': (Platform.OS === 'android' ? 'android' : 'ios'),
      'app_version': (Platform.OS === 'android' ? VersionInfo.buildVersion : VersionInfo.appVersion)
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
        console.log(json)
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

          if (this.props.route.params != undefined) {
            if (this.props.route.params.channelId == 'medicine') {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'MedicineCalendar', params: { push: true } }] });
            } else if (this.props.route.params.channelId == 'embryo') {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'CellDevelop', params: { push: true } }] });
            } else if (this.props.route.params.channelId == 'home') {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else if (this.props.route.params.channelId == 'empty1') {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'AlarmList', params: { push: true } }] });
            } else {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
          } else {
            // provision_yn == 0 일때 약관 동의 화면으로 이동
            if (json.Resources[0].joined_date == null) {
              this.props.navigation.reset({ index: 0, routes: [{ name: 'HusbandInsert', params: { splash: true } }] });
            } else {
              if (json.Resources[0].provision_yn == 0) {
                this.props.navigation.reset({ index: 0, routes: [{ name: 'ServiceAgree', params: { splash: true } }] });
              } else {
                this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
              }
            }
          }
        } else {
          this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    )
  }

  _UrlCheck(url, mUrl) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) { // 설치되어 있으면
        Linking.openURL(url);
>>>>>>> mw
      } else { // 앱이 없으면
        Linking.openURL(mUrl);
      }
    })
<<<<<<< HEAD

    // try{
    //   Linking.openURL(url); 
    // }catch(err){
    //   Linking.openURL(mUrl);
    // }
  }

  _OneDialogVisible = value =>{
    if(value != undefined){
        console.log(TAG,'click')
        if(Platform.OS === 'android'){
          this._UrlCheck(GOOGLE_PLAY_STORE_LINK,GOOGLE_PLAY_STORE_WEB_LINK)
        }else{
          this._UrlCheck(APPLE_APP_STORE_LINK,APPLE_APP_STORE_WEB_LINK)
        }
        
    }
    if(this.state.oneBtnDialogVisible){
      return <OneBtnDialog title = {"업데이트"} contents = {"현재앱이 최신버전이 아닙니다.\n업데이트 후 사용해주세요."} leftBtnText = {"확인"} clcik = {this._OneDialogVisible}></OneBtnDialog>
    }else{
      return null;
    }
}

    componentDidMount(){
      Animated.timing(
        this.state.animation,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver : true,
        }
      ).start((o) => {
        if(o.finished){

          remoteConfig().setDefaults({version : '1.0', check : false})
          .then(() => remoteConfig().fetchAndActivate())
          .then((fetchedRemotely) => {
            if(Platform.OS === 'android'){
              if(!fetchedRemotely){
                console.log(TAG,remoteConfig().getValue('version'));
                console.log(TAG,remoteConfig().getValue('check'));
                if(parseInt(remoteConfig().getValue('version').asString().replace('.','')) <= parseInt(VersionInfo.appVersion.replace('.',''))){
                  AsyncStorage.getItem('userInfo', (err, result) => {
                    if(result != null){
                      const UserInfo = JSON.parse(result);
                      console.log(TAG,UserInfo.user_name + " " + UserInfo.patient_no);
                      this.state.name = UserInfo.user_name;
                      this.state.patientNo = UserInfo.patient_no;
                      this._Login();
                      // this.props.navigation.reset({index:0, routes:[{name: 'AgreeDetail',mode : '2'}]})
                    }else{
                      this.props.navigation.reset({index:0, routes:[{name: 'Login'}]})
                    }
                  });
                }else{
                  this.setState({
                    oneBtnDialogVisible : true,
                  })
                }
              }else{
                AsyncStorage.getItem('userInfo', (err, result) => {
                  if(result != null){
                    const UserInfo = JSON.parse(result);
                    console.log(TAG,UserInfo.user_name + " " + UserInfo.patient_no);
=======
  }

  _OneDialogVisible = value => {
    if (value != undefined) {
      if (Platform.OS === 'android') {
        this._UrlCheck(GOOGLE_PLAY_STORE_LINK, GOOGLE_PLAY_STORE_WEB_LINK)
      } else {
        this._UrlCheck(APPLE_APP_STORE_LINK, APPLE_APP_STORE_WEB_LINK)
      }

    }
    if (this.state.oneBtnDialogVisible) {
      if (Platform.OS === 'android') {
        return <UpdateDialog title={"업데이트"} contents={"현재앱이 최신버전이 아닙니다.\n업데이트 후 사용해주세요."} leftBtnText={"확인"} clcik={this._OneDialogVisible}></UpdateDialog>
      } else {
        return <OneBtnDialog title={"업데이트"} contents={"현재앱이 최신버전이 아닙니다.\n업데이트 후 사용해주세요."} leftBtnText={"확인"} clcik={this._OneDialogVisible}></OneBtnDialog>
      }
    } else {
      return null;
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.animation,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start((o) => {
      if (o.finished) {
        remoteConfig().setDefaults({ version: '1', check: false })
          .then(() => remoteConfig().fetchAndActivate())
          .then((fetchedRemotely) => {
            if (Platform.OS === 'android') {
              console.log(TAG, remoteConfig().getValue('version'));
              console.log(TAG, remoteConfig().getValue('check'));
              console.log(`VersionInfo.appVersion : ${VersionInfo.buildVersion} , fetchedRemotely : ${fetchedRemotely}`)
              if (parseInt(remoteConfig().getValue('version').asString()) <= parseInt(VersionInfo.buildVersion)) {
                AsyncStorage.getItem('userInfo', (err, result) => {
                  if (result != null) {
                    const UserInfo = JSON.parse(result);
                    console.log(TAG, UserInfo.user_name + " " + UserInfo.patient_no);
>>>>>>> mw
                    this.state.name = UserInfo.user_name;
                    this.state.patientNo = UserInfo.patient_no;
                    this._Login();
                    // this.props.navigation.reset({index:0, routes:[{name: 'AgreeDetail',mode : '2'}]})
<<<<<<< HEAD
                  }else{
                    this.props.navigation.reset({index:0, routes:[{name: 'Login'}]})
                  }
                });
              }
            }else{
              if(fetchedRemotely){
                console.log(TAG,remoteConfig().getValue('version').asString().replace('.',''));
                console.log(TAG,parseInt(VersionInfo.appVersion.replace('.','')));
                if(parseInt(remoteConfig().getValue('version').asString().replace('.','')) <= parseInt(VersionInfo.appVersion.replace('.',''))){
                  AsyncStorage.getItem('userInfo', (err, result) => {
                    if(result != null){
                      const UserInfo = JSON.parse(result);
                      console.log(TAG,UserInfo.user_name + " " + UserInfo.patient_no);
                      this.state.name = UserInfo.user_name;
                      this.state.patientNo = UserInfo.patient_no;
                      this._Login();
                      // this.props.navigation.reset({index:0, routes:[{name: 'AgreeDetail',mode : '2'}]})
                    }else{
                      this.props.navigation.reset({index:0, routes:[{name: 'Login'}]})
                    }
                  });
                }else{
                  this.setState({
                    oneBtnDialogVisible : true,
                  })
                }
              }else{
                AsyncStorage.getItem('userInfo', (err, result) => {
                  if(result != null){
                    const UserInfo = JSON.parse(result);
                    console.log(TAG,UserInfo.user_name + " " + UserInfo.patient_no);
=======
                  } else {
                    this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                  }
                });
              } else {
                this.setState({
                  oneBtnDialogVisible: true,
                })
              }
            } else {
              console.log(TAG, remoteConfig().getValue('version'));
              console.log(TAG, remoteConfig().getValue('check'));
              console.log(`VersionInfo.appVersion : ${VersionInfo.appVersion} , fetchedRemotely : ${fetchedRemotely}`)
              if (parseInt(remoteConfig().getValue('version').asString().replace('.', '')) <= parseInt(VersionInfo.appVersion.replace('.', ''))) {
                AsyncStorage.getItem('userInfo', (err, result) => {
                  if (result != null) {
                    const UserInfo = JSON.parse(result);
                    console.log(TAG, UserInfo.user_name + " " + UserInfo.patient_no);
>>>>>>> mw
                    this.state.name = UserInfo.user_name;
                    this.state.patientNo = UserInfo.patient_no;
                    this._Login();
                    // this.props.navigation.reset({index:0, routes:[{name: 'AgreeDetail',mode : '2'}]})
<<<<<<< HEAD
                  }else{
                    this.props.navigation.reset({index:0, routes:[{name: 'Login'}]})
                  }
                });
              }
            }
        })
        }
      });
    }

    componentDidUpdate(){
      console.log('componentDidUpdate');
    }

    render(){
        return(
          <SafeAreaView>
                <View style = {{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center', backgroundColor : '#fff'}}>
                    {this._OneDialogVisible()}
                    <Animated.Image style = {{alignItems : 'center', height : 81, resizeMode : 'contain', opacity: this.state.animation}} source = {imgLogo}></Animated.Image>
                    <Image style = {{position : 'absolute', bottom : 40, height : 44, resizeMode : 'contain'}} source = {imgLogoText} ></Image>
                </View>
            </SafeAreaView>
        )
    }
=======
                  } else {
                    this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                  }
                });
              } else {
                this.setState({
                  oneBtnDialogVisible: true,
                })
              }
            }
          })
      }
    });
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <SafeAreaView>
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          {this._OneDialogVisible()}
          <Animated.Image style={{ alignItems: 'center', height: 81, resizeMode: 'contain', opacity: this.state.animation }} source={imgLogo}></Animated.Image>
          <Image style={{ position: 'absolute', bottom: 40, height: 44, resizeMode: 'contain' }} source={imgLogoText} ></Image>
        </View>
      </SafeAreaView>
    )
  }
>>>>>>> mw
}