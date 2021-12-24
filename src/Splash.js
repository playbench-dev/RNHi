import React from 'react';
import {SafeAreaView, View, Text, Image, Animated} from 'react-native';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Users from '../src/Common/User'
import ServerUrl from './Common/ServerUrl'

const TAG = "Splash";
const imgLogoText = require('../assets/img_logo_text.png');
const imgLogo = require('../assets/ic_logo.png');

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

                  
                  if(this.props.route.params != undefined){
                    console.log(TAG,this.props.route.params.channelId);
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
          AsyncStorage.getItem('userInfo', (err, result) => {
            console.log(TAG,result);
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
        }
      });
    }

    componentDidUpdate(){
      console.log('componentDidUpdate');
    }

    render(){
        Users.userName = "kims";
        console.log(TAG,"userName : " + Users.userName)
        if(this.props.route.params != undefined){
          console.log(TAG,'no : ' + this.props.route.params.no);
        }
        
        return(
          <SafeAreaView>
                <View style = {{width : '100%', height : '100%', alignItems : 'center', justifyContent : 'center', backgroundColor : '#fff'}}>
                    <Animated.Image style = {{alignItems : 'center', height : 81, resizeMode : 'contain', opacity: this.state.animation}} source = {imgLogo}></Animated.Image>
                    <Image style = {{position : 'absolute', bottom : 40, height : 44, resizeMode : 'contain'}} source = {imgLogoText} ></Image>
                </View>
            </SafeAreaView>
        )
    }
}