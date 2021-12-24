import React from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
import Elevations from 'react-native-elevation';
import Users from './Common/User'
import TextTicker from 'react-native-text-ticker'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker'
import TowBtnDialog from './Common/TwoBtnDialog'

import ServerUrl from './Common/ServerUrl'
const TAG = "Home";

const imgLogo = require('../assets/ic_main_logo.png');
const imgKakao = require('../assets/ic_main_kakao.png');
const imgAlarm = require('../assets/ic_main_alarm.png');
const imgMy = require('../assets/ic_main_my.png');
const imgMain = require('../assets/img_main.png');
const imgCalendar = require('../assets/ic_main_calendar.png');
const imgInjector = require('../assets/ic_main_injector.png');
const imgDrug = require('../assets/ic_main_drug.png');
const imgPlantain = require('../assets/ic_main_plantain.png');
const imgCircle = require('../assets/ic_main_circle.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');
const imgClock = require('../assets/ic_main_clock.png');
const imgEmbryo = require('../assets/ic_main_embryo.png');
const imgFeeling = require('../assets/ic_main_feeling.png');
const imgInspection = require('../assets/ic_main_inspection.png');
const imgInsemination = require('../assets/ic_main_insemination.png');
const imgTestTube = require('../assets/ic_main_test_tube.png');
const imgTechnique = require('../assets/ic_main_technique.png');
const imgVideoPlay = require('../assets/ic_video_play.png');
const imgStaff = require('../assets/ic_main_hi_staff.png');
const imgReservation = require('../assets/ic_main_hi_reservation.png');
const imgNews = require('../assets/ic_main_hi_news.png');
const imgQuestion = require('../assets/ic_main_hi_question.png');
const imgCaution = require('../assets/ic_main_hi_caution.png');
const imgBusiness = require('../assets/ic_main_hi_business.png');
const imgInjectorWayBg = require('../assets/img_injector_way.png');
const imgInjectorVideoBg = require('../assets/img_injector_video.png');

const holidayKr = require('holiday-kr');

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    MedicineUpdate(){
      console.log(TAG,'aaasdasd');
    }

    state = {
        isLoading : false,
        headerHeight : 0,
        opacity : 1,
        balloonVisible : true,
        datas : [],
        includes : [],
        messageDatas : [],
        messageLengthOver : false,
        noticeMessages : '',
        noticeMessageExistence : false,
        randomMessage : '',
        calendarVisible : false,
        eatingTime : '',
        selectTime : '',
        selectPosition : 0,
        twoDialogVisible : false,
        selectMedicineName : '',
        requestType : 1,
    }

    componentDidMount(){
      if(Users.userName == undefined && Users.guest){
        AsyncStorage.getItem('userInfo', (err, result) => {
          const UserInfo = JSON.parse(result);
          Users.userNo = UserInfo.user_no;
          Users.userName = UserInfo.user_name;
          Users.userBirthday = UserInfo.birth_date;
          Users.userPhoneNumber = UserInfo.phone_num;
          Users.paitentNo = UserInfo.patient_no;
          Users.spouseName = UserInfo.spouse_name;
          Users.spousePhoneNumber = UserInfo.spouse_phone;
          Users.userDirectDoctor = UserInfo.doctor_no;
          Users.AccessToken = UserInfo.access_token;
          Users.RefreshToken = UserInfo.refresh_token;
        });
      }
      this._NoticeMessage();
    }

    //한줄 메세지
    _NoticeMessage(){
      var details = {
          'type': '1',
      };
      
      var formBody = [];

      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");
      
      fetch(ServerUrl.oneLineNoticeUrl,{
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
              // console.log(TAG,json);
              if(json.Error_Cd == "0000"){
                if(Object.keys(json.Resources).length > 0){
                  this.state.noticeMessageExistence = true;
                  this.state.noticeMessages = json.Resources[0].contents;
                }else{
                  this.state.noticeMessageExistence = false;
                }
              }else{
                this.state.noticeMessageExistence = false;
              }
              this._HopeMessages();
            }
        )
    }

    //희망 메세지
    _HopeMessages(){
      var details = {
          'page': '1',
          'pageSize': '10',
      };
      
      var formBody = [];

      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");
      
      fetch(ServerUrl.hopeMessagesUrl,{
          method : 'GET',
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          mode : 'cors',
          cache : 'default',
          body : null,
          }).then(
              response => response.json()  
          ).then(
              json => {
              if(Object.keys(json.data).length > 3){
                for(let i = 0; i < 4; i++){
                  const obj = ({
                     kind : json.data[i].kind || '',
                     cont1 : json.data[i].cont1 || '', 
                     cont2 : json.data[i].cont2 || '', 
                     customerName : json.data[i].customerName || '', 
                     kind2Childbirth : json.data[i].kind2Childbirth || '',
                     kind2BirthType : json.data[i].kind2BirthType || '',
                     kind2Baby1 : json.data[i].kind2Baby1 || '',
                     kind2Baby2 : json.data[i].kind2Baby2 || '',
                     kind2Baby3 : json.data[i].kind2Baby3 || '',
                     answerCont : json.data[i].answerCont || '',
                     answerDate : json.data[i].answerDate || '',
                     answerYn : json.data[i].answerYn || '',
                     kind1Age : json.data[i].kind1Age || '',
                     kind1Term : json.data[i].kind1Term || '',
                     kind1Sisul : json.data[i].kind1Sisul || '',
                     kind1Effort : json.data[i].kind1Effort || '',
                  })
                  this.state.messageDatas.push(obj);
                }
                this.state.messageLengthOver = true;
              }else{
                for(i == 0; i < Object.keys(json.data).length; i++){
                  const obj = ({
                    kind : json.data[i].kind || '',
                    cont1 : json.data[i].cont1 || '', 
                    cont2 : json.data[i].cont2 || '', 
                    customerName : json.data[i].customerName || '', 
                     kind2Childbirth : json.data[i].kind2Childbirth || '',
                     kind2BirthType : json.data[i].kind2BirthType || '',
                     kind2Baby1 : json.data[i].kind2Baby1 || '',
                     kind2Baby2 : json.data[i].kind2Baby2 || '',
                     kind2Baby3 : json.data[i].kind2Baby3 || '',
                     answerCont : json.data[i].answerCont || '',
                     answerDate : json.data[i].answerDate || '',
                     answerYn : json.data[i].answerYn || '',
                     kind1Age : json.data[i].kind1Age || '',
                     kind1Term : json.data[i].kind1Term || '',
                     kind1Sisul : json.data[i].kind1Sisul || '',
                     kind1Effort : json.data[i].kind1Effort || '',
                 })
                 this.state.messageDatas.push(obj);
                }
                this.state.messageLengthOver = false;
              }
              this._RandomMessages();
          }
      )
  }

  //랜덤 메세지
  _RandomMessages(){
    var details = {

    };
    
    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    
    fetch(ServerUrl.RandomMessageInfo,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        mode : 'cors',
        cache : 'default',
        body : null,
        }).then(
            response => response.json()  
        ).then(
            json => {
              // console.log(TAG,'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ : '+JSON.stringify(json) + ' 1111');
              if(json.Error_Cd == "0000"){
                if(Object.keys(json.Resources).length > 0){
                  console.log(TAG,'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ : ' + json.Resources[0].contents);
                  this.state.randomMessage = json.Resources[0].contents;
                }
              }
              if(Users.guest == true){
                this.setState({isLoading : true});
              }else{
                this._MedcineInfo();
              }
        }
    )
}

//복약 list, 복약 insert
  _MedcineInfo(){
    var details = null;
    var url = "";

    if(this.state.requestType == 1){
        url = ServerUrl.medicineInfoList;
        details = {
            'access_token' : Users.AccessToken,
            'refresh_token' : Users.RefreshToken,
            'user_no' : Users.userNo,
            'cel_date_pick' : Moment().format('YYYYMMDD'),
        };
    }else if(this.state.requestType == 2){
        url = ServerUrl.medicineUpdate;
        details = {
            'access_token' : Users.AccessToken,
            'refresh_token' : Users.RefreshToken,
            'schedule_no' : this.state.datas[0].schedule_no,
            'medicine_info' : JSON.stringify(this.state.datas),
        };
    }
    
    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    
    fetch(url,{
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
            // console.log(TAG,JSON.stringify(json) + ' 1111');
            if(json.Error_Cd == "0000"){
                if(this.state.requestType == 1){
                    this.state.datas = [];
                    for(let i = 0; i < Object.keys(json.Resources).length; i++){
                        const obj = ({
                            abbreviation : json.Resources[i].abbreviation || '',
                            amount : json.Resources[i].amount || '', 
                            cel_date : json.Resources[i].cel_date || '',
                            every_other_day : json.Resources[i].every_other_day || '',
                            idx : json.Resources[i].idx || '',
                            medicine_name : json.Resources[i].medicine_name || '', 
                            medicine_no : json.Resources[i].medicine_no || '',
                            memo : json.Resources[i].memo || '',
                            purpose : json.Resources[i].purpose || '',
                            reg_date : json.Resources[i].reg_date || '',
                            reg_id : json.Resources[i].reg_id || '',
                            unit : json.Resources[i].unit || '', 
                            type : json.Resources[i].type || '',
                            take_time : json.Resources[i].take_time || '', 
                            schedule_no : json.Resources[i].schedule_no || '',
                        })
                        this.state.datas.push(obj);
                    }
                    this.setState({
                        isLoading : true,
                    })
                }else if(this.state.requestType == 2){
                    this.state.requestType = 1;
                    this._MedcineInfo();
                }
            }else{
              this.setState({
                isLoading : true,
              })
            }
        }
    )
}

  _UpdateTakeTime(str){
      // console.log(TAG,'eatingTime : ' + this.state.selectTime);
      this.state.datas = this.state.datas.map((data,index) => this.state.selectPosition === index ? {abbreviation : data.abbreviation || '',
      amount : data.amount || '', 
      cel_date : data.cel_date || '',
      every_other_day : data.every_other_day || '',
      idx : data.idx || '',
      medicine_name : data.medicine_name || '', 
      medicine_no : data.medicine_no || '',
      memo : data.memo || '',
      purpose : data.purpose || '',
      reg_date : data.reg_date || '',
      reg_id : data.reg_id || '',
      unit : data.unit || '', 
      type : data.type || '',
      take_time : this.state.selectTime || '', 
      schedule_no : data.schedule_no || '',} : data)
      // console.log(TAG,this.state.datas);
      this.state.requestType = 2;
      this.setState({twoDialogVisible : false,})
      this._MedcineInfo();
  }

  _Calendar(){
    let str = "";
    // this.state.eatingTime = Moment().format("a HH:mm");
    // this.state.selectTime = Moment().format("HH:mm");

    return <Modal transparent = {true} visible = {this.state.calendarVisible}>
        <View style = {{ height : '100%',width : '100%',justifyContent:'flex-end',alignItems : 'center',backgroundColor: 'rgba(0,0,0,0.3)',}}>
            <View style = {{width : '90%',height : 340, backgroundColor : '#fff',  borderRadius : 12, alignItems : 'center', marginBottom : 20}}>
                <View style = {{alignItems : 'center', justifyContent : 'center', marginTop : 20}}>
                    <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : '#000'}}>{this.state.selectMedicineName}</Text>
                </View>
                
                <DatePicker androidVariant="iosClone" date={new Date()} onDateChange = {(value) => str = value} mode = {"time"} locale = "ko" style = {{flex : 1}}/>
                  <View style = {{flexDirection : 'row', flexWrap : 'nowrap', height : 50, marginBottom : 20, paddingLeft : 20, paddingRight : 20}}>
                    <TouchableWithoutFeedback onPress = {() => this.setState({calendarVisible : false, })}>
                      <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center', backgroundColor : '#9699D6', borderRadius : 24}}>
                        <Text style = {{color : '#fff', fontSize : 16, fontFamily : 'KHNPHDotfR',}}>취소</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress = {() => this._TimeUpdate(str)}>
                      <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center', backgroundColor : '#4A50CA', borderRadius : 24, marginLeft : 23}}>
                        <Text style = {{color : '#fff', fontSize : 16, fontFamily : 'KHNPHDotfR',}}>투약완료</Text>
                      </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    </Modal> 
  }

  _TimeUpdate(time){
    console.log(TAG,'time : ' + time);
    if(time.length != 0){
        this.state.eatingTime = Moment(time).format("a HH:mm");
        this.state.selectTime = Moment(time).format("HH:mm");
    }
    console.log(TAG,'time : ' + this.state.eatingTime);
    this.setState({
        calendarVisible : false, 
        twoDialogVisible : true
    })
}

    _TwoDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                twoDialogVisible : value.visible,
            })
            if(value.status == "done"){
                this._UpdateTakeTime("aa");
            }
        }
        if(this.state.twoDialogVisible){
          return <TowBtnDialog title = {"투약등록"} contents = {this.state.eatingTime + " 투약시간\n등록 하시겠습니까?"} leftBtnText = {"취소"} rightBtnText = {"확인"} clcik = {this._TwoDialogVisible}></TowBtnDialog>
        }else{
          return null;
        }
    }

    _MedicineUpdate = data =>{
      // console.log(TAG,'update ? '+data);
      if(data == true){
          this.state.requestType = 1;
          this._MedcineInfo();
      }
    }

    _MedicineNavigation(guest){
      if(guest == true){
        this.props.navigation.navigate('GuestLogin')
      }else{
        this.props.navigation.navigate('MedicineCalendar',{medicineUpdate : this._MedicineUpdate})
      }
    }
  
    render(){
      //게스트 로그인 확인
      const guest = Users.guest;
      // console.log(TAG,'guest : ' + guest);
      // console.log(TAG,"time : " + Moment(Moment().format('YYYY-MM-DD') + " " + "18:24").format("a HH:mm"));
        return (
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#fff'}}>
                  {this._Calendar()}
                  {this._TwoDialogVisible()}
                    <View style = {{width : '100%', height : 48, flexWrap : 'nowrap', flexDirection : 'row', alignItems : 'center',}}>
                      
                      <Image source = {imgLogo} style = {{width : 24, height : 27, resizeMode : 'contain', marginLeft : 20}}></Image>
                      <View style = {{flex : 1,}}></View>

                      <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(guest == false ? 'KakaoAlarmList' : 'GuestLogin')} >
                        <Image source = {imgKakao} style = {{width : 24, height : 24, resizeMode : 'contain',}}></Image>
                      </TouchableWithoutFeedback>

                      <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(guest == false ? 'AlarmList' : 'GuestLogin')} >
                        <Image source = {imgAlarm} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 16}}></Image>
                      </TouchableWithoutFeedback>

                      <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(guest == false ? 'MyPage' : 'GuestLogin')}>
                        <Image source = {imgMy} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 16, marginRight : 24}}></Image>
                      </TouchableWithoutFeedback>
                    </View>

                    <Text style = {{color : '#000', fontSize : 16, marginTop : 16, fontFamily : 'KHNPHDotfB', marginLeft : 20}}>{Users.guest == true ? "게스트님" : Users.userName+"님"}</Text>
                    <Text style = {{color : '#000', fontSize : 14, marginTop : 20, fontFamily : 'KHNPHDotfR', marginLeft : 20, lineHeight : 25, width : '50%',}}>{this.state.randomMessage}</Text>
  
                    <Image style = {{marginTop : 19, height : 156, width : '100%', resizeMode : 'contain',}} source = {imgMain}></Image>

                    <ScrollView style = {{position : 'absolute', top : 50, width : '100%', height : '100%'}} onScroll={this.handleScroll}>
                        <View style = {{width : '100%', height : 48, flexWrap : 'nowrap', flexDirection : 'row', alignItems : 'center', opacity : 0}}></View>

                        <Text style = {{color : '#000', fontSize : 16, marginTop : 16, fontFamily : 'KHNPHDotfB', marginLeft : 20, opacity : 0}}>{Users.userName+"님"}</Text>
                        <Text style = {{color : '#000', fontSize : 14, marginTop : 20, fontFamily : 'KHNPHDotfR', marginLeft : 20, width : '50%',lineHeight : 25, opacity : 0}}>{this.state.randomMessage + 'ㅁㅁㅁㅁ'}</Text>
      
                        <Image style = {{marginTop : 19, height : 106, width : '100%', resizeMode : 'contain', opacity : 0}}></Image>

                        <View style = {{width : '100%', backgroundColor : '#F6F7F9', paddingLeft : 20, paddingTop : 20, marginTop: 16, borderTopLeftRadius : 32, ...Elevations[20]}}>
                            <View style = {{paddingRight : 20,}}>
                              {this.state.noticeMessageExistence && <View style={{width : '100%', flexDirection : 'row'}}>
                                <Text style = {{fontSize : 12, fontFamily : 'KHNPHDotfB'}}>{"공지사항 | "}</Text>
                                <TextTicker style = {{fontSize : 12, fontFamily : 'KHNPHUotfR'}} shouldAnimateTreshold = {100} bounce = {false} loop = {true} duration={20000} marqueeDelay={0} repeatSpacer={40}>{this.state.noticeMessages}</TextTicker>
                              </View>}
                              <TouchableWithoutFeedback onPress = {() => this._MedicineNavigation(guest)}>
                                <View style = {{marginTop: 19, borderRadius : 24, backgroundColor : "rgba(219,227,241,0.5)", paddingLeft : 20 , paddingRight : 20, ...Elevations[0]}}>
                                  <View style = {{marginTop : 18.5, flexDirection : 'row', alignItems : 'center', justifyContent : 'center', backgroundColor : "rgb(219,227,241)", ...Elevations[4], height : 40, borderRadius : 16}}>
                                 
                                    <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                                      <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}}>오늘의 약과 주사</Text>
                                      <Image source = {imgInjector} style = {{width : 32, height : 32, resizeMode : 'contain', marginLeft : 12}}></Image>
                                      <Image source = {imgDrug} style = {{width : 32, height : 32, resizeMode : 'contain',}}></Image>
                                      <Image source = {imgPlantain} style = {{width : 32, height : 32, resizeMode : 'contain',}}></Image>
                                    </View>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, marginRight : 22}}></Image>
                                  </View>

                                  <View style = {{height : 0.5, width : '100%', backgroundColor : '#AFAFAF', marginTop : 16,}}></View>

                                  {this.state.datas.length > 0 ? <View style = {{width : '100%', alignItems : 'center', justifyContent : 'center', marginTop : 25}}><Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}}>{"처방된 약과 주사를 잊지 말고 챙겨주세요."}</Text></View> : <View style = {{width : '100%', alignItems : 'center', justifyContent : 'center', marginTop : 25}}><Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}}>{"해당일에는 복약정보가 없습니다."}</Text></View>}
                                  
                                  <View style = {{marginTop: 28, marginBottom : 20}}>
                                    {this.state.datas.map((item,index) => 
                                    <TouchableWithoutFeedback onPress = {() => this.setState({calendarVisible : true, selectPosition : index, selectMedicineName : item.medicine_name, eatingTime : Moment().format("a HH:mm"), selectTime : Moment().format("HH:mm")})}>
                                    <View key={index} style = {{marginTop : index == 0 ? 0 : 8, backgroundColor : '#fff', height : 40, borderRadius : 16, alignItems : 'center', justifyContent : 'center'}}>
                                      <View style = {{ flexDirection : 'row', alignItems : 'center', paddingLeft : 12, paddingRight : 12}}>
                                          <Image source = {imgCircle} style = {{width : 8 , height : 8, resizeMode : 'contain',}}></Image>
                                          <Text style = {{marginLeft : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : '#000', flex : 1}} ellipsizeMode = "tail" numberOfLines = {3}>{item.medicine_name}</Text>
                                          <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfR', color : '#000', flex : 1}}>{item.amount + item.unit}</Text>
                                          {item.take_time.length > 0 ? 
                                            <View style = {{flex : 1, justifyContent : 'flex-end', flexDirection : 'row', flexWrap : 'wrap'}}>
                                              <Image source = {imgClock} style = {{width : 12, height : 12, resizeMode : 'contain',}}></Image>
                                              <Text style = {{marginLeft : 7, fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Moment(Moment().format('YYYY-MM-DD') + " " + item.take_time).format('a h시 mm분')}</Text>
                                          </View>
                                           : <View style = {{flex : 1, alignItems : 'flex-end', justifyContent : 'flex-end'}}><Image source = {imgArrow} style = {{width : 8, height : 12, marginRight : 11.5}}></Image></View>}
                                        </View>
                                    </View>
                                    </TouchableWithoutFeedback>)}
                                    
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>
                            
                              <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(guest == false ? 'AnimationTest' : 'GuestLogin')}>
                                <View style={{marginTop: 20, borderRadius : 24, backgroundColor : "#fff", paddingLeft : 20 , paddingRight : 31.5, flexDirection : 'row', width : '100%', height : 76, alignItems : 'center'}}>
                                  <Image source = {imgEmbryo} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                  <Text style = {{marginLeft : 16, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', flex : 1,}}>{"배아의 발달상태를 확인\n해보세요:)"}</Text>
                                  <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                              </TouchableWithoutFeedback>

                              <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(guest == false ? 'CalendarTest' : 'GuestLogin')}>
                                <View style={{marginTop: 20, borderRadius : 24, backgroundColor : "#fff", paddingLeft : 20 , paddingRight : 31.5, flexDirection : 'row', width : '100%', height : 76, alignItems : 'center'}}>
                                  <Image source = {imgFeeling} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                  <Text style = {{marginLeft : 16, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', flex : 1,}}>{"오늘 하루는 어땠나요?"}</Text>
                                  <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                </View>
                              </TouchableWithoutFeedback>
                              
                              <Text style = {{marginTop : 32, fontSize : 16, color : '#AFAFAF', fontFamily : 'KHNPHDotfR'}}>HI의료진이 알려주는</Text>

                              <Text style = {{marginTop : 15, fontSize : 20, color : '#000', fontFamily : 'KHNPHDotfB'}}>HI난임시술</Text>

                              <View style = {{width : '100%', borderRadius : 24, backgroundColor : "#fff", marginTop : 20, paddingLeft : 31.5 , paddingRight : 20, paddingTop : 16, paddingBottom : 18}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('BasicInspection')}>
                                  <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                    <Image source = {imgInspection} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                    <Text style = {{flex : 1, marginLeft : 20, fontFamily : 'KHNPHDotfB', fontSize : 16, color : '#000'}}>난임 기본검사</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('IUI')}>
                                  <View style = {{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                    <Image source = {imgInsemination} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                    <Text style = {{flex : 1, marginLeft : 20, fontFamily : 'KHNPHDotfB', fontSize : 16, color : '#000'}}>인공수정</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                  </View>
                                </TouchableWithoutFeedback>
                              
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('IVF_ET')}>
                                  <View style = {{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                    <Image source = {imgTestTube} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                    <Text style = {{flex : 1, marginLeft : 20, fontFamily : 'KHNPHDotfB', fontSize : 16, color : '#000'}}>시험관 시술</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('Technology')}>
                                  <View style = {{flexDirection : 'row', alignItems : 'center', marginTop : 20}}>
                                    <Image source = {imgTechnique} style = {{width : 52, height : 52, resizeMode : 'contain',}}></Image>
                                    <Text style = {{flex : 1, marginLeft : 20, fontFamily : 'KHNPHDotfB', fontSize : 16, color : '#000'}}>배양기술력</Text>
                                    <Image source = {imgArrow} style = {{width : 8, height : 12, resizeMode : 'contain',}}></Image>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>

                              <Text style = {{marginTop : 34, fontSize : 20, color : '#000', fontFamily : 'KHNPHDotfB'}}>자가주사</Text>
                              <Text style = {{marginTop : 9, fontSize : 16, color : '#AFAFAF', fontFamily : 'KHNPHDotfR'}}>{"함께하면 어렵지 않아요:)"}</Text>

                              <View style = {{width : '100%', marginTop : 21, flexDirection : 'row'}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('SelfInjection')}>
                                  <View style = {{flex : 1, }}>
                                    <View style = {{aspectRatio : 1, borderTopLeftRadius : 32, borderTopRightRadius : 32, alignItems : 'center', justifyContent : 'center'}}>
                                      <Image source = {imgInjectorWayBg} style = {{resizeMode : 'contain', width : '100%', height : '100%'}}></Image>
                                      <Image source = {imgVideoPlay} style = {{width : 60, height : 60, position : 'absolute',}}></Image>
                                    </View>
                                    <View style = {{width : '100%', height : 44, backgroundColor : '#fff', borderBottomLeftRadius : 32, borderBottomRightRadius : 32, alignItems : 'center', justifyContent : 'center'}}>
                                      <Text style = {{fontSize : 16, color : '#000', fontFamily : 'KHNPHDotfB'}}>주사방법</Text>
                                    </View>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('InjectionList')}>
                                  <View style = {{flex : 1, marginLeft : 23,}}>
                                    <View style = {{aspectRatio : 1, backgroundColor : '#000', borderTopLeftRadius : 32, borderTopRightRadius : 32, alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source = {imgInjectorVideoBg} style = {{resizeMode : 'contain', width : '100%', height : '100%'}}></Image>
                                      <Image source = {imgVideoPlay} style = {{width : 60, height : 60, position : 'absolute',}}></Image>
                                    </View>
                                    <View style = {{width : '100%', height : 44, backgroundColor : '#fff', borderBottomLeftRadius : 32, borderBottomRightRadius : 32, alignItems : 'center', justifyContent : 'center'}}>
                                      <Text style = {{fontSize : 16, color : '#000', fontFamily : 'KHNPHDotfB'}}>주사별 영상</Text>
                                    </View>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                              </View>
                            </View>
                            
                            <Text style = {{marginTop : 32, fontSize : 16, color : '#AFAFAF', fontFamily : 'KHNPHDotfR'}}>{"HI에서 아이를 만난 부부가 전하는"}</Text>
                            <Text style = {{marginTop : 15, fontSize : 20, color : '#000', fontFamily : 'KHNPHDotfB'}}>희망의 메세지</Text>

                            <ScrollView style = {{marginTop : 20}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                              {this.state.messageDatas.map((item, index) => (index != 3 ? <View key={index} style={{width : 292, height : 232, backgroundColor : "rgb(236,233,228)", borderRadius : 24, marginLeft : index == 0 ? 0 : 20, marginRight : index == this.state.messageDatas.length-1 ? 20 : 0, paddingTop : 24, paddingLeft : 20, paddingRight : 18, paddingBottom : 15}}>
                                <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfR', color : item.kind == 1 ? '#E39C42' : '#4A50CA'}}>{(item.kind == 1 ? "임신했어요" : "출산했어요")}</Text>
                                <Text style = {{fontSize : 18, fontFamily : 'KHNPHDotfB', color : '#000', marginTop : 13}}>{(item.kind == 1 ? "아이를 기다리는 난임부부에게 전하고 싶은 말" : "주치의에게 전하고 싶은 말")}</Text>
                                <Text style = {{flex : 1, fontSize : 14, color : '#000', marginTop : 20, fontFamily : 'NotoSansCJKkr-Regular'}} ellipsizeMode = "tail" numberOfLines = {3}>{(item.kind == 1 ? item.cont1 : item.cont2)}</Text>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('HopeMessageDetail',{datas : this.state.messageDatas[index]})}>
                                  <View style = {{justifyContent : 'flex-end', width : '100%', flexDirection : 'row', alignItems : 'center'}}>
                                    <Text style = {{fontSize : 14, fontFamily : 'NotoSansCJKkr-Bold', color : '#AFAFAF'}}>more</Text>
                                    <Image source = {imgArrow} style = {{width : 4, height : 8, resizeMode : 'contain', marginLeft : 10}}></Image>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View> : <View key={index} style={{width : 292, height : 232, backgroundColor : 'rgb(236,233,228)', borderRadius : 24, marginLeft : index == 0 ? 0 : 20, marginRight : index == this.state.messageDatas.length-1 ? 20 : 0, paddingTop : 24, paddingLeft : 20, paddingRight : 18, paddingBottom : 15}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AboutWebview',{tag : "pregnancy"})}>
                                  <View style = {{flex : 1, paddingTop : 0}}>
                                    <Text style = {{flex : 1, fontSize : 18, fontFamily : 'KHNPHDotfB', color : '#000', lineHeight : 30}}>{"HI홈페이지에서\n더 많은 메시지를\n확인해보세요."}</Text>
                                    <View style = {{justifyContent : 'flex-end', width : '100%', flexDirection : 'row', alignItems : 'center'}}>
                                      <Text style = {{fontSize : 14, fontFamily : 'NotoSansCJKkr-Bold', color : '#AFAFAF'}}>more</Text>
                                      <Image source = {imgArrow} style = {{width : 4, height : 8, resizeMode : 'contain', marginLeft : 10}}></Image>
                                    </View>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>)
                              )}
                            </ScrollView>
                            
                            <View style = {{paddingRight : 20}}>
                              <Text style = {{marginTop : 32, fontSize : 20, color : '#000', fontFamily : 'KHNPHDotfB'}}>About HI</Text>
                              <View style = {{marginTop : 20, flexDirection : 'row', alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AboutWebview',{tag : "staff"})}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source = {imgStaff} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>HI 의료진</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AboutWebview',{tag : "reservation"})}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginLeft : 23}}>
                                    <Image source = {imgReservation} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>HI 진료 및 예약</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>

                              <View style = {{marginTop : 20, flexDirection : 'row', alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('HINews')}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source = {imgNews} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>HI 새소식</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AboutWebview',{tag : "question"})}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginLeft : 23}}>
                                    <Image source = {imgQuestion} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>HI 소리함</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>

                              <View style = {{marginTop : 20, flexDirection : 'row', alignItems : 'center'}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('Caution')}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                    <Image source = {imgCaution} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>난임시술 주의사항</Text>
                                  </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('Business')}>
                                  <View style = {{flex : 1, aspectRatio : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginLeft : 23}}>
                                    <Image source = {imgBusiness} style = {{width : 60, height : 60, resizeMode : 'contain',}}></Image>
                                    <Text style = {{marginTop : 16, fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>난임지원사업</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>
                            </View>

                            <View style = {{marginBottom : 72}}></View>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>       
        );
    }
}