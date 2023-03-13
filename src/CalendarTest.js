import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, TextInput, LogBox } from 'react-native';
import Elevations from 'react-native-elevation';
import SwitchToggle from 'react-native-switch-toggle';
import Moment from 'moment';
import 'moment/locale/ko';
import OneBtnDialog from './Common/OneBtnDialog'
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import GestureRecognizer from 'react-native-swipe-gestures';
import FetchingIndicator from 'react-native-fetching-indicator'

const TAG = "CalendarTest";
const imgBack = require('../assets/ic_calendar_back.png');
const imgLeft = require('../assets/ic_calendar_left.png');
const imgRight = require('../assets/ic_calendar_right.png');

const imgVeryGoodSmall = require('../assets/ic_calendar_very_good_small.png');
const imgGoodSmall = require('../assets/ic_calendar_good_small.png');
const imgBasicSmall = require('../assets/ic_calendar_basic_small.png');
const imgBadSmall = require('../assets/ic_calendar_bad_small.png');

const imgVeryGood = require('../assets/ic_calendar_very_good.png');
const imgGood = require('../assets/ic_calendar_good.png');
const imgBasic = require('../assets/ic_calendar_basic.png');
const imgBad = require('../assets/ic_calendar_bad.png');

const img001 = require('../assets/s_001.png');
const img002 = require('../assets/s_002.png');
const img003 = require('../assets/s_003.png');
const img004 = require('../assets/s_004.png');
const img005 = require('../assets/s_005.png');
const img006 = require('../assets/s_006.png');
const img007 = require('../assets/s_007.png');
const img008 = require('../assets/s_008.png');

const imgPlay = require('../assets/ic_calendar_play.png');
const imgSleep = require('../assets/ic_calendar_sleep.png');
const imgEat = require('../assets/ic_calendar_eat.png');

const imgCheckOn = require('../assets/ic_calendar_check_on.png');
const imgCheckOff = require('../assets/ic_calendar_check_off.png');

const holidayKr = require('holiday-kr');

LogBox.ignoreLogs([
    'Each child in a list should have a unique "key" prop.',
]);

export default class CalendarTest extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        isLoading: false,
        previousMonth: '이전',
        nextMonth: '다음',
        today: Moment(),
        firstWeek: '',
        lastWeek: '',
        // imageList : [null,imgVeryGoodSmall,imgGoodSmall,imgBasicSmall,imgBadSmall],
        imageList: [imgVeryGoodSmall, imgGoodSmall, img001, img002, img003, img004, img005, img006, img007, img008,],
        dayTitleText: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        dayText: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dates: [],
        listDatas: [],
        selectedDay: Moment().format('YYYYMMDD'),
        clickDay: '',
        clickDayOfTheWeek: '',
        playSwitch: 0,
        sleepSwitch: 0,
        eatSwitch: 0,
        type: 1,
        oneBtnDialogVisible: false,
        oneBtnDialogTitle: '',
        oneBtnDialogContents: '',
        playMemo: '',
        sleepMemo: '',
        eatMemo: '',
        requestType: 1, //1 - list, 2 - insert, 3 - update
        conditionNo: '',
        holidayColor: '#ec407a',
        isFetching: true,
    }

    componentDidMount() {
        console.log(TAG, "componentDidMount");
        this._ConditionList()
    }

    _ConditionList() {
        var details = null;
        var url = '';
        this.setState({ isFetching: true })
        if (this.state.requestType == 1) {//list
            url = ServerUrl.ConditionInfoUrl;
            details = {
                'user_no': Users.userNo,
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'condition_date': this.state.today.format('YYYYMM'),
            };
        } else if (this.state.requestType == 2) {//insert
            url = ServerUrl.ConditionInfoInsertUrl;
            console.log(TAG, this.state.eatMemo);
            details = {
                'user_no': Users.userNo,
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'condition_date': Moment(this.state.selectedDay).format('YYYY-MM-DD'),
                'exercise': this.state.playSwitch,
                'exercise_memo': (this.state.playSwitch == 1 ? this.state.playMemo : ''),
                'sleep': this.state.sleepSwitch,
                'sleep_memo': (this.state.sleepSwitch == 1 ? this.state.sleepMemo : ''),
                'eat': this.state.eatSwitch,
                'eat_memo': (this.state.eatSwitch == 1 ? this.state.eatMemo : ''),
                'condition': this.state.type,
            };
        } else {//update
            url = ServerUrl.ConditionInfoUpdateUrl;
            console.log(TAG, this.state.eatSwitch);
            details = {
                'user_no': Users.userNo,
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'condition_no': this.state.conditionNo,
                'condition_date': Moment(this.state.selectedDay).format('YYYY-MM-DD'),
                'exercise': this.state.playSwitch,
                'exercise_memo': (this.state.playSwitch == 1 ? this.state.playMemo : ''),
                'sleep': this.state.sleepSwitch,
                'sleep_memo': (this.state.sleepSwitch == 1 ? this.state.sleepMemo : ''),
                'eat': this.state.eatSwitch,
                'eat_memo': (this.state.eatSwitch == 1 ? this.state.eatMemo : ''),
                'condition': this.state.type,
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
                //condition 1-매우좋음, 2-좋음, 3-보통, 4-나쁨
                //여부 1-on, 2-off
                if (json.Error_Cd == "0000") {
                    if (this.state.requestType == 1) {//list
                        this.state.listDatas = [];
                        this.state.dates = [];
                        for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                            const obj = ({
                                condition: json.Resources[i].condition || '',
                                condition_date: json.Resources[i].condition_date || '',
                                condition_no: json.Resources[i].condition_no || '',
                                exercise: json.Resources[i].exercise || '0',
                                exercise_memo: json.Resources[i].exercise_memo || '',
                                sleep: json.Resources[i].sleep || '0',
                                sleep_memo: json.Resources[i].sleep_memo || '',
                                eat: json.Resources[i].eat || '0',
                                eat_memo: json.Resources[i].eat_memo || '',
                                reg_date: json.Resources[i].reg_date || '',
                            })
                            if (json.Resources[i].condition_date == Moment(this.state.selectedDay).format('YYYY-MM-DD')) {
                                this.state.playSwitch = json.Resources[i].exercise || '0';
                                this.state.sleepSwitch = json.Resources[i].sleep || '0';
                                this.state.eatSwitch = json.Resources[i].eat || '0';
                                this.state.playMemo = json.Resources[i].exercise_memo || '';
                                this.state.sleepMemo = json.Resources[i].sleep_memo || '';
                                this.state.eatMemo = json.Resources[i].eat_memo || '';
                                this.state.type = json.Resources[i].condition;
                                this.state.conditionNo = json.Resources[i].condition_no;
                            }
                            this.state.listDatas.push(obj);
                            this.state.dates.push(json.Resources[i].condition_date || '');
                        }
                        this.setState({
                            isLoading: true,
                        })
                    } else if (this.state.requestType == 2) {//insert
                        this.setState({
                            oneBtnDialogVisible: true,
                        })
                    } else {//update
                        this.setState({
                            oneBtnDialogVisible: true,
                        })
                    }
                } else {

                }
                this.setState({ isFetching: false })
            }
        )
    }

    _CalendarMove(value) {
        if (value != undefined) {
            if (value == "1") {//저번달
                console.log(TAG, "today : " + this.state.today.clone().subtract(1, 'month'));
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

    _CalendarArr = () => {
        let result = [];
        let week = this.state.firstWeek;

        for (week; week <= this.state.lastWeek; week++) {

            result = result.concat(
                <View key={week} style={{ flexDirection: 'row', flexWrap: 'nowrap', height: 60, marginTop: 0.5, }}>
                    {Array(7).fill(0).map((data, index) => {
                        let days = this.state.today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                        try {
                            console.log((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1))
                        } catch (err) {

                        }

                        if ((Moment().format('YYYYMMDD') === days.format('YYYYMMDD')) && days.format('MM') === this.state.today.format('MM')) {    //today
                            return (
                                <TouchableWithoutFeedback onPress={() => this._DayClick(days)}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), borderBottomLeftRadius: (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius: (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft: (index == 0 ? 0 : 0.5) }}>
                                        {this.state.dates.includes(days.format('YYYY-MM-DD')) ? <Image source={this.state.imageList[this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1]} style={{ width: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 18 : 24), height: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 18 : 24), resizeMode: 'contain', marginBottom: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 10 : 7) }}></Image> : null}
                                        <Text style={{ color: (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : '#000')), paddingBottom: 5, fontSize: 12, fontFamily: 'KHNPHDotfR' }}>{days.format('D')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>)
                        } else if (days.format('MM') !== this.state.today.format('MM')) {  //disable
                            return (
                                <TouchableWithoutFeedback onPress={() => this.setState({ oneBtnDialogVisible: true, requestType: 4 })}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), borderBottomLeftRadius: (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius: (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft: (index == 0 ? 0 : 0.5) }}>

                                        <Text style={{ color: '#AFAFAF', paddingBottom: 5, fontSize: 12, fontFamily: 'KHNPHDotfR' }}>{days.format('D')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        } else {
                            return (                                                     //current month
                                <TouchableWithoutFeedback onPress={() => this._DayClick(days)}>
                                    <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), borderBottomLeftRadius: (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius: (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft: (index == 0 ? 0 : 0.5) }}>
                                        {this.state.dates.includes(days.format('YYYY-MM-DD')) ? <Image source={this.state.imageList[this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1]} style={{ width: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 18 : 24), height: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 18 : 24), resizeMode: 'contain', marginBottom: ((this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 0) || (this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition - 1 == 1) ? 10 : 7) }}></Image> : null}
                                        <Text style={{ color: (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : '#000')), paddingBottom: 5, fontSize: 12, fontFamily: 'KHNPHDotfR' }}>{days.format('D')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>)
                        }
                    })}
                </View>);
        }
        return result;
    }

    _OneDialogVisible = value => {
        if (this.state.requestType == 1) {

        } else if (this.state.requestType == 2) {
            this.state.oneBtnDialogTitle = "기록 등록";
            this.state.oneBtnDialogContents = "기록 정보가 등록되었습니다.";
        } else if (this.state.requestType == 3) {
            this.state.oneBtnDialogTitle = "기록 수정";
            this.state.oneBtnDialogContents = "기록 정보가 수정되었습니다.";
        } else if (this.state.requestType == 4) {
            this.state.oneBtnDialogTitle = "안내";
            this.state.oneBtnDialogContents = "해당 날짜는 선택할 수 없습니다.";
        }
        if (value != undefined) {
            console.log(TAG, "1111")
            if (this.state.requestType != 4) {
                console.log(TAG, "2222")
                this.state.requestType = 1;
                this.setState({
                    oneBtnDialogVisible: value.visible,
                })
                console.log(TAG, "3333")
                this._ConditionList();
            } else {
                this.setState({
                    oneBtnDialogVisible: value.visible,
                })
            }
        }
        if (this.state.oneBtnDialogVisible) {
            return <OneBtnDialog title={this.state.oneBtnDialogTitle} contents={this.state.oneBtnDialogContents} leftBtnText={"확인"} clcik={this._OneDialogVisible}></OneBtnDialog>
        } else {
            return null;
        }
    }

    _DayClick(days) {
        if (days != undefined) {
            if (this.state.dates.includes(days.format('YYYY-MM-DD'))) {//해당일에 기록이 있는경우
                console.log(TAG, this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].eat_memo);
                this.setState({
                    playSwitch: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].exercise || '0',
                    sleepSwitch: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].sleep || '0',
                    eatSwitch: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].eat || '0',
                    playMemo: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].exercise_memo || '',
                    sleepMemo: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].sleep_memo || '',
                    eatMemo: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].eat_memo || '',
                    type: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition || '1',
                    selectedDay: days.format('YYYYMMDD'),
                    conditionNo: this.state.listDatas[this.state.dates.indexOf(days.format('YYYY-MM-DD'))].condition_no,
                })
            } else {
                this.setState({
                    selectedDay: days.format('YYYYMMDD'),
                    playSwitch: 0,
                    sleepSwitch: 0,
                    eatSwitch: 0,
                    playMemo: '',
                    sleepMemo: '',
                    eatMemo: '',
                    type: 1,
                    conditionNo: '',
                })
            }
        } else {
            this.setState({
                selectedDay: days.format('YYYYMMDD'),
                playSwitch: 0,
                sleepSwitch: 0,
                eatSwitch: 0,
                playMemo: '',
                sleepMemo: '',
                eatMemo: '',
                type: 1,
                conditionNo: '',
            })
        }
    }

    _ConditionInsert(value) {
        if (value === false) {
            if (this.state.selectedDay.length > 0) {
                if (this.state.today.format('YYYYMM') == this.state.selectedDay.substring(0, 6)) {
                    if (this.state.dates.includes(Moment(this.state.selectedDay).format('YYYY-MM-DD'))) {//update
                        this.state.requestType = 3;
                        this._ConditionList();
                    } else {//insert
                        this.state.requestType = 2;
                        this._ConditionList();
                    }
                } else {

                }
            }
        } else {
            this.props.navigation.navigate('GuestLogin')
        }

    }

    _CalendarMove(value) {
        if (value != undefined) {
            if (value == "1") {//저번달
                console.log(TAG, "today : " + this.state.today.clone().subtract(1, 'month'));
                this.state.today = this.state.today.clone().subtract(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading: true,
                })
                this._ConditionList();
            } else {//다음달
                this.state.today = this.state.today.clone().add(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading: true,
                })
                this._ConditionList();
            }
        }
    }

    render() {
        const guest = Users.guest;
        this.state.firstWeek = this.state.today.clone().startOf('month').week();
        this.state.lastWeek = this.state.today.clone().endOf('month').week() === 1 ? 53 : this.state.today.clone().endOf('month').week();
        console.log(TAG, this.state.eatMemo)
        const calendarVisible = false;
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._OneDialogVisible()}
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView style={{ width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20 }}>

                        <Text style={{ color: 'black', fontSize: 16, marginTop: 28, fontFamily: 'KHNPHDotfR' }}>{"규칙적인 운동과 숙면은"}</Text>
                        <Text style={{ color: 'black', fontSize: 16, marginTop: 10, fontFamily: 'KHNPHDotfR' }}>{"좋은 난자와 정자를 만드는것을 도와줘요"}</Text>

                        <View style={{ width: '100%', height: 32, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', marginTop: 32, }}>
                            <TouchableWithoutFeedback onPress={() => this._CalendarMove("1")}>
                                <Image source={imgLeft} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                            </TouchableWithoutFeedback>


                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 140, height: 40, backgroundColor: '#D5D6E2', borderRadius: 20, marginLeft: 20, marginRight: 20 }}>
                                <Text style={{ color: 'black', fontSize: 14, fontFamily: 'KHNPHDotfR' }}>{this.state.today.format('YYYY년 MM월')}</Text>
                            </View>

                            <TouchableWithoutFeedback onPress={() => this._CalendarMove("2")}>
                                <Image source={imgRight} style={{ width: 32, height: 32, resizeMode: 'contain', }}></Image>
                            </TouchableWithoutFeedback>

                        </View>

                        <View style={styles.calendarShadow}>
                            <View style={{ width: '100%', height: 32, flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                                {this.state.dayTitleText.map((item, index) =>
                                    <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: (index == 0 ? 0 : 0.5), backgroundColor: (index == 0 ? this.state.holidayColor : '#4A4FC3'), borderTopLeftRadius: (index == 0 ? 10 : 0), borderTopRightRadius: (index == this.state.dayTitleText.length - 1 ? 10 : 0) }}>
                                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'KHNPHUotfR' }}>{this.state.dayTitleText[index]}</Text>
                                    </View>)}
                            </View>
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

                        {/* <Text style={{ marginTop: 32, fontSize: 24, color: (holidayKr.isSolarHoliday(new Date(Moment(this.state.selectedDay))) == true ? this.state.holidayColor : '#4A50CA'), fontFamily: 'KHNPHDotfR' }}>{Moment(this.state.selectedDay).format('D')}</Text>
                        <Text style={{ marginTop: 4, fontSize: 12, color: '#000', fontFamily: 'KHNPHDotfR' }}>{this.state.dayText[Moment(this.state.selectedDay).day()]}</Text> */}
                        <Text style={{ marginTop: 24, fontSize: 14, color: (holidayKr.isSolarHoliday(new Date(Moment(this.state.selectedDay))) == true ? this.state.holidayColor : '#4A50CA'), fontFamily: 'KHNPHDotfR' }}>{Moment(this.state.selectedDay).format("YYYY년 M월 D일") + " " + this.state.dayText[Moment(this.state.selectedDay).day()]}</Text>

                        <TouchableWithoutFeedback onPress={() => this.setState({ playSwitch: this.state.playSwitch == 1 ? 0 : 1 })}>
                            <View style={{ marginTop: 21, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Image source={imgPlay} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                                <Text style={{ marginLeft: 20, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"운동을 하셨나요?"}</Text>
                                <SwitchToggle switchOn={this.state.playSwitch == 1 ? true : false} onPress={() => this.setState({ playSwitch: this.state.playSwitch == 1 ? 0 : 1 })}
                                    circleColorOff='#C6C7E0' circleColorOn='#4A50CA' backgroundColorOn="#9699D6" backgroundColorOff="#D5D6E2"
                                    containerStyle={{ width: 33, height: 10, borderRadius: 25, }}
                                    circleStyle={{ width: 20, height: 20, borderRadius: 20, }} />
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.playSwitch == 1 ? <View style={{ width: '100%', height: 180, marginTop: 16, padding: 16, backgroundColor: '#fff', borderRadius: 24, }}>
                            <TextInput style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', textAlignVertical: 'top', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="내용을 입력해주세요." autoCapitalize="none" multiline={true} onChangeText={(value) => this.setState({ playMemo: value })} maxLength={2000} value={this.state.playMemo}></TextInput>
                            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 12, color: '#D5D5D5' }}>{"(" + this.state.playMemo.length + "/2000)"}</Text>
                            </View>
                        </View> : null}

                        <TouchableWithoutFeedback onPress={() => this.setState({ eatSwitch: this.state.eatSwitch == 1 ? 0 : 1 })}>
                            <View style={{ marginTop: 21, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Image source={imgEat} style={{ width: 32, height: 32, resizeMode: 'contain', marginLeft: 10 }}></Image>
                                <Text style={{ marginLeft: 30, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"식사는 건강하게 하셨나요?"}</Text>
                                <SwitchToggle switchOn={this.state.eatSwitch == 1 ? true : false} onPress={() => this.setState({ eatSwitch: this.state.eatSwitch == 1 ? 0 : 1 })}
                                    circleColorOff='#C6C7E0' circleColorOn='#4A50CA' backgroundColorOn="#9699D6" backgroundColorOff="#D5D6E2"
                                    containerStyle={{ width: 33, height: 10, borderRadius: 25, }}
                                    circleStyle={{ width: 20, height: 20, borderRadius: 20, }} />
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.eatSwitch == 1 ? <View style={{ width: '100%', height: 180, marginTop: 16, padding: 16, backgroundColor: '#fff', borderRadius: 24, }}>
                            <TextInput style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', textAlignVertical: 'top', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="내용을 입력해주세요." autoCapitalize="none" multiline={true} onChangeText={(value) => this.setState({ eatMemo: value })} maxLength={2000} value={this.state.eatMemo}></TextInput>
                            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 12, color: '#D5D5D5' }}>{"(" + this.state.eatMemo.length + "/2000)"}</Text>
                            </View>
                        </View> : null}

                        <TouchableWithoutFeedback onPress={() => this.setState({ sleepSwitch: this.state.sleepSwitch == 1 ? 0 : 1 })}>
                            <View style={{ marginTop: 20, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Image source={imgSleep} style={{ width: 52, height: 52, resizeMode: 'contain', }}></Image>
                                <Text style={{ marginLeft: 20, fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"숙면을 취하셨나요?"}</Text>
                                <SwitchToggle switchOn={this.state.sleepSwitch == 1 ? true : false} onPress={() => this.setState({ sleepSwitch: this.state.sleepSwitch == 1 ? 0 : 1 })}
                                    circleColorOff='#C6C7E0' circleColorOn='#4A50CA' backgroundColorOn="#9699D6" backgroundColorOff="#D5D6E2"
                                    containerStyle={{ width: 33, height: 10, borderRadius: 25, }}
                                    circleStyle={{ width: 20, height: 20, borderRadius: 20, }} />
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.sleepSwitch == 1 ? <View style={{ width: '100%', height: 180, marginTop: 16, padding: 16, backgroundColor: '#fff', borderRadius: 24, }}>
                            <TextInput style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', textAlignVertical: 'top', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="내용을 입력해주세요." autoCapitalize="none" multiline={true} onChangeText={(value) => this.setState({ sleepMemo: value })} maxLength={2000} value={this.state.sleepMemo}></TextInput>
                            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 12, color: '#D5D5D5' }}>{"(" + this.state.sleepMemo.length + "/2000)"}</Text>
                            </View>
                        </View> : null}

                        <ScrollView style={{ marginTop: 32, }} horizontal={true}>
                            {this.state.imageList.map((item, index) => <TouchableWithoutFeedback onPress={() => this.setState({ type: index + 1 })}>
                                <View key={index} style={{ width: 60, height: 80, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: 12 }}>
                                    <Image source={item} style={{ width: 40, height: 40, resizeMode: 'contain', }}></Image>
                                    <Image source={(this.state.type == (index + 1) ? imgCheckOn : imgCheckOff)} style={{ width: 24, height: 18, resizeMode: 'contain', marginTop: 10 }}></Image>
                                </View>
                            </TouchableWithoutFeedback>)}
                        </ScrollView>

                        <TouchableWithoutFeedback onPress={() => this._ConditionInsert(guest)}>
                            <View style={{ marginTop: 32, borderRadius: 32, height: 64, backgroundColor: '#4A50CA', ...Elevations[10], alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'KHNPHDotfR' }}>기록하기</Text>
                            </View>
                        </TouchableWithoutFeedback>


                        <View style={{ height: 20 }}></View>

                    </ScrollView>
                    <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    calendarShadow: {
        marginTop: 16.5,
        backgroundColor: '#f6f6f9',
        borderRadius: 20,
    },
})