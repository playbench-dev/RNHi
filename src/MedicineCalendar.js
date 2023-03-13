import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, LogBox, Modal, BackHandler, ActivityIndicator, Animated, RefreshControl } from 'react-native';
import Elevations from 'react-native-elevation';
import SwitchToggle from 'react-native-switch-toggle';
import FetchingIndicator from 'react-native-fetching-indicator'
import AsyncStorage from '@react-native-community/async-storage';

import Moment from 'moment';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import OneBtnDialog from './Common/OneBtnDialog'
import TowBtnDialog from './Common/TwoBtnDialog'
import MedicineUpdateDialog from './Common/MedicineUpdateDialog'
import DatePicker from 'react-native-date-picker'
import GestureRecognizer from 'react-native-swipe-gestures';

const TAG = "MedicineCalendar";
const imgBack = require('../assets/ic_calendar_back.png');
const imgLeft = require('../assets/ic_calendar_left.png');
const imgRight = require('../assets/ic_calendar_right.png');
const imgRefresh = require('../assets/ic_refresh.png');

const imgCircle = require('../assets/ic_main_circle.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');
const imgClock = require('../assets/ic_main_clock.png');

const imgCirclePink = require('../assets/ic_pink_circle.png');
const imgCircleGreen = require('../assets/ic_green_circle.png');
const imgCircleBlue = require('../assets/ic_blue_circle.png');

const imgCirclePinkCheck = require('../assets/ic_pink_circle_check.png');
const imgCircleGreenCheck = require('../assets/ic_green_circle_check.png');
const imgCircleBlueCheck = require('../assets/ic_blue_circle_check.png');

const imgStar = require('../assets/ic_calendar_star.png')   //  배란유도주사
const imgOpuIUI = require('../assets/ic_calendar_opu_iui.png')//  난자채취, 인공수정
const imgEt = require('../assets/ic_calendar_et.png')       //  배아이식
const imgBhcg = require('../assets/ic_calendar_bhcg.png')   //  혈액확인
const imgVisit = require('../assets/ic_calendar_visit.png') //  재방문

const colorOpuIUI = "#AF6CC1" //  난자채취, 인공수정
const colorEt = "#612093"     //  배아이식
const colorBhcg = "#FDD835"   //  혈액확인
const colorVisit = "#FDD835"  //  재방문

const imgLogo = require('../assets/ic_main_logo.png');

const holidayKr = require('holiday-kr');

LogBox.ignoreLogs([
    'Each child in a list should have a unique "key" prop.',
]);

export default class MedicineCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.backAction = this.backAction.bind(this);
    }

    state = {
        isLoading: false,
        previousMonth: '이전',
        nextMonth: '다음',
        today: Moment(),
        firstWeek: '',
        lastWeek: '',
        // dayTitleText: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        dayTitleText: ["일", "월", "화", "수", "목", "금", "토"],
        dayText: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dateList: [],
        selectedDay: Moment().format('YYYYMMDD'),
        clickDay: '',
        clickDayOfTheWeek: '',
        playSwitch: false,
        sleepSwitch: false,
        type: 1,
        oneBtnDialogVisible: false,
        twoDialogVisible: false,
        twoDialogCancelVisible: false,
        exceptTwoDialogVisible: false,
        popupSelectType: '',
        calendarVisible: false,
        datas: [],
        includes: [],
        scheduleNo: [],
        namesList: [],
        selectPosition: 0,
        selectMedicineName: '',
        eatingTime: '',
        updateDatas: [],
        selectTime: '',
        requestType: 1,
        resultCode: false,
        holidayColor: '#ec407a',
        routePush: false,
        scroll: true,
        isFetching: true,
        //20211228 luteal 추가
        et_start_date: '',
        et_end_date: '',
        opuDate: '',
        etDate: '',
        cryoDate: '',
        bhcgDate: '',
        iuiDate: '',
        visitDate: '',
        opuDateList: [],
        etDateList: [],
        cryoDateList: [],
        bhcgDateList: [],
        iuiDateList: [],
        visitDateList: [],
        opuSubtractDate: '',
        opuSubtractDateList: [],
        calendarHeight: 0,
        calendarStatus: 1,
        medicineNameDatas: [],
        medicineColorDatas: [],
        refreshing: false,
        injectionTimes: [],
        injectionTimeDatas: [],
    }

    backAction() {
        if (this.state.routePush == true) {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            if (this.props.route.params.medicineUpdate != undefined) {
                this.props.route.params.medicineUpdate(this.state.resultCode);
                this.props.navigation.goBack();
            } else {
                this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
        }
        return true;
    };

    componentDidMount() {
        this._MedicineAllInfo();
        this.onFocusTrigger = this.props.navigation.addListener('focus', () => {
            // trigger your event
            console.log('aasdasdadasd')
        });
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _Login() {
        // this.props.navigation.navigate('AdminUserSelect');
        // return;
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
                    this._MedcineInfo();
                }
            }
        )
    }

    _MedicineAllInfo() {
        var details = null;
        var url = "";
        url = ServerUrl.MedicineInfo;

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

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
                    this.state.medicineNameDatas = [];
                    this.state.medicineColorDatas = [];
                    for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                        this.state.medicineNameDatas.push(json.Resources[i].name_app);
                        this.state.medicineColorDatas.push(json.Resources[i].color);
                    }
                }
                this._MedcineInfo();
            }
        )
    }

    _MedcineInfo() {
        var details = null;
        var url = "";
        this.setState({ isFetching: true })
        if (this.state.requestType == 1) {
            url = ServerUrl.medicineInfoList;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
                'cel_date': this.state.today.format('YYYYMM') + "00",
            };
        } else if (this.state.requestType == 2) {
            url = ServerUrl.medicineUpdate;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'schedule_no': this.state.includes[0].schedule_no,
                'medicine_info': JSON.stringify(this.state.includes),
            };
        }

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

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
                console.log(TAG, json);
                if (json.Error_Cd == "0000") {
                    if (this.state.requestType == 1) {
                        this.state.datas = [];
                        this.state.dateList = [];
                        this.state.scheduleNo = [];
                        this.state.namesList = [];
                        this.state.et_start_date = '';
                        this.state.et_end_date = '';
                        this.state.opuDateList = [];
                        this.state.etDateList = [];
                        this.state.cryoDateList = [];
                        this.state.bhcgDateList = [];
                        this.state.iuiDateList = [];
                        this.state.visitDateList = [];
                        this.state.opuSubtractDateList = [];
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
                            if (this.state.today.format('YYYYMM') == json.OpuDate[i].cel_date.replace("-", "").substring(0, 6)) {
                                this.state.opuDate = json.OpuDate[i].cel_date;
                                this.state.opuSubtractDate = Moment(this.state.opuDate, "YYYY-MM-DD").subtract(2, "day").format("YYYY-MM-DD");
                                this.state.opuDateList.push(json.OpuDate[i].cel_date)
                                this.state.opuSubtractDateList.push(Moment(this.state.opuDate, "YYYY-MM-DD").subtract(2, "day").format("YYYY-MM-DD"))
                            }
                        }
                        for (let i = 0; i < Object.keys(json.EtDate).length; i++) {
                            this.state.etDate = json.EtDate[i].cel_date;
                            this.state.etDateList.push(json.EtDate[i].cel_date)
                        }
                        // for (let i = 0; i < Object.keys(json.CryoDate).length; i++) {
                        //     this.state.cryoDate = json.CryoDate[0].cel_date;
                        // }
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
                            this.state.dateList.push(json.Medicine[i].cel_date || '');
                        }

                        for (let i = 0; i < Object.keys(json.Luteal).length; i++) {
                            for (let j = 0; j < Object.keys(json.Luteal[i].medicine_info).length; j++) {
                                console.log(TAG, json.Luteal[i].medicine_info)
                                if (this.state.scheduleNo.includes(json.Luteal[i].schedule_no) == true) {
                                    let test = false;
                                    for (let x = 0; x < this.state.namesList.length; x++) {
                                        console.log(TAG, this.state.scheduleNo[x] + " " + json.Luteal[i].schedule_no)
                                        if (this.state.scheduleNo[x] === json.Luteal[i].schedule_no && this.state.namesList[x] === json.Luteal[i].medicine_info[j].medicine_name) {
                                            console.log(TAG, '?????')
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
                                                this.state.dateList.push(json.Luteal[i].cel_date || '');
                                            }
                                        } else {
                                            this.state.datas.push(obj);
                                            this.state.dateList.push(json.Luteal[i].cel_date || '');
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
                                            this.state.dateList.push(json.Luteal[i].cel_date || '');
                                        }
                                    } else {
                                        this.state.datas.push(obj);
                                        this.state.dateList.push(json.Luteal[i].cel_date || '');
                                    }
                                }
                            }
                        }

                        let position = this.state.dateList.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'));
                        this.state.includes = [];

                        while (position != -1) {
                            this.state.includes.push(this.state.datas[position]);
                            position = this.state.dateList.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'), position + 1);
                        }
                        this.setState({
                            selectedDay: this.state.selectedDay,
                            isLoading: true,
                            refreshing: false
                        })
                    } else if (this.state.requestType == 2) {
                        this.state.requestType = 1;
                        this.state.resultCode = true;
                        this._MedcineInfo();
                    }
                } else if (json.Error_Cd == "1001") {
                    this._Login();
                } else {
                    this.setState({
                        isLoading: true,
                        refreshing: false
                    })
                }
            }
        )
        this.setState({ isFetching: false })
    }

    _DatePicker() {
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
        if (time.length != 0) {
            this.state.eatingTime = Moment(time).format("a HH:mm");
            this.state.selectTime = Moment(time).format("HH:mm");
        }
        this.setState({
            calendarVisible: false,
            twoDialogVisible: true,
            exceptTwoDialogVisible: false,
        })
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
            console.log(TAG, 'type : ' + this.state.popupSelectType);
            return <MedicineUpdateDialog contents={this.state.selectMedicineName + "를 " + (this.state.popupSelectType == "주사" ? "주사" : (this.state.popupSelectType == "약" ? "복용" : "사용")) + "하셨나요?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._ExceptTwoDialogVisible}></MedicineUpdateDialog>
        } else {
            return null;
        }
    }

    _TwoDialogVisible = value => {
        if (value != undefined) {
            this.setState({
                twoDialogVisible: value.visible,
                twoDialogCancelVisible: value.visible
            })
            if (value.status == "done") {
                this._UpdateTakeTime(this.state.selectTime);
            }
        }

        if (this.state.twoDialogVisible) {
            return <TowBtnDialog title={"투약등록"} contents={this.state.eatingTime + " 투약시간\n등록 하시겠습니까?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._TwoDialogVisible}></TowBtnDialog>
        } else if (this.state.twoDialogCancelVisible) {
            return <TowBtnDialog title={"투약취소"} contents={"투약을 취소하시겠습니까?"} leftBtnText={"취소"} rightBtnText={"확인"} clcik={this._TwoDialogVisible}></TowBtnDialog>
        } {
            return null;
        }
    }

    _OneDialogVisible = value => {
        if (value != undefined) {
            this.setState({
                oneBtnDialogVisible: value.visible,
            })
        }
        if (this.state.oneBtnDialogVisible) {
            return <OneBtnDialog title={"안내"} contents={"해당 날짜는 선택할 수 없습니다."} leftBtnText={"확인"} clcik={this._OneDialogVisible}></OneBtnDialog>
        } else {
            return null;
        }
    }

    _CalendarMove(value) {
        if (value != undefined) {
            if (value == "1") {//저번달
                this.state.today = this.state.today.clone().subtract(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading: true,
                })
                this._MedcineInfo();
            } else {//다음달
                this.state.today = this.state.today.clone().add(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading: true,
                })
                this._MedcineInfo();
            }
        }
    }

    _MakeListItem(value) {
        // console.log(TAG,"value : " + value);
        let position = this.state.dateList.indexOf(Moment(value).format('YYYY-MM-DD'));
        this.state.includes = [];

        while (position != -1) {
            this.state.includes.push(this.state.datas[position]);
            position = this.state.dateList.indexOf(Moment(value).format('YYYY-MM-DD'), position + 1);
        }
        this.setState({
            selectedDay: value,
            calendarStatus: 1
        })
    }

    _UpdateTakeTime(str) {
        console.log(TAG, 'eatingTime : ' + this.state.selectTime);
        // this.state.includes = this.state.includes.filter(item => (item.idx.length != 0 && item.take_time.length != 0));
        this.state.includes = this.state.includes.map((data, index) => (this.state.selectPosition === index) ? {
            abbreviation: data.abbreviation || '',
            amount: data.amount || '',
            cel_date: data.cel_date || '',
            every_other_day: data.every_other_day || '',
            idx: data.idx || '',
            medicine_name: data.medicine_name || '',
            medicine_app_name: data.medicine_app_name || '',
            medicine_no: data.medicine_no || '',
            taking: data.memo || '',
            purpose: data.purpose || '',
            reg_date: data.reg_date || '',
            reg_id: data.reg_id || '',
            unit: data.unit || '',
            type: data.type || '',
            memo: data.memo || '',
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
            taking: data.memo || '',
            purpose: data.purpose || '',
            reg_date: data.reg_date || '',
            reg_id: data.reg_id || '',
            unit: data.unit || '',
            type: data.type || '',
            memo: data.memo || '',
            take_time: data.take_time || '',
            schedule_no: data.schedule_no || '',
        })
        console.log('updates : ', this.state.includes);
        this.state.requestType = 2;
        this.setState({ twoDialogVisible: false, exceptTwoDialogVisible: false, twoDialogCancelVisible: false })
        this._MedcineInfo();
    }

    goBack() {
        if (this.state.routePush == true) {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            if (this.props.route.params.medicineUpdate != undefined) {
                this.props.route.params.medicineUpdate(this.state.resultCode);
                this.props.navigation.goBack();
            } else {
                this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
        }
    }

    _ChartXPosition(event) {
        console.log('_ChartXPosition : ' + event.nativeEvent.layout.height)
        this.setState({ calendarHeight: event.nativeEvent.layout.height - 32 })
    }

    _CalendarArr = (value) => {
        console.log(`index : ${this.state.medicineNameDatas.indexOf('페마라')}`)
        let result = [];
        let week = this.state.firstWeek;
        let heightDivide = 0;

        if (this.state.calendarStatus == 0) {
            heightDivide = this.state.calendarHeight / (this.state.lastWeek - week + 1)
        } else {
            heightDivide = 60
        }
        for (week; week <= this.state.lastWeek; week++) {
            result = result.concat(
                <View key={week} style={{ flexDirection: 'row', flexWrap: 'nowrap', height: heightDivide, marginTop: 0.5, }} >
                    {Array(7).fill(0).map((data, index) => {
                        let days = this.state.today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                        let position = this.state.dateList.indexOf(days.format('YYYY-MM-DD'));

                        let pink = false;
                        let green = false;
                        let blue = false;

                        let pinkCheck = 0;
                        let greenCheck = 0;
                        let blueCheck = 0;

                        let medicineName = [];
                        let medicineAmount = [];

                        while (position != -1) {
                            if (this.state.datas[position].type == '주사') {
                                pink = true;
                                if (this.state.datas[position].take_time.length > 0) {
                                    if (pinkCheck == 0) {
                                        pinkCheck = 1;
                                    }
                                } else {
                                    pinkCheck = 2;
                                }
                                const obj = {
                                    medicine_name: this.state.datas[position].medicine_name,
                                    medicine_app_name: this.state.datas[position].medicine_app_name,
                                    medicine_unit: this.state.datas[position].unit,
                                    medicine_amount: this.state.datas[position].amount,
                                    medicine_abbreviation: this.state.datas[position].abbreviation
                                }
                                medicineName.push(obj)
                            } else if (this.state.datas[position].type == '약') {
                                green = true;
                                if (this.state.datas[position].take_time.length > 0) {
                                    if (greenCheck == 0) {
                                        greenCheck = 1;
                                    }
                                } else {
                                    greenCheck = 2;
                                }
                                const obj = {
                                    medicine_name: this.state.datas[position].medicine_name,
                                    medicine_app_name: this.state.datas[position].medicine_app_name,
                                    medicine_unit: this.state.datas[position].unit,
                                    medicine_amount: this.state.datas[position].amount,
                                    medicine_abbreviation: this.state.datas[position].abbreviation
                                }
                                medicineName.push(obj)
                            } else if (this.state.datas[position].type == '질정') {
                                blue = true;
                                if (this.state.datas[position].take_time.length > 0) {
                                    if (blueCheck == 0) {
                                        blueCheck = 1;
                                    }
                                } else {
                                    blueCheck = 2;
                                }
                                const obj = {
                                    medicine_name: this.state.datas[position].medicine_name,
                                    medicine_app_name: this.state.datas[position].medicine_app_name,
                                    medicine_unit: this.state.datas[position].unit,
                                    medicine_amount: this.state.datas[position].amount,
                                    medicine_abbreviation: this.state.datas[position].abbreviation
                                }
                                medicineName.push(obj)
                            }
                            position = this.state.dateList.indexOf(days.format('YYYY-MM-DD'), position + 1);
                        }

                        if (Moment().format('YYYYMMDD') === days.format('YYYYMMDD') && days.format('MM') === this.state.today.format('MM')) {        //today
                            return (
                                <TouchableWithoutFeedback onPress={() => this._MakeListItem(days.format('YYYYMMDD'))}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', backgroundColor: (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), marginLeft: (index == 0 ? 0 : 0.5) }}>
                                        <View style={{ width: '100%', marginTop: 4, paddingLeft: 5, paddingRight: 5, paddingTop: 3, paddingBottom: 3 }}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : ('20230124' == days.format('YYYYMMDD') ? this.state.holidayColor : '#000'))), fontSize: 12, fontFamily: 'KHNPHDotfR', }}>{days.format('D')}</Text>
                                            </View>
                                        </View>
                                        {this.state.calendarStatus == 1 ? (this.state.dateList.includes(days.format('YYYY-MM-DD')) ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 30 }}>
                                            {pink && <Image source={pinkCheck == 1 ? imgCirclePinkCheck : imgCirclePink} style={{ width: 10, height: 10, resizeMode: 'contain', }}></Image>}
                                            {green && console.log('green')}
                                            {green && <Image source={greenCheck == 1 ? imgCircleGreenCheck : imgCircleGreen} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3 }}></Image>}
                                            {blue && <Image source={blueCheck == 1 ? imgCircleBlueCheck : imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3 }}></Image>}
                                            {(this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD')) || this.state.cryoDateList.includes(days.format('YYYY-MM-DD')) || this.state.iuiDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#AE91F8' }}></Image>}
                                            {((((this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD'))) == false) && this.state.visitDateList.includes(days.format('YYYY-MM-DD'))) || this.state.bhcgDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#FAED7D' }}></Image>}
                                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 30 }}>
                                            {(this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD')) || this.state.cryoDateList.includes(days.format('YYYY-MM-DD')) || this.state.iuiDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#AE91F8' }}></Image>}
                                            {((((this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD'))) == false) && this.state.visitDateList.includes(days.format('YYYY-MM-DD'))) || this.state.bhcgDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#FAED7D' }}></Image>}
                                        </View>

                                        ) : (
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {this.state.opuDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorOpuIUI, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                        <Text style={{ fontSize: 10, color: '#fff' }}>{"난자채취"}</Text>
                                                    </View>
                                                ) : (
                                                    this.state.etDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                        <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorEt, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                            <Text style={{ fontSize: 10, color: '#fff' }}>{"배아이식"}</Text>
                                                        </View>
                                                    ) : (
                                                        this.state.iuiDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                            <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorOpuIUI, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                <Text style={{ fontSize: 10, color: '#fff' }}>{"인공수정"}</Text>
                                                            </View>
                                                        ) : (
                                                            this.state.bhcgDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorBhcg, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                    <Text style={{ fontSize: 10, color: '#fff' }}>{"임신확인"}</Text>
                                                                </View>
                                                            ) : (
                                                                this.state.visitDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                    <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorVisit, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                        <Text style={{ fontSize: 10, color: '#fff' }}>{"내원일"}</Text>
                                                                    </View>) : null
                                                            )
                                                        )
                                                    )
                                                )}

                                                {this.state.dateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flex: 1 }}>
                                                            {medicineName.map((item, index) => (
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 14, marginLeft: 4, marginRight: 4 }}>
                                                                    <View style={{ backgroundColor: (this.state.medicineColorDatas[this.state.medicineNameDatas.indexOf(item.medicine_name)]), width: 5, height: 14 }}></View>
                                                                    <Text style={{ fontSize: 10, marginLeft: 4, width: '110%' }} numberOfLines={1} >{item.medicine_abbreviation + " " + item.medicine_amount + item.medicine_unit}</Text>
                                                                </View>))}
                                                        </View>
                                                    </View>
                                                ) : (
                                                    <View style={{ flex: 1 }}></View>
                                                )}

                                                {this.state.opuSubtractDateList.includes(days.format('YYYY-MM-DD')) && (
                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                        <Image source={imgStar} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                    </View>
                                                )}

                                                {this.state.opuDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                        <Image source={imgOpuIUI} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                    </View>
                                                ) : (
                                                    this.state.etDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                            <Image source={imgEt} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                        </View>
                                                    ) : (
                                                        this.state.iuiDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                            <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                <Image source={imgOpuIUI} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                            </View>
                                                        ) : (
                                                            this.state.bhcgDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                    <Image source={imgBhcg} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                                </View>
                                                            ) : (
                                                                (this.state.visitDateList.includes(days.format('YYYY-MM-DD')) && this.state.opuSubtractDateList.includes(days.format('YYYY-MM-DD')) == false) ? (
                                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                        <Image source={imgVisit} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                                    </View>) : null
                                                            )
                                                        )
                                                    )
                                                )}
                                            </View>
                                        )}
                                    </View>
                                </TouchableWithoutFeedback>)
                        } else if (days.format('MM') !== this.state.today.format('MM')) {      //disable
                            return (
                                <TouchableWithoutFeedback onPress={() => this.setState({ oneBtnDialogVisible: true })}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', backgroundColor: ((this.state.selectedDay == days.format('YYYYMMDD') && days.format('MM') === this.state.today.format('MM')) ? '#F1F1F1' : '#fff'), marginLeft: (index == 0 ? 0 : 0.5) }}>
                                        <Text style={{ color: '#AFAFAF', marginTop: 7, fontSize: 12, fontFamily: 'KHNPHDotfR' }}>{days.format('D')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        } else {                                                              //month
                            return (
                                <TouchableWithoutFeedback onPress={() => this._MakeListItem(days.format('YYYYMMDD'))}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', backgroundColor: (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), marginLeft: (index == 0 ? 0 : 0.5) }}>
                                        <View style={{ width: '100%', marginTop: 4, paddingLeft: 5, paddingRight: 5, paddingTop: 3, paddingBottom: 3 }}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : ('20230124' == days.format('YYYYMMDD') ? this.state.holidayColor : '#000'))), fontSize: 12, fontFamily: 'KHNPHDotfR', }}>{days.format('D')}</Text>
                                            </View>
                                        </View>

                                        {this.state.calendarStatus == 1 ? (this.state.dateList.includes(days.format('YYYY-MM-DD')) ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 30 }}>
                                            {pink && <Image source={pinkCheck == 1 ? imgCirclePinkCheck : imgCirclePink} style={{ width: 10, height: 10, resizeMode: 'contain', }}></Image>}
                                            {green && console.log('green')}
                                            {green && <Image source={greenCheck == 1 ? imgCircleGreenCheck : imgCircleGreen} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3 }}></Image>}
                                            {blue && <Image source={blueCheck == 1 ? imgCircleBlueCheck : imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3 }}></Image>}
                                            {(this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD')) || this.state.cryoDateList.includes(days.format('YYYY-MM-DD')) || this.state.iuiDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#AE91F8' }}></Image>}
                                            {((((this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD'))) == false) && this.state.visitDateList.includes(days.format('YYYY-MM-DD'))) || this.state.bhcgDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#FAED7D' }}></Image>}
                                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 30 }}>
                                            {(this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD')) || this.state.cryoDateList.includes(days.format('YYYY-MM-DD')) || this.state.iuiDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#AE91F8' }}></Image>}
                                            {((((this.state.opuDateList.includes(days.format('YYYY-MM-DD')) || this.state.etDateList.includes(days.format('YYYY-MM-DD'))) == false) && this.state.visitDateList.includes(days.format('YYYY-MM-DD'))) || this.state.bhcgDateList.includes(days.format('YYYY-MM-DD'))) && <Image source={imgCircleBlue} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 3, tintColor: '#FAED7D' }}></Image>}
                                        </View>

                                        ) : (
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                {this.state.opuDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorOpuIUI, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                        <Text style={{ fontSize: 10, color: '#fff' }}>{"난자채취"}</Text>
                                                    </View>
                                                ) : (
                                                    this.state.etDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                        <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorEt, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                            <Text style={{ fontSize: 10, color: '#fff' }}>{"배아이식"}</Text>
                                                        </View>
                                                    ) : (
                                                        this.state.iuiDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                            <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorOpuIUI, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                <Text style={{ fontSize: 10, color: '#fff' }}>{"인공수정"}</Text>
                                                            </View>
                                                        ) : (
                                                            this.state.bhcgDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorBhcg, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                    <Text style={{ fontSize: 10, color: '#fff' }}>{"임신확인"}</Text>
                                                                </View>
                                                            ) : (
                                                                this.state.visitDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                    <View style={{ height: 14, paddingLeft: 5, paddingRight: 5, backgroundColor: colorVisit, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 2 }}>
                                                                        <Text style={{ fontSize: 10, color: '#fff' }}>{"내원일"}</Text>
                                                                    </View>) : null
                                                            )
                                                        )
                                                    )
                                                )}

                                                {this.state.dateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flex: 1 }}>
                                                            {medicineName.map((item, index) => (
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 14, marginLeft: 4, marginRight: 4 }}>
                                                                    <View style={{ backgroundColor: (this.state.medicineColorDatas[this.state.medicineNameDatas.indexOf(item.medicine_name)]), width: 5, height: 14 }}></View>
                                                                    <Text style={{ fontSize: 10, marginLeft: 4, width: '110%' }} numberOfLines={1} >{item.medicine_abbreviation + " " + item.medicine_amount + item.medicine_unit}</Text>
                                                                </View>))}
                                                        </View>
                                                    </View>
                                                ) : (
                                                    <View style={{ flex: 1 }}></View>
                                                )}

                                                {this.state.opuSubtractDateList.includes(days.format('YYYY-MM-DD')) && (
                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                        <Image source={imgStar} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                    </View>
                                                )}

                                                {this.state.opuDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                        <Image source={imgOpuIUI} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                    </View>
                                                ) : (
                                                    this.state.etDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                            <Image source={imgEt} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                        </View>
                                                    ) : (
                                                        this.state.iuiDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                            <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                <Image source={imgOpuIUI} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                            </View>
                                                        ) : (
                                                            this.state.bhcgDateList.includes(days.format('YYYY-MM-DD')) ? (
                                                                <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                    <Image source={imgBhcg} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                                </View>
                                                            ) : (
                                                                (this.state.visitDateList.includes(days.format('YYYY-MM-DD')) && this.state.opuSubtractDateList.includes(days.format('YYYY-MM-DD')) == false) ? (
                                                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                                                                        <Image source={imgVisit} style={{ width: 30, height: 30, resizeMode: 'contain' }}></Image>
                                                                    </View>) : null
                                                            )
                                                        )
                                                    )
                                                )}
                                            </View>
                                        )}

                                    </View>
                                </TouchableWithoutFeedback>)
                        }
                    })
                    }
                </View >);
        }
        return result;
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this._MedcineInfo();
    }

    render() {

        console.log(TAG, 'opu date : ' + this.state.opuDate);

        if (this.props.route.params != undefined) {
            if (this.props.route.params.push != undefined) {
                this.state.routePush = this.props.route.params.push;
            }
        }

        this.state.firstWeek = this.state.today.clone().startOf('month').week();
        this.state.lastWeek = this.state.today.clone().endOf('month').week() === 1 ? 53 : this.state.today.clone().endOf('month').week();

        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._OneDialogVisible()}
                    {this._DatePicker()}
                    {this._TwoDialogVisible()}
                    {this._ExceptTwoDialogVisible()}
                    <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableWithoutFeedback onPress={() => this.goBack()}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ calendarStatus: (this.state.calendarStatus == 0 ? 1 : 0) })}>
                            <View style={{ justifyContent: 'center', backgroundColor: '#63beb1', height: 35, marginRight: 12, alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderRadius: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 12 }}>{this.state.calendarStatus == 0 ? "축소" : "크게보기"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View>
                        <View style={{ width: '100%', height: 32, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
                            <TouchableWithoutFeedback onPress={() => this._CalendarMove("1")}>
                                <Image source={imgLeft} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                            </TouchableWithoutFeedback>

                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, height: 40, backgroundColor: '#D5D6E2', borderRadius: 20, marginLeft: 20, marginRight: 20 }}>
                                <Text style={{ color: 'black', fontSize: 14, fontFamily: 'KHNPHDotfR' }}>{this.state.today.format('YYYY년 MM월')}</Text>
                            </View>

                            <TouchableWithoutFeedback onPress={() => this._CalendarMove("2")}>
                                <Image source={imgRight} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onRefresh()}>
                                <Image source={imgRefresh} style={{ width: 20, height: 20, resizeMode: 'contain', position: 'absolute', right: 12 }}></Image>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <ScrollView style={{ flex: 1, marginTop: 15 }} onLayout={(e) => this._ChartXPosition(e)} scrollEnabled={(this.state.calendarStatus == 0 ? false : true)} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        <View>
                            <View>
                                <View style={{ width: '100%', height: 32, flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', }}>
                                    {this.state.dayTitleText.map((item, index) =>
                                        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: (index == 0 ? 0 : 0.5), }}>
                                            <Text style={{ color: (index == 0 ? this.state.holidayColor : '#000'), fontSize: 12, fontFamily: 'KHNPHUotfR' }}>{this.state.dayTitleText[index]}</Text>
                                        </View>)}
                                </View>

                                <View style={styles.calendarShadow}>
                                    <GestureRecognizer onSwipe={(gestureName, gestureState) => {
                                        console.log(TAG, "dx : " + JSON.stringify(gestureState));
                                        const { dx, dy } = gestureState;
                                        console.log(TAG, "dx : " + dx + " dy : " + dy);
                                        if (dx > 50) {
                                            this._CalendarMove("1");
                                        }
                                        else if (dx < -50) {
                                            this._CalendarMove("2")
                                        }
                                    }}>
                                        {this._CalendarArr()}
                                    </GestureRecognizer>
                                </View>
                            </View>

                            {this.state.calendarStatus == 1 && (<View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={{ marginTop: 24, fontSize: 14, color: (holidayKr.isSolarHoliday(new Date(Moment(this.state.selectedDay))) == true ? this.state.holidayColor : (Moment(this.state.selectedDay).format('YYYYMMDD') == '20230124' ? this.state.holidayColor : '#4A50CA')), fontFamily: 'KHNPHDotfR' }}>{Moment(this.state.selectedDay).format("YYYY년 M월 D일") + " " + this.state.dayText[Moment(this.state.selectedDay).day()]}</Text>

                                <View style={{ marginTop: 21, borderRadius: 24, backgroundColor: "rgba(219,227,241,0.5)", paddingLeft: 10, paddingRight: 10, width: '100%', }}>
                                    <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ borderRadius: 40, width: 12, height: 12, backgroundColor: '#EDA6CA' }}></View>
                                        <Text style={{ marginLeft: 4, fontSize: 13, fontFamily: 'KHNPHUotfR', color: '#000' }}>주사</Text>

                                        <View style={{ borderRadius: 40, width: 12, height: 12, backgroundColor: '#63BEB1', marginLeft: 12 }}></View>
                                        <Text style={{ marginLeft: 4, fontSize: 13, fontFamily: 'KHNPHUotfR', color: '#000' }}>경구약</Text>

                                        <View style={{ borderRadius: 40, width: 12, height: 12, backgroundColor: '#499BD5', marginLeft: 12 }}></View>
                                        <Text style={{ marginLeft: 4, fontSize: 13, fontFamily: 'KHNPHUotfR', color: '#000' }}>질정</Text>

                                        <View style={{ borderRadius: 40, width: 12, height: 12, backgroundColor: '#AE91F8', marginLeft: 12 }}></View>
                                        <Text style={{ marginLeft: 4, fontSize: 13, fontFamily: 'KHNPHUotfR', color: '#000' }}>시술</Text>

                                        <View style={{ borderRadius: 40, width: 12, height: 12, backgroundColor: '#FAED7D', marginLeft: 12 }}></View>
                                        <Text style={{ marginLeft: 4, fontSize: 13, fontFamily: 'KHNPHUotfR', color: '#000' }}>내원</Text>
                                    </View>
                                    {/* <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ borderRadius: 40, width: 16, height: 16, backgroundColor: '#AE91F8', marginLeft: 24 }}></View>
                                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>시술</Text>

                                        <View style={{ borderRadius: 40, width: 16, height: 16, backgroundColor: '#FAED7D', marginLeft: 24 }}></View>
                                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>내원일</Text>
                                    </View> */}

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
                                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000', textAlign: 'center', lineHeight: 22 }}>{"* 배란유도 주사 시간 : " + Moment(this.state.injectionTimeDatas[this.state.injectionTimes.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'))].time).format('오늘 a h시 mm분') + "\n(시술 " + this.state.injectionTimeDatas[this.state.injectionTimes.indexOf(Moment(this.state.selectedDay).format('YYYY-MM-DD'))].before + "시간 전)"}</Text>
                                                </View>) : (this.state.visitDateList.length > 0 && this.state.visitDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                                                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 내원일입니다."}</Text>
                                                    </View>) : (this.state.bhcgDateList.length > 0 && this.state.bhcgDateList.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) ? (
                                                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"* 오늘은 임신확인일입니다."}</Text>
                                                        </View>) : null)}

                                    <View style={{ marginBottom: 28 }}>
                                        {this.state.includes.length > 0 ? this.state.includes.map((item, index) => <View key={index} style={{ marginTop: index == 0 ? 16 : 8, }}>
                                            <TouchableWithoutFeedback onPress={() => ((item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸' || item.medicine_name == '가니레버' || item.medicine_name == '유레릭스' || item.medicine_name == '오가루트') ? this.setState({ calendarVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: Moment().format("HH:mm"), popupSelectType: item.type }) : item.take_time.length == 0 ? this.setState({ exceptTwoDialogVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: Moment().format("HH:mm"), popupSelectType: item.type }) : this.setState({ twoDialogCancelVisible: true, selectPosition: index, selectMedicineName: item.medicine_name, eatingTime: Moment().format("a HH:mm"), selectTime: "", popupSelectType: item.type }))}>
                                                <View style={{ backgroundColor: '#fff', borderRadius: 16, flex: 1, flexDirection: 'row', paddingLeft: 12, alignItems: 'center' }}>

                                                    <View style={{ flex: 0.6, justifyContent: 'center', }}>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12 }}>
                                                            <Image source={(item.type == '주사' ? imgCirclePink : (item.type == '약' ? imgCircleGreen : imgCircleBlue))} style={{ width: 8, height: 8, resizeMode: 'contain', }}></Image>
                                                            <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1 }}>{item.medicine_app_name.length == 0 ? item.medicine_name : item.medicine_app_name}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: '#000', flex: 1 }}>{item.amount + item.unit}</Text>
                                                        </View>

                                                        {item.memo.length > 0 && <View style={{ height: 30 }}>
                                                            <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#000', marginLeft: 8 }}>{"* " + item.memo}</Text>
                                                        </View>}

                                                    </View>

                                                    {(item.take_time.length > 0) ? (
                                                        ((item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸' || item.medicine_name == '가니레버' || item.medicine_name == '유레릭스' || item.medicine_name == '오가루트')) ?
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

                                            </TouchableWithoutFeedback>
                                        </View>) : ((this.state.opuDate.length > 0 && Moment(this.state.selectedDay).format('YYYY-MM-DD') == this.state.opuDate) == false ? <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}><Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{"해당일에는 복약정보가 없습니다."}</Text></View> : null)}
                                    </View>
                                </View>
                            </View>)}

                            <View style={{ height: 20 }}></View>
                        </View>

                    </ScrollView>
                    <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    calendarShadow: {
        backgroundColor: '#f6f6f9',
    },
})