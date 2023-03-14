import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  ImageBackground,
  Dimensions,
  LogBox,
  AppState,
  FlatList,
  Linking,
  Animated
} from 'react-native';
import Elevations from 'react-native-elevation';
import Users from './Common/User'
import TextTicker from 'react-native-text-ticker'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker'
import TowBtnDialog from './Common/TwoBtnDialog'
import MedicineUpdateDialog from './Common/MedicineUpdateDialog'
import FetchingIndicator from 'react-native-fetching-indicator'
import Toast from 'react-native-toast-message';
// import Marquee from "react-native-awesome-marquee";
import Webview from 'react-native-webview';
import ServerUrl from './Common/ServerUrl'
import PageList from 'react-native-page-list'
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import FastImage from 'react-native-fast-image'

const TAG = "Home";
const { width: screenWidth } = Dimensions.get('window')
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
const imgCirclePink = require('../assets/ic_pink_circle.png');
const imgCircleGreen = require('../assets/ic_green_circle.png');
const imgCircleBlue = require('../assets/ic_blue_circle.png');
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
const imgNight = require('../assets/ic_home_night.png');
const imgNightStart = require('../assets/ic_night_start.png')
const imgNightBg = require('../assets/img_night_bg3.png')
const imgMorning01 = require('../assets/img_morning_01.png');
const imgMorning02 = require('../assets/img_morning_02.png');
const imgMorning03 = require('../assets/img_morning_03.png');
const imgMorning04 = require('../assets/img_morning_04.png');
const imgSunrise = require('../assets/img_sunrise.png');
let gifImg1 = require('../assets/hi001.gif')
let gifImg2 = require('../assets/hi002.gif')
let gifImg3 = require('../assets/hi003.gif')
let gifImg4 = require('../assets/hi004.gif')

const holidayKr = require('holiday-kr');

LogBox.ignoreLogs([
  'Each child in a list should have a unique "key" prop.', 'onAnimatedValueUpdate', 'Warning'
]);

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    // this.toastRef = React.createRef();
    // this._webView = React.createRef();
    this._webView = {};
    this.scrollX = new Animated.Value(0);
  }

  state = {
    isLoading: false,
    headerHeight: 0,
    opacity: 1,
    balloonVisible: true,
    datas: [],
    includes: [],
    scheduleNo: [],
    namesList: [],
    messageDatas: [],
    messageLengthOver: false,
    noticeMessages: '',
    noticeMessageExistence: false,
    randomMessage: '',
    calendarVisible: false,
    eatingTime: '',
    selectTime: '',
    selectPosition: 0,
    twoDialogVisible: false,
    twoDialogCancelVisible: false,
    exceptTwoDialogVisible: false,
    selectMedicineName: '',
    requestType: 1,
    isFetching: true,
    sunsise: true,
    textHeight: 0,
    sunrise: '',
    sunset: '',
    appState: AppState.currentState,
    isScrollingDown: false,
    lastRow: null,
    opuDate: '',
    etDate: '',
    cryoDate: '',
    bhcgDate: '',
    visitDate: '',
    iuiDate: '',
    opuDateList: [],
    etDateList: [],
    cryoDateList: [],
    bhcgDateList: [],
    iuiDateList: [],
    visitDateList: [],
    videoDatas: [],
    playing: false,
    playerId: '',
    popupSelectType: '',
    randomNum: 1,
    bannerDatas: [],
    injectionTimes: [],
    injectionTimeDatas: [],
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange);
    // this.props.navigation.removeListener('focus')
    console.log(TAG, 'componentWillUnmount');
  }

  //20220106 foreground / background state 추가
  handleAppStateChange = (nextAppState) => {
    console.log(TAG, this.state.appState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.setState({ isFetching: true })
      this._NoticeMessage();
    }
    this.setState({ appState: nextAppState });
  }

  componentDidMount() {
    console.log(TAG, 'componentDidMount')
    // AppState.addEventListener('change', this.handleAppStateChange);
    if (Users.userName == undefined && Users.guest == false) {
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

    console.log(`random : ${Math.floor(Math.random() * 4) + 1}`)

    // this.onFocusTrigger = this.props.navigation.addListener('focus', () => {
    //   if (Users.guest == false) {
    //     console.log(TAG, 'onFocus')
    //     // this.setState({isFetching : true})
    //     this.state.requestType = 1;
    //     this._NoticeMessage();
    //   }
    // });
    console.log(TAG, 'test')
    this.setState({ isFetching: true, randomNum: Math.floor(Math.random() * 4) + 1 })
    this._NoticeMessage();
  }

  _SunRiseTime() {

    fetch("https://api.sunrise-sunset.org/json?lat=37.470645&lng=127.129323&date=today", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: 'cors',
      cache: 'default',
      body: null,
    }).then(
      response => response.json()
    ).then(
      json => {
        console.log(TAG, json);
        if (json.results !== '') {
          if (json.results.sunrise.includes('PM')) {
            let test = json.results.sunrise;
            test = test.replace('PM', '오후')
            let now = new Date(Moment(test, 'hh:mm:ss A'));
            now.setHours(now.getHours() + 9);
            this.state.sunrise = Moment(now).format('HH:mm');
          } else {
            let test = json.results.sunrise;
            test = test.replace('AM', '오전')
            let now = new Date(Moment(test, 'hh:mm:ss A'));
            now.setHours(now.getHours() + 9);
            this.state.sunrise = Moment(now).format('HH:mm');
          }
          if (json.results.sunset.includes('AM')) {
            let test = json.results.sunset;
            test = test.replace('AM', '오전')
            let now = new Date(Moment(test, 'hh:mm:ss A'));
            now.setHours(now.getHours() + 9);
            this.state.sunset = Moment(now).format('HH:mm');
          } else {
            let test = json.results.sunset;
            test = test.replace('PM', '오후')
            let now = new Date(Moment(test, 'hh:mm:ss A'));
            now.setHours(now.getHours() + 9);
            this.state.sunset = Moment(now).format('HH:mm');
          }

          let now = Moment().format('HH:mm');
          if (parseInt(now.replace(':', '')) > parseInt(this.state.sunrise.replace(':', '')) && parseInt(now.replace(':', '')) < parseInt(this.state.sunset.replace(':', ''))) {
            console.log(TAG, '일출 후 일몰 전')
            // this.toastRef.show('일출 후 일몰 전')
            this.setState({
              sunsise: true,
            })
            // Toast.show({
            //   type: 'success',
            //   text1: '일출 후 일몰 전',
            //   text2: 'This is some something 👋'
            // });
          } else {
            console.log(TAG, '일몰 후 일출 전')
            // this.toastRef.show('일몰 후 일출 전')
            this.setState({
              sunsise: false,
            })
            // Toast.show({
            //   type: 'success',
            //   text1: '일몰 후 일출 전',
            //   text2: 'This is some something 👋'
            // });
          }
        }
      }
    )
    this._NoticeMessage();
  }

  //한줄 메세지
  _NoticeMessage() {
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

    fetch(ServerUrl.oneLineNoticeUrl, {
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
          if (Object.keys(json.Resources).length > 0) {
            this.state.noticeMessageExistence = true;
            this.state.noticeMessages = json.Resources[0].contents;
          } else {
            this.state.noticeMessageExistence = false;
          }
        } else {
          this.state.noticeMessageExistence = false;
        }
        this._HopeMessages();
        this._RandomMessages();
      }
    )
  }

  //희망 메세지
  _HopeMessages() {
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

    fetch(ServerUrl.hopeMessagesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: 'cors',
      cache: 'default',
      body: null,
    }).then(
      response => response.json()
    ).then(
      json => {
        this.state.messageDates = [];
        if (Object.keys(json.data).length > 3) {
          for (let i = 0; i < 4; i++) {
            const obj = ({
              kind: json.data[i].kind || '',
              cont1: json.data[i].cont1 || '',
              cont2: json.data[i].cont2 || '',
              customerName: json.data[i].customerName || '',
              kind2Childbirth: json.data[i].kind2Childbirth || '',
              kind2BirthType: json.data[i].kind2BirthType || '',
              kind2Baby1: json.data[i].kind2Baby1 || '',
              kind2Baby2: json.data[i].kind2Baby2 || '',
              kind2Baby3: json.data[i].kind2Baby3 || '',
              answerCont: json.data[i].answerCont || '',
              answerDate: json.data[i].answerDate || '',
              answerYn: json.data[i].answerYn || '',
              kind1Age: json.data[i].kind1Age || '',
              kind1Term: json.data[i].kind1Term || '',
              kind1Sisul: json.data[i].kind1Sisul || '',
              kind1Effort: json.data[i].kind1Effort || '',
            })
            this.state.messageDatas.push(obj);
          }
          this.state.messageLengthOver = true;
        } else {
          for (i == 0; i < Object.keys(json.data).length; i++) {
            const obj = ({
              kind: json.data[i].kind || '',
              cont1: json.data[i].cont1 || '',
              cont2: json.data[i].cont2 || '',
              customerName: json.data[i].customerName || '',
              kind2Childbirth: json.data[i].kind2Childbirth || '',
              kind2BirthType: json.data[i].kind2BirthType || '',
              kind2Baby1: json.data[i].kind2Baby1 || '',
              kind2Baby2: json.data[i].kind2Baby2 || '',
              kind2Baby3: json.data[i].kind2Baby3 || '',
              answerCont: json.data[i].answerCont || '',
              answerDate: json.data[i].answerDate || '',
              answerYn: json.data[i].answerYn || '',
              kind1Age: json.data[i].kind1Age || '',
              kind1Term: json.data[i].kind1Term || '',
              kind1Sisul: json.data[i].kind1Sisul || '',
              kind1Effort: json.data[i].kind1Effort || '',
            })
            this.state.messageDatas.push(obj);
          }
          this.state.messageLengthOver = false;
        }
      }
    )
  }

  //랜덤 메세지
  _RandomMessages() {
    var details = {

    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch(ServerUrl.RandomMessageInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: 'cors',
      cache: 'default',
      body: null,
    }).then(
      response => response.json()
    ).then(
      json => {
        console.log(TAG, JSON.stringify(json));
        if (json.Error_Cd == "0000") {
          if (Object.keys(json.Resources).length > 0) {
            this.state.randomMessage = json.Resources[0].contents;
          }
        }
        if (Users.guest == true) {
          this._VideoInfo();
        } else {
          this._MedcineInfo();
        }
      }
    )
  }

  //복약 list, 복약 insert
  _MedcineInfo() {
    var details = null;
    var url = "";
    console.log(TAG, 'here')
    if (this.state.requestType == 1) {
      url = ServerUrl.medicineInfoList;
      console.log("user_no : " + Users.userNo)
      details = {
        'access_token': Users.AccessToken,
        'refresh_token': Users.RefreshToken,
        'user_no': Users.userNo,
        'cel_date_pick': Moment().format('YYYYMMDD'),
      };
    } else if (this.state.requestType == 2) {
      this.setState({ isFetching: true })
      url = ServerUrl.medicineUpdate;
      details = {
        'access_token': Users.AccessToken,
        'refresh_token': Users.RefreshToken,
        'schedule_no': this.state.datas[0].schedule_no,
        'medicine_info': JSON.stringify(this.state.datas),
      };
    }

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    console.log(TAG, 'here1')
    fetch(url, {
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

        if (json.Error_Cd == "0000") {
          if (this.state.requestType == 1) {
            console.log(TAG, JSON.stringify(json) + ' 1111');
            this.state.datas = [];
            this.state.scheduleNo = [];
            this.state.namesList = [];
            this.state.opuDateList = [];
            this.state.etDateList = [];
            this.state.cryoDateList = [];
            this.state.bhcgDateList = [];
            this.state.iuiDateList = [];
            this.state.visitDateList = [];
            this.state.injectionTimes = [];
            this.state.injectionTimeDatas = [];

            for (let i = 0; i < Object.keys(json.InjectionTime).length; i++) {
              this.state.injectionTimes.push(json.InjectionTime[i].time.substring(0, 10))
              const obj = ({
                before: json.InjectionTime[i].before || '',
                chartNo: json.InjectionTime[i].chart_no || '',
                time: json.InjectionTime[i].time || '',
              })
              this.state.injectionTimeDatas.push(obj)
            }

            for (let i = 0; i < Object.keys(json.OpuDate).length; i++) {
              if (Moment().format('YYYYMM') == json.OpuDate[i].cel_date.replace("-", "").substring(0, 6)) {
                this.state.opuDate = json.OpuDate[i].cel_date;
                this.state.opuDateList.push(json.OpuDate[i].cel_date)
              }
            }
            for (let i = 0; i < Object.keys(json.EtDate).length; i++) {
              this.state.etDate = json.EtDate[i].cel_date;
              this.state.etDateList.push(json.EtDate[i].cel_date)
            }

            if (Array.isArray(json.ReTreatDate)) {
              for (let i = 0; i < Object.keys(json.ReTreatDate).length; i++) {
                this.state.visitDate = json.ReTreatDate[i].appointment_date.substring(0, 10);
                this.state.visitDateList.push(json.ReTreatDate[i].appointment_date.substring(0, 10))
              }
            } else {
              this.state.visitDate = json.ReTreatDate.substring(0, 10);
              this.state.visitDateList.push(json.ReTreatDate.substring(0, 10))
            }

            for (let i = 0; i < Object.keys(json.BhcgDate).length; i++) {
              this.state.bhcgDate = json.BhcgDate[i].cel_date;
              this.state.bhcgDateList.push(json.BhcgDate[i].cel_date)
            }

            for (let i = 0; i < Object.keys(json.IUIDate).length; i++) {
              this.state.iuiDate = json.IUIDate[i].cel_date;
              this.state.iuiDateList.push(json.IUIDate[i].cel_date)
            }

            for (let i = 0; i < Object.keys(json.Medicine).length; i++) {
              const obj = ({
                abbreviation: json.Medicine[i].abbreviation || '',
                amount: json.Medicine[i].amount || '',
                cel_date: json.Medicine[i].cel_date || '',
                every_other_day: json.Medicine[i].every_other_day || '',
                idx: json.Medicine[i].idx || '',
                medicine_name: json.Medicine[i].medicine_name || '',
                medicine_app_name: json.Medicine[i].medicine_app_name || '',
                medicine_no: json.Medicine[i].medicine_no || '',
                memo: json.Medicine[i].taking || '',
                purpose: json.Medicine[i].purpose || '',
                reg_date: json.Medicine[i].reg_date || '',
                reg_id: json.Medicine[i].reg_id || '',
                unit: json.Medicine[i].unit || '',
                type: json.Medicine[i].type || '',
                take_time: json.Medicine[i].take_time || '',
                schedule_no: json.Medicine[i].schedule_no || '',
              })
              this.state.scheduleNo.push(json.Medicine[i].schedule_no || '');
              this.state.namesList.push(json.Medicine[i].medicine_name || '');
              this.state.datas.push(obj);
            }

            for (let i = 0; i < Object.keys(json.Luteal).length; i++) {
              for (let j = 0; j < Object.keys(json.Luteal[i].medicine_info).length; j++) {
                if (json.Luteal[i].cel_date == Moment().format('YYYY-MM-DD')) {
                  if (this.state.scheduleNo.includes(json.Luteal[i].schedule_no) == true) {
                    let test = false;
                    for (let x = 0; x < this.state.namesList.length; x++) {
                      console.log(TAG, this.state.scheduleNo[x] + " " + json.Luteal[i].schedule_no)
                      if (this.state.scheduleNo[x] === json.Luteal[i].schedule_no && this.state.namesList[x] === json.Luteal[i].medicine_info[j].medicine_name) {
                        test = true;
                        break;
                      }
                    }
                    if (test === false) {
                      const obj = ({
                        abbreviation: json.Luteal[i].medicine_info[j].abbreviation || '',
                        amount: json.Luteal[i].medicine_info[j].amount || '',
                        cel_date: json.Luteal[i].cel_date || '',
                        every_other_day: json.Luteal[i].medicine_info[j].every_other_day || '',
                        idx: '',
                        medicine_name: json.Luteal[i].medicine_info[j].medicine_name || '',
                        medicine_app_name: json.Luteal[i].medicine_info[j].medicine_app_name || '',
                        medicine_no: json.Luteal[i].medicine_info[j].medicine_no || '',
                        memo: json.Luteal[i].medicine_info[j].memo || '',
                        purpose: json.Luteal[i].medicine_info[j].purpose || '',
                        reg_date: json.Luteal[i].medicine_info[j].reg_date || '',
                        reg_id: json.Luteal[i].medicine_info[j].reg_id || '',
                        unit: json.Luteal[i].medicine_info[j].unit || '',
                        type: json.Luteal[i].medicine_info[j].medicine_type || '',
                        take_time: json.Luteal[i].medicine_info[j].take_time || '',
                        schedule_no: json.Luteal[i].schedule_no || '',
                      })
                      if (json.Luteal[i].medicine_info[j].every_other_day == 1) {
                        if (i % 2 == 0) {
                          this.state.datas.push(obj);
                        }
                      } else {
                        this.state.datas.push(obj);
                      }
                    }
                  } else {
                    const obj = ({
                      abbreviation: json.Luteal[i].medicine_info[j].abbreviation || '',
                      amount: json.Luteal[i].medicine_info[j].amount || '',
                      cel_date: json.Luteal[i].cel_date || '',
                      every_other_day: json.Luteal[i].medicine_info[j].every_other_day || '',
                      idx: '',
                      medicine_name: json.Luteal[i].medicine_info[j].medicine_name || '',
                      medicine_app_name: json.Luteal[i].medicine_info[j].medicine_app_name || '',
                      medicine_no: json.Luteal[i].medicine_info[j].medicine_no || '',
                      memo: json.Luteal[i].medicine_info[j].memo || '',
                      purpose: json.Luteal[i].medicine_info[j].purpose || '',
                      reg_date: json.Luteal[i].medicine_info[j].reg_date || '',
                      reg_id: json.Luteal[i].medicine_info[j].reg_id || '',
                      unit: json.Luteal[i].medicine_info[j].unit || '',
                      type: json.Luteal[i].medicine_info[j].medicine_type || '',
                      take_time: json.Luteal[i].medicine_info[j].take_time || '',
                      schedule_no: json.Luteal[i].schedule_no || '',
                    })
                    if (json.Luteal[i].medicine_info[j].every_other_day == 1) {
                      if (i % 2 == 0) {
                        this.state.datas.push(obj);
                      }
                    } else {
                      this.state.datas.push(obj);
                    }
                  }
                }
              }
            }
            this._VideoInfo();
          } else if (this.state.requestType == 2) {
            this.state.requestType = 1;
            this._MedcineInfo();
          }
        } else {
          this.state.datas = [];
          this.state.scheduleNo = [];
          this.state.namesList = [];
          this._VideoInfo();
          console.log(TAG, '0005');

        }

      }
    )
  }

  _VideoInfo() {
    var details = {
      'access_token': Users.AccessToken,
      'refresh_token': Users.RefreshToken,
      'category': '6',
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch(ServerUrl.VideoListDetail, {
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
          this.state.videoDatas = [];
          for (let i = 0; i < Object.keys(json.Resources).length; i++) {
            const obj = {
              title: json.Resources[i].title,
              contents: json.Resources[i].contents,
              videoUrl: json.Resources[i].file_url,
            }
            this.state.videoDatas.push(obj);
          }
        }
        this._BannerInfo()
      }
    )
  }

  _BannerInfo() {
    var formBody = [];

    formBody = formBody.join("&");

    fetch(ServerUrl.BannerInfo, {
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
          for (let i = 0; i < Object.keys(json.Resources).length; i++) {
            if (json.Resources[i].alive_flag == 1) {
              const obj = ({
                banner_no: json.Resources[i].banner_no || '',
                banner_url: json.Resources[i].banner_url || '',
                category: json.Resources[i].category || '',
                phone_num: json.Resources[i].phone || '',
                priority: json.Resources[i].priority || '',
                thumbnail: json.Resources[i].thumbnail || ''
              })
              this.state.bannerDatas.push(obj)
            }
          }
          this.state.bannerDatas.sort((a, b) => { return a.priority - b.priority })
        }
        this.setState({
          isLoading: true,
          isFetching: false,
        })
      }
    )
  }

  initPlayer = (videoId) => {
    this._webView[videoId].injectJavaScript(`
      window.initPlayer({
          id: 59777392,
          width:${screenWidth - 100},
          height:${(screenWidth - 100) * 0.5625},
      })
      void(0);
    `);
  };

  playPause(name, data) {
    if (this.state.playing == true) {
      this._webView[this.state.playerId].injectJavaScript(`
      window.player.pause(); true;`);
    } else {
      console.log(TAG, 'playPause : pause');
    }
    if (name == 'HopeMessageDetail') {
      this.props.navigation.navigate('HopeMessageDetail', { datas: data })
    } else if (name == 'AboutWebview') {
      this.props.navigation.navigate('AboutWebview', { tag: data })
    } else if (name == 'KakaoAlarmList') {
      this.props.navigation.navigate(Users.guest == false ? 'KakaoAlarmList' : 'GuestLogin')
    } else if (name == 'AlarmList') {
      this.props.navigation.navigate(Users.guest == false ? 'AlarmList' : 'GuestLogin')
    } else if (name == 'MyPage') {
      this.props.navigation.navigate(Users.guest == false ? 'MyPage' : 'GuestLogin')
    } else if (name == 'CellDevelop') {
      this.props.navigation.navigate(Users.guest == false ? 'CellDevelop' : 'GuestLogin')
    } else if (name == 'CalendarTest') {
      this.props.navigation.navigate('CalendarTest')
    } else if (name == 'BasicInspection') {
      this.props.navigation.navigate('BasicInspection')
    } else if (name == 'IUI') {
      this.props.navigation.navigate('IUI')
    } else if (name == 'IVF_ET') {
      this.props.navigation.navigate('IVF_ET')
    } else if (name == 'Technology') {
      this.props.navigation.navigate('Technology')
    } else if (name == 'HINews') {
      this.props.navigation.navigate('HINews')
    } else if (name == 'Caution') {
      this.props.navigation.navigate('Caution')
    } else if (name == 'Business') {
      this.props.navigation.navigate('Business')
    } else if (name == 'ChartWebview') {
      this.props.navigation.navigate('AboutWebview', { tag: 'home' })
    }

  };

  onMessage = (event) => {
    const eventType = event.nativeEvent.data;
    if (eventType === 'pause') {
      this.setState({ playing: false });
    } else {
      console.log(TAG, 'onMessage : ' + eventType)
      this.setState({ playing: true, playerId: eventType });
    }
  };

  _RenderItem = ({ item, index }) => {
    return <View key={index} style={{ width: (screenWidth - 100), marginLeft: index == 0 ? 0 : 24, marginRight: index == this.state.videoDatas.length - 1 ? 40 : 0 }}>
      {item.videoUrl.length > 0 && <View style={{ backgroundColor: 'transparent', }}>
        <Webview style={{ width: (screenWidth - 100), height: ((screenWidth - 100) * 0.5625) }} ref={ref => this._webView[item.videoUrl] = ref}
          mediaPlaybackRequiresUserAction={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
          domStorageEnabled={true}
          onLoadEnd={() => {
            console.log('onLoadEnd..')
            this.initPlayer(item.videoUrl)
          }}
          onMessage={this.onMessage}
          source={{
            html: `
            <html>
            <style>
              html * {
                margin:0!important;
                padding:0!important;
                box-sizing:border-box;
              }
            </style>
            <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
            <body>
            <div id="video">
              <iframe id="video2" src="https://player.vimeo.com/video/${item.videoUrl}&amp;badge=0&amp;autopause=true&amp;autoplay=false&amp;player_id=0&amp;app_id=58479" frameborder="0" fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
            </div>
            </body>
            <script src="https://player.vimeo.com/api/player.js"></script>
            <script>
                window.initPlayer = async function(opts) {
                  if(window.player) {
                    window.ReactNativeWebView.postMessage("pause");
                    await window.player.destroy();
                  }
            
                  const divEl = document.createElement('div');
                  divEl.id = 'video';
                  document.body.append(divEl);
            
                  window.player = new Vimeo.Player('video2', opts);
                  window.player.setVolume(1);
            
                  window.player.on('play', function() {
                      window.ReactNativeWebView.postMessage("${item.videoUrl}");
                  });
            
                  window.player.on('pause', function() {
                      window.ReactNativeWebView.postMessage("pause");
                  });
                }
            </script>
            </html>`
          }} />
        <View style={{ width: (screenWidth - 100), height: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingLeft: 10, paddingRight: 10 }}><Text style={{ fontSize: (item.title == '오비드렐-가니레버-데카펩틸-오가루트-폴리트롭' ? 12 : 14), fontFamily: 'KHNPHDotfB', color: '#000', textAlign: 'center' }}>{item.title}</Text></View>
      </View>}
    </View>
  }

  _UpdateTakeTime(str) {
    // console.log(TAG,'eatingTime : ' + this.state.selectTime);
    this.state.datas = this.state.datas.map((data, index) => this.state.selectPosition === index ? {
      abbreviation: data.abbreviation || '',
      amount: data.amount || '',
      cel_date: data.cel_date || '',
      every_other_day: data.every_other_day || '',
      idx: data.idx || '',
      medicine_name: data.medicine_name || '',
      medicine_app_name: data.medicine_app_name || '',
      medicine_no: data.medicine_no || '',
      memo: data.memo || '',
      taking: data.memo || '',
      purpose: data.purpose || '',
      reg_date: data.reg_date || '',
      reg_id: data.reg_id || '',
      unit: data.unit || '',
      type: data.type || '',
      take_time: this.state.selectTime || '',
      schedule_no: data.schedule_no || '',
    } : {
      abbreviation: data.abbreviation || '',
      amount: data.amount || '',
      cel_date: data.cel_date || '',
      every_other_day: data.every_other_day || '',
      idx: data.idx || '',
      medicine_name: data.medicine_name || '',
      medicine_app_name: data.medicine_app_name || '',
      medicine_no: data.medicine_no || '',
      memo: data.memo || '',
      taking: data.memo || '',
      purpose: data.purpose || '',
      reg_date: data.reg_date || '',
      reg_id: data.reg_id || '',
      unit: data.unit || '',
      type: data.type || '',
      take_time: data.take_time || '',
      schedule_no: data.schedule_no || '',
    })
    // console.log(TAG,this.state.datas);
    this.state.requestType = 2;
    this.setState({ twoDialogVisible: false, twoDialogCancelVisible: false })
    this._MedcineInfo();
  }

  end() {
    console.log("end of play");
  }

  _Calendar() {
    let str = "";
    // this.state.eatingTime = Moment().format("a HH:mm");
    // this.state.selectTime = Moment().format("HH:mm");

    return <Modal transparent={true} visible={this.state.calendarVisible}>
      <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', }}>
        <View style={{ width: '90%', height: 340, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', marginBottom: 20 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfR', color: '#000' }}>{this.state.selectMedicineName}</Text>
          </View>

          <DatePicker androidVariant="iosClone" date={new Date()} onDateChange={(value) => str = value} mode={"time"} locale="ko" style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', flexWrap: 'nowrap', height: 50, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ calendarVisible: false, })}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9699D6', borderRadius: 24 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'KHNPHDotfR', }}>취소</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this._TimeUpdate(str)}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4A50CA', borderRadius: 24, marginLeft: 23 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'KHNPHDotfR', }}>투약완료</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  }

  _TimeUpdate(time) {
    console.log(TAG, 'time : ' + time);
    if (time.length != 0) {
      this.state.eatingTime = Moment(time).format("a HH:mm");
      this.state.selectTime = Moment(time).format("HH:mm");
    }
    console.log(TAG, 'time : ' + this.state.eatingTime);
    this.setState({
      calendarVisible: false,
      twoDialogVisible: true
    })
  }

  _TwoDialogVisible = value => {
    if (value != undefined) {
      this.setState({
        twoDialogVisible: value.visible,
        twoDialogCancelVisible: value.visible
      })
      if (value.status == "done") {
        this._UpdateTakeTime("aa");
      }
    }
    if (this.state.twoDialogVisible) {
      return <TowBtnDialog title={"투약등록"} contents={this.state.eatingTime + " 투약시간\n등록 하시겠습니까?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._TwoDialogVisible}></TowBtnDialog>
    } else if (this.state.twoDialogCancelVisible) {
      return <TowBtnDialog title={"투약취소"} contents={"투약을 취소하시겠습니까?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._TwoDialogVisible}></TowBtnDialog>
    } else {
      return null;
    }
  }

  _ExceptTwoDialogVisible = value => {
    if (value != undefined) {
      this.setState({
        exceptTwoDialogVisible: value.visible,
      })
      if (value.status == "done") {
        this._UpdateTakeTime(this.state.selectTime);
      }
    }

    if (this.state.exceptTwoDialogVisible) {
      console.log(TAG, 'time2 : ' + this.state.eatingTime)
      return <MedicineUpdateDialog contents={this.state.selectMedicineName + "를 " + (this.state.popupSelectType == "주사" ? "주사" : (this.state.popupSelectType == "약" ? "복용" : "사용")) + "하셨나요?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._ExceptTwoDialogVisible}></MedicineUpdateDialog>
    } else {
      return null;
    }
  }

  _MedicineUpdate = data => {
    console.log(TAG, 'update ? ' + data);
    if (data == true) {
      this.state.requestType = 1;
      // this._MedcineInfo();
    }
  }

  _MedicineNavigation(guest) {
    if (this.state.playing == true) {
      this._webView[this.state.playerId].injectJavaScript(`
      window.player.pause(); true;`);
    }
    if (guest == true) {
      this.props.navigation.navigate('GuestLogin')
    } else {
      this.props.navigation.navigate('MedicineCalendar', { medicineUpdate: this._MedicineUpdate })
    }
  }

  _TextOnLayout(event) {
    console.log(event.nativeEvent.layout)
    this.setState({
      textHeight: event.nativeEvent.layout.height + event.nativeEvent.layout.y,
    })
  }

  _BannerClick(category, source,) {
    console.log(`category : ${category}`)
    if (this.state.playing == true) {
      this._webView[this.state.playerId].injectJavaScript(`
      window.player.pause(); true;`);
    } else {
      console.log(TAG, 'playPause : pause');
    }
    if (category == '1') {
      this.props.navigation.navigate('AboutWebview', { tag: "banner", url: source })
    } else if (category == '2') {
      Linking.openURL(`${source}`)
    } else {
      Linking.openURL(`tel:${source}`)
    }
  }

  render() {
    //게스트 로그인 확인
    const guest = Users.guest;
    // console.log(TAG,'guest : ' + guest);
    // console.log(TAG,"time : " + Moment(Moment().format('YYYY-MM-DD') + " " + "18:24").format("a HH:mm"));
    console.log("datas : " + JSON.stringify(this.state.datas))
    return (
      <SafeAreaView>
        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
          {this._Calendar()}
          {this._TwoDialogVisible()}
          {this._ExceptTwoDialogVisible()}
          <View style={{ width: '100%', height: 50, flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', }}>

            <Image source={imgLogo} style={{ width: 24, height: 27, resizeMode: 'contain', marginLeft: 20 }}></Image>
            <View style={{ flex: 1, }}></View>

            <TouchableWithoutFeedback onPress={() => this.playPause('KakaoAlarmList', '')} >
              <Image source={imgKakao} style={{ width: 24, height: 24, resizeMode: 'contain', }}></Image>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.playPause('AlarmList', '')} >
              <Image source={imgAlarm} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 16 }}></Image>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.playPause('MyPage', '')}>
              <Image source={imgMy} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 16, marginRight: 24 }}></Image>
            </TouchableWithoutFeedback>
          </View>

          {this.state.sunsise === true ? <View style={{ flex: 1 }} >
            <Text style={{ color: '#000', fontSize: 16, marginTop: 16, fontFamily: 'KHNPHDotfB', marginLeft: 20 }}>{Users.guest == true ? "게스트님" : Users.userName + "님"}</Text>
            <Text onLayout={(e) => this._TextOnLayout(e)} style={{ color: '#000', fontSize: 14, marginTop: 20, fontFamily: 'KHNPHDotfR', marginLeft: 20, lineHeight: 25, width: '60%', }}>{this.state.randomMessage}</Text>

            <Image style={{ marginTop: 19, height: 156, width: '100%', resizeMode: 'contain', }} source={(this.state.randomNum == 1 ? gifImg1 : (this.state.randomNum == 2 ? gifImg2 : (this.state.randomNum == 3 ? gifImg3 : gifImg4)))}></Image>

            {/* 20220117  홈 3개의 시간대의 이미지를 기존 자전거로 변경*/}
            {/* {parseInt(Moment().format('HH:mm').replace(':', '')) < 1159 ? <Image style={{ marginTop: 19, height: 156, width: '100%', resizeMode: 'contain', }} source={imgMain}></Image> : (
              <Image style={{ marginTop: 19, height: 156, width: '100%', resizeMode: 'contain', }} source={imgSunrise}></Image>
            )} */}
          </View> : <ImageBackground style={{ flex: 1 }} source={imgNightBg}>
            <Text style={{ color: '#fff', fontSize: 16, marginTop: 16, fontFamily: 'KHNPHDotfB', marginLeft: 20 }}>{Users.guest == true ? "게스트님" : Users.userName + "님"}</Text>
            <Text onLayout={(e) => this._TextOnLayout(e)} style={{ color: '#fff', fontSize: 14, marginTop: 20, fontFamily: 'KHNPHDotfR', marginLeft: 20, lineHeight: 25, width: '60%', }}>{this.state.randomMessage}</Text>
            <Image style={{ marginTop: 25, height: 156, width: '100%', resizeMode: 'contain', }} source={imgNight}></Image>
          </ImageBackground>}


          <ScrollView style={{ position: 'absolute', top: 50, width: '100%', height: '100%' }} onScroll={this.handleScroll}>
            <View style={{ width: '100%', height: 50, flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', opacity: 0 }}></View>

            <Text style={{ color: '#000', fontSize: 16, marginTop: 16, fontFamily: 'KHNPHDotfB', marginLeft: 20, opacity: 0 }}>{Users.userName + "님"}</Text>
            <Text style={{ color: '#000', fontSize: 14, marginTop: 20, fontFamily: 'KHNPHDotfR', marginLeft: 20, width: '60%', lineHeight: 25, opacity: 0 }}>{this.state.randomMessage}</Text>

            <Image style={{ marginTop: (Platform.OS === 'android' ? 19 : 10), height: 106, width: '100%', resizeMode: 'contain', opacity: 0 }}></Image>

            <View style={{ width: '100%', backgroundColor: '#F6F7F9', paddingLeft: 20, paddingTop: 20, marginTop: 16, borderTopLeftRadius: 32, ...Elevations[20] }}>
              <View style={{ paddingRight: 20, }}>
                {this.state.noticeMessageExistence && <View style={{ width: '100%', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 13, fontFamily: 'KHNPHDotfB' }}>{"공지사항 | "}</Text>
                  <TextTicker style={{ fontSize: 13, fontFamily: 'KHNPHDotfB', color: '#3A137D' }} shouldAnimateTreshold={40} bounce={false} loop={true} duration={20000} marqueeDelay={0} repeatSpacer={20}>{this.state.noticeMessages}</TextTicker>
                </View>}
                <TouchableWithoutFeedback onPress={() => this._MedicineNavigation(guest)}>
                  <View style={{ marginTop: 19, borderRadius: 24, backgroundColor: "rgba(219,227,241,0.5)", paddingLeft: 20, paddingRight: 20, ...Elevations[0] }}>
                    <View style={{ marginTop: 18.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(219,227,241)", ...Elevations[4], height: 40, borderRadius: 16 }}>
                      <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>오늘의 약과 주사</Text>
                          <Image source={imgInjector} style={{ width: 32, height: 32, resizeMode: 'contain', marginLeft: 12 }}></Image>
                          <Image source={imgDrug} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                          <Image source={imgPlantain} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                        </View>
                      </View>

                      <Image source={imgArrow} style={{ width: 8, height: 12, marginRight: 22 }}></Image>
                    </View>

                    {/* <View style={{ height: 0.5, width: '100%', backgroundColor: '#AFAFAF', marginTop: 16, }}></View> */}
                    {(this.state.opuDateList.length > 0 && this.state.opuDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 난자채취일입니다."}</Text>
                      </View>
                    ) : (
                      (this.state.etDateList.length > 0 && this.state.etDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                          <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 배아이식일입니다."}</Text>
                        </View>
                      ) : (this.state.iuiDateList.length > 0 && this.state.iuiDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                          <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 인공수정 시술일입니다."}</Text>
                        </View>) : (this.state.injectionTimeDatas.length > 0 && this.state.injectionTimes.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000', textAlign: 'center', lineHeight: 22 }}>{"* 배란유도 주사 시간 : " + Moment(this.state.injectionTimeDatas[this.state.injectionTimes.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'))].time).format('M월 D일 a h시 mm분') + "\n(" + this.state.injectionTimeDatas[this.state.injectionTimes.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'))].before + "시간 전)"}</Text>
                          </View>) : (this.state.visitDateList.length > 0 && this.state.visitDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                              <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 내원일입니다."}</Text>
                            </View>) : (this.state.bhcgDateList.length > 0 && this.state.bhcgDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                              <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 임신확인일입니다."}</Text>
                              </View>
                            ) : (this.state.datas.length > 0 ? (
                              <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"처방된 약과 주사를 잊지 말고 챙겨주세요."}
                                </Text>
                              </View>
                            ) : <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}><Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"해당일에는 복약정보가 없습니다."}</Text></View>))}

                    <View style={{ marginTop: 28, marginBottom: 20 }}>
                      {this.state.datas.map((item, index) =>
                        <TouchableWithoutFeedback onPress={() => ((item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸' || item.medicine_name == '가니레버' || item.medicine_name == '유레릭스' || item.medicine_name == '오가루트') ? this.setState({ calendarVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: Moment().format("HH:mm"), popupSelectType: item.type }) : item.take_time.length == 0 ? this.setState({ exceptTwoDialogVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: Moment().format("HH:mm"), popupSelectType: item.type }) : this.setState({ twoDialogCancelVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: "", popupSelectType: item.type }))}>

                          <View key={index} style={{ backgroundColor: '#fff', borderRadius: 16, flex: 1, flexDirection: 'row', paddingLeft: 12, alignItems: 'center', marginTop: index == 0 ? 0 : 8 }}>
                            <View style={{ flex: 0.6, justifyContent: 'center', }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12 }}>
                                <Image source={(item.type == '주사' ? imgCirclePink : (item.type == '약' ? imgCircleGreen : imgCircleBlue))} style={{ width: 8, height: 8, resizeMode: 'contain', }}></Image>
                                <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1 }}>{item.medicine_app_name.length == 0 ? item.medicine_name : item.medicine_app_name}</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1 }}>{item.amount + item.unit}</Text>
                              </View>

                              {/* 다음개발에 추가 메모부분 */}
                              {item.memo.length > 0 && <View style={{ height: 30 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 8 }}>{"* " + item.memo}</Text>
                              </View>}

                            </View>

                            {(item.take_time.length > 0) ? ((item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸' || item.medicine_name == '가니레버' || item.medicine_name == '유레릭스' || item.medicine_name == '오가루트') ?
                              <View style={{ flex: 0.4, justifyContent: 'flex-end', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingRight: 12 }}>
                                <Image source={imgClock} style={{ width: 12, height: 12, resizeMode: 'contain', }}></Image>
                                <Text style={{ marginLeft: 7, fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#000' }}>{Moment(Moment().format('YYYY-MM-DD') + " " + item.take_time).format('a h시 mm분')}</Text>
                              </View>
                              :
                              <View style={{ flex: 0.35, alignItems: 'flex-end', justifyContent: 'flex-end', justifyContent: 'center', paddingRight: 12 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#000' }}>{(item.type == '주사' ? '주사완료' : (item.type == '약' ? '복용완료' : '사용완료'))}</Text>
                              </View>)
                              :
                              <View style={{ flex: 0.35, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Image source={imgArrow} style={{ width: 8, height: 12, marginRight: 11.5 }}></Image>
                              </View>}
                          </View>
                        </TouchableWithoutFeedback>)}

                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.playPause('CellDevelop', '')}>
                  <View style={{ marginTop: 20, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 31.5, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                    <Image source={imgEmbryo} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1, lineHeight: 24 }}>{"오늘의 배아"}</Text>
                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.playPause('CalendarTest', '')}>
                  <View style={{ marginTop: 20, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 31.5, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                    <Image source={imgFeeling} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1, }}>{"오늘 하루는 어땠나요?"}</Text>
                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                  </View>
                </TouchableWithoutFeedback>

                {/* <Text style={{ marginTop: 32, fontSize: 16, color: '#AFAFAF', fontFamily: 'KHNPHDotfR' }}>{Users.guest == true ? '처음 오셨나요?' : '나의 초진 차트'}</Text>
                <TouchableWithoutFeedback onPress={() => this.playPause('ChartWebview', '')}>
                  <View style={{ marginTop: 10, borderRadius: 12, backgroundColor: "rgba(219,227,241,0.5)", paddingLeft: 16, paddingRight: 31.5, flexDirection: 'row', width: '100%', height: 56, alignItems: 'center' }}>
                    <Text style={{ marginLeft: 0, fontSize: 18, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1, }}>{Users.guest == true ? "나의 초진문진표" : "나의 초진문진표"}</Text>
                    <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                  </View>
                </TouchableWithoutFeedback> */}


                <Text style={{ marginTop: 32, fontSize: 16, color: '#AFAFAF', fontFamily: 'KHNPHDotfR' }}>HI의료진이 알려주는</Text>

                <Text style={{ marginTop: 15, fontSize: 20, color: '#000', fontFamily: 'KHNPHDotfB' }}>HI난임시술</Text>

                <View style={{ width: '100%', borderRadius: 24, backgroundColor: "#fff", marginTop: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 18 }}>
                  <TouchableWithoutFeedback onPress={() => this.playPause('BasicInspection', '')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 31.5 }}>
                      <Image source={imgInspection} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfB', fontSize: 16, color: '#000' }}>난임 기본검사</Text>
                      <Image source={imgVideoPlay} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 8 }}></Image>
                      <View style={{ flex: 1 }}></View>
                      <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('IUI', '')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 20 }}>
                      <Image source={imgInsemination} style={{ width: 82, height: 62, resizeMode: 'contain', }}></Image>
                      <Text style={{ fontFamily: 'KHNPHDotfB', fontSize: 16, color: '#000', marginLeft: 3 }}>인공수정</Text>
                      <Image source={imgVideoPlay} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 8 }}></Image>
                      <View style={{ flex: 1 }}></View>
                      <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('IVF_ET', '')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 31.5 }}>
                      <Image source={imgTestTube} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfB', fontSize: 16, color: '#000' }}>시험관 시술</Text>
                      <Image source={imgVideoPlay} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 8 }}></Image>
                      <View style={{ flex: 1 }}></View>
                      <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('Technology', '')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 31.5 }}>
                      <Image source={imgTechnique} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfB', fontSize: 16, color: '#000' }}>배양기술력</Text>
                      <Image source={imgVideoPlay} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 8 }}></Image>
                      <View style={{ flex: 1 }}></View>
                      <Image source={imgArrow} style={{ width: 8, height: 12, resizeMode: 'contain', }}></Image>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <Text style={{ marginTop: 34, fontSize: 20, color: '#000', fontFamily: 'KHNPHDotfB' }}>자가주사</Text>
                <Text style={{ marginTop: 9, fontSize: 16, color: '#AFAFAF', fontFamily: 'KHNPHDotfR' }}>{"함께하면 어렵지 않아요:)"}</Text>

                {/* <ScrollView style={{}} horizontal={true}>

                </ScrollView> */}

              </View>

              <FlatList style={{ marginTop: 20, }} horizontal={true} data={this.state.videoDatas} renderItem={this._RenderItem} keyExtractor={(item, index) => index.toString()}></FlatList>

              <Text style={{ marginTop: 32, fontSize: 16, color: '#AFAFAF', fontFamily: 'KHNPHDotfR' }}>{"HI에서 아이를 만난 부부가 전하는"}</Text>
              <Text style={{ marginTop: 15, fontSize: 20, color: '#000', fontFamily: 'KHNPHDotfB' }}>희망의 메세지</Text>

              <ScrollView style={{ marginTop: 20 }} horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {this.state.messageDatas.map((item, index) => (index != 3 ? <View key={index} style={{ width: 292, height: 232, backgroundColor: "rgb(236,233,228)", borderRadius: 24, marginLeft: index == 0 ? 0 : 20, marginRight: index == this.state.messageDatas.length - 1 ? 20 : 0, paddingTop: 24, paddingLeft: 20, paddingRight: 18, paddingBottom: 15 }}>
                  <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: item.kind == 1 ? '#E39C42' : '#4A50CA' }}>{(item.kind == 1 ? "임신했어요" : "출산했어요")}</Text>
                  <Text style={{ fontSize: 18, fontFamily: 'KHNPHDotfB', color: '#000', marginTop: 13 }}>{(item.kind == 1 ? "아이를 기다리는 난임부부에게 전하고 싶은 말" : "주치의에게 전하고 싶은 말")}</Text>
                  <Text style={{ flex: 1, fontSize: 14, color: '#000', marginTop: 20, fontFamily: 'KHNPHUotfR', lineHeight: 20 }} ellipsizeMode="tail" numberOfLines={3}>{(item.kind == 1 ? item.cont1 : item.cont2)}</Text>
                  <TouchableWithoutFeedback onPress={() => this.playPause('HopeMessageDetail', this.state.messageDatas[index])}>
                    <View style={{ justifyContent: 'flex-end', width: '100%', flexDirection: 'row', alignItems: 'center', height: 30 }}>
                      <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#AFAFAF' }}>more</Text>
                      <Image source={imgArrow} style={{ width: 4, height: 8, resizeMode: 'contain', marginLeft: 10, marginTop: 2 }}></Image>
                    </View>
                  </TouchableWithoutFeedback>
                </View> : <View key={index} style={{ width: 292, height: 232, backgroundColor: 'rgb(236,233,228)', borderRadius: 24, marginLeft: index == 0 ? 0 : 20, marginRight: index == this.state.messageDatas.length - 1 ? 20 : 0, paddingTop: 24, paddingLeft: 20, paddingRight: 18, paddingBottom: 15 }}>
                  <TouchableWithoutFeedback onPress={() => this.playPause('AboutWebview', 'pregnancy')}>
                    <View style={{ flex: 1, paddingTop: 0 }}>
                      <Text style={{ flex: 1, fontSize: 18, fontFamily: 'KHNPHDotfB', color: '#000', lineHeight: 30 }}>{"HI홈페이지에서\n더 많은 메시지를\n확인해보세요."}</Text>
                      <View style={{ justifyContent: 'flex-end', width: '100%', flexDirection: 'row', alignItems: 'center', height: 30 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#AFAFAF' }}>more</Text>
                        <Image source={imgArrow} style={{ width: 4, height: 8, resizeMode: 'contain', marginLeft: 10, marginTop: 2 }}></Image>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>)
                )}
              </ScrollView>

              <View style={{ paddingRight: 20 }}>
                <Text style={{ marginTop: 32, fontSize: 20, color: '#000', fontFamily: 'KHNPHDotfB' }}>About HI</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => this.playPause('AboutWebview', 'staff')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={imgStaff} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>HI 의료진</Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('AboutWebview', 'reservation')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginLeft: 23 }}>
                      <Image source={imgReservation} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>HI 진료 및 예약</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => this.playPause('HINews', '')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={imgNews} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>HI 새소식</Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('AboutWebview', 'question')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginLeft: 23 }}>
                      <Image source={imgQuestion} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>HI 소리함</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => this.playPause('Caution', '')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={imgCaution} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>난임시술 주의사항</Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.playPause('Business', '')}>
                    <View style={{ flex: 1, aspectRatio: 1, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginLeft: 23 }}>
                      <Image source={imgBusiness} style={{ width: 60, height: 60, resizeMode: 'contain', }}></Image>
                      <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>난임지원사업</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {this.state.bannerDatas.length > 0 && (
                <View style={{ paddingRight: 20, marginTop: 20 }}>
                  <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                      { useNativeDriver: true })}
                  >
                    {this.state.bannerDatas.map((item, index) =>
                    (
                      <TouchableWithoutFeedback onPress={() => this._BannerClick(item.category, ((item.category == '1' || item.category == '2') ? item.banner_url : item.phone_num))}>
                        <View style={{ width: (screenWidth - 40), height: (screenWidth - 40) * 0.62693 }}>
                          <FastImage style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={{ uri: ServerUrl.Server + "/" + item.thumbnail, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }} resizeMode={FastImage.resizeMode.contain}></FastImage>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                    )}
                  </Animated.ScrollView>
                  {this.state.bannerDatas.length > 0 && (<View style={{
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                    marginBottom: 0,
                    marginTop: 15,
                  }}>
                    <RNAnimatedScrollIndicators
                      numberOfCards={this.state.bannerDatas.length}
                      scrollWidth={screenWidth - 40}
                      activeColor={'#4a50ca'}
                      inActiveColor={'#e7e7e7'}
                      scrollAnimatedValue={this.scrollX}
                    />
                  </View>)}
                </View>
              )}

              <View style={{ marginBottom: 72 }}></View>
            </View>

          </ScrollView>
          {/* <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' /> */}

        </View>
      </SafeAreaView>
    );
  }
}