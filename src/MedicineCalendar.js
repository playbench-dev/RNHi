import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet,TouchableWithoutFeedback, LogBox, Modal, BackHandler, ActivityIndicator} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Elevations from 'react-native-elevation';
import SwitchToggle from 'react-native-switch-toggle';
import FetchingIndicator from 'react-native-fetching-indicator'

import Moment from 'moment';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import OneBtnDialog from './Common/OneBtnDialog'
import TowBtnDialog from './Common/TwoBtnDialog'
import DatePicker from 'react-native-date-picker'
import GestureRecognizer from 'react-native-swipe-gestures';

const TAG = "MedicineCalendar";
const imgBack = require('../assets/ic_calendar_back.png');
const imgLeft = require('../assets/ic_calendar_left.png');
const imgRight = require('../assets/ic_calendar_right.png');

const imgCircle = require('../assets/ic_main_circle.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');
const imgClock = require('../assets/ic_main_clock.png');

const imgCirclePink = require('../assets/ic_pink_circle.png');
const imgCircleGreen = require('../assets/ic_green_circle.png');
const imgCircleBlue = require('../assets/ic_blue_circle.png');

const imgCirclePinkCheck = require('../assets/ic_pink_circle_check.png');
const imgCircleGreenCheck = require('../assets/ic_green_circle_check.png');
const imgCircleBlueCheck = require('../assets/ic_blue_circle_check.png');

const holidayKr = require('holiday-kr');

LogBox.ignoreLogs([
    'Each child in a list should have a unique "key" prop.',
]);

export default class MedicineCalendar extends React.Component{
    constructor(props){
        super(props)
        this.backAction = this.backAction.bind(this);
    }

    state = {
        isLoading : false,
        previousMonth : '이전',
        nextMonth : '다음',
        today : Moment(),
        firstWeek : '',
        lastWeek : '',
        dayTitleText : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        dayText : ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
        dateList : [],
        selectedDay : Moment().format('YYYYMMDD'),
        clickDay : '',
        clickDayOfTheWeek : '',
        playSwitch : false,
        sleepSwitch : false,
        type : 1,
        oneBtnDialogVisible : false,
        twoDialogVisible : false,
        exceptTwoDialogVisible : false,
        calendarVisible : false,
        datas : [],
        includes : [],
        scheduleNo : [],
        namesList : [],
        selectPosition : 0,
        selectMedicineName : '',
        eatingTime : '',
        updateDatas : [],
        selectTime : '',
        requestType : 1,
        resultCode : false,
        holidayColor : '#ec407a',
        routePush : false,
        scroll : true,
        isFetching : true,
        //20211228 luteal 추가
        et_start_date : '',
        et_end_date : '',
    }
    //20211228 luteal 추가
    getDatesStartToLast(startDate, lastDate) {
        var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
        if(!(regex.test(startDate) && regex.test(lastDate))) return "Not Date Format";
        var result = [];
        var curDate = new Date(startDate);
        while(curDate <= new Date(lastDate)) {
            result.push(curDate.toISOString().split("T")[0]);
            curDate.setDate(curDate.getDate() + 1);
        }
        return result;
    }

    backAction(){
        if(this.state.routePush == true){
            this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
        }else{
            if(this.props.route.params.medicineUpdate != undefined){
                this.props.route.params.medicineUpdate(this.state.resultCode);
                this.props.navigation.goBack();
            }else{
                this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
            }
        }
        return true;
    };

    componentDidMount(){
        this._MedcineInfo();
        this.onFocusTrigger = this.props.navigation.addListener('focus', () => {
            // trigger your event
            console.log('aasdasdadasd')
         });
        BackHandler.addEventListener("hardwareBackPress",this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _MedcineInfo(){
        var details = null;
        var url = "";
        this.setState({isFetching : true})
        if(this.state.requestType == 1){
            url = ServerUrl.medicineInfoList;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'user_no' : Users.userNo,
                'cel_date' : this.state.today.format('YYYYMM')+"00",
            };
        }else if(this.state.requestType == 2){
            url = ServerUrl.medicineUpdate;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'schedule_no' : this.state.includes[0].schedule_no,
                'medicine_info' : JSON.stringify(this.state.includes),
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
                console.log(TAG,json);
                if(json.Error_Cd == "0000"){
                    if(this.state.requestType == 1){
                        this.state.datas = [];
                        this.state.dateList = [];
                        this.state.scheduleNo = [];
                        this.state.namesList = [];
                        this.state.et_start_date = '';
                        this.state.et_end_date = ''; 
                        console.log(json.Luteal)
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
                            this.state.scheduleNo.push(json.Resources[i].schedule_no || '');
                            this.state.namesList.push(json.Resources[i].medicine_name || '');
                            this.state.datas.push(obj);
                            this.state.dateList.push(json.Resources[i].cel_date || '');
                        }

                        for(let i = 0; i < Object.keys(json.Luteal).length; i++){
                            console.log(this.state.scheduleNo, + ' ' + json.Luteal[i].schedule_no + ' name : ' + this.state.namesList);
                            for(let j = 0; j < Object.keys(json.Luteal[i].medicine_info).length; j++){
                                if(this.state.scheduleNo.includes(json.Luteal[i].schedule_no) === true){
                                    console.log('i : ' + this.state.namesList[this.state.scheduleNo.indexOf(json.Luteal[i].schedule_no)] + ' name : ' + json.Luteal[i].medicine_info[j].medicine_name);
                                    if(this.state.namesList.includes(json.Luteal[i].medicine_info[j].medicine_name) === true){
                                        console.log('i : ' + i + ' j : ' + j);
                                    }else{
                                        const obj = ({
                                            abbreviation : json.Luteal[i].medicine_info[j].abbreviation || '',
                                            amount : json.Luteal[i].medicine_info[j].amount || '', 
                                            cel_date : json.Luteal[i].cel_date || '',
                                            every_other_day : json.Luteal[i].medicine_info[j].every_other_day || '',
                                            idx :  '',
                                            medicine_name : json.Luteal[i].medicine_info[j].medicine_name || '', 
                                            medicine_no : json.Luteal[i].medicine_info[j].medicine_no || '',
                                            memo : json.Luteal[i].medicine_info[j].memo || '',
                                            purpose : json.Luteal[i].medicine_info[j].purpose || '',
                                            reg_date : json.Luteal[i].medicine_info[j].reg_date || '',
                                            reg_id : json.Luteal[i].medicine_info[j].reg_id || '',
                                            unit : json.Luteal[i].medicine_info[j].unit || '', 
                                            type : json.Luteal[i].medicine_info[j].medicine_type || '',
                                            take_time : json.Luteal[i].medicine_info[j].take_time || '', 
                                            schedule_no : json.Luteal[i].schedule_no || '',
                                        })
                                        if(json.Luteal[i].medicine_info[j].every_other_day == 1){
                                            if(i % 2 == 0){
                                                this.state.datas.push(obj);
                                                this.state.dateList.push(json.Luteal[i].cel_date || '');
                                            }
                                        }else{
                                            this.state.datas.push(obj);
                                            this.state.dateList.push(json.Luteal[i].cel_date || '');
                                        }
                                    }
                                }else{
                                    const obj = ({
                                        abbreviation : json.Luteal[i].medicine_info[j].abbreviation || '',
                                        amount : json.Luteal[i].medicine_info[j].amount || '', 
                                        cel_date : json.Luteal[i].cel_date || '',
                                        every_other_day : json.Luteal[i].medicine_info[j].every_other_day || '',
                                        idx :  '',
                                        medicine_name : json.Luteal[i].medicine_info[j].medicine_name || '', 
                                        medicine_no : json.Luteal[i].medicine_info[j].medicine_no || '',
                                        memo : json.Luteal[i].medicine_info[j].memo || '',
                                        purpose : json.Luteal[i].medicine_info[j].purpose || '',
                                        reg_date : json.Luteal[i].medicine_info[j].reg_date || '',
                                        reg_id : json.Luteal[i].medicine_info[j].reg_id || '',
                                        unit : json.Luteal[i].medicine_info[j].unit || '', 
                                        type : json.Luteal[i].medicine_info[j].medicine_type || '',
                                        take_time : json.Luteal[i].medicine_info[j].take_time || '', 
                                        schedule_no : json.Luteal[i].schedule_no || '',
                                    })
                                    if(json.Luteal[i].medicine_info[j].every_other_day == 1){
                                        if(i % 2 == 0){
                                            this.state.datas.push(obj);

                                            this.state.dateList.push(json.Luteal[i].cel_date || '');
                                        }
                                    }else{
                                        this.state.datas.push(obj);
                                        this.state.dateList.push(json.Luteal[i].cel_date || '');
                                    }
                                }
                            }
                        }

                        this._MakeListItem(this.state.selectedDay);

                        this.setState({
                            isLoading : true,
                        })
                    }else if(this.state.requestType == 2){
                        this.state.requestType = 1;
                        this.state.resultCode = true;
                        this._MedcineInfo();
                    }
                }else{

                }
            }
        )
        this.setState({isFetching : false})
    }

    _CalendarArr = () => {
        let result = [];
        let week = this.state.firstWeek;

        for ( week; week <= this.state.lastWeek; week++) {
            
            result = result.concat(
                <View key={week} style = {{flexDirection : 'row', flexWrap : 'nowrap', height : 60, marginTop : 0.5,}} >
                    {Array(7).fill(0).map((data, index) => {
                    let days = this.state.today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                    let position = this.state.dateList.indexOf(days.format('YYYY-MM-DD'));

                    let pink = false;
                    let green = false;
                    let blue = false;

                    let pinkCheck = 0;
                    let greenCheck = 0;
                    let blueCheck = 0;

                    while(position != -1){
                        if(this.state.datas[position].type == '주사'){
                            pink = true;
                            if(this.state.datas[position].take_time.length > 0){
                                if(pinkCheck == 0){
                                    pinkCheck = 1;
                                }
                            }else{
                                pinkCheck = 2;
                            }
                        }else if(this.state.datas[position].type == '약'){
                            green = true;
                            if(this.state.datas[position].take_time.length > 0){
                                if(greenCheck == 0){
                                    greenCheck = 1;
                                }
                            }else{
                                greenCheck = 2;
                            }
                        }else if(this.state.datas[position].type == '질정'){
                            blue = true;
                            if(this.state.datas[position].take_time.length > 0){
                                if(blueCheck == 0){
                                    blueCheck = 1;
                                }
                            }else{
                                blueCheck = 2;
                            }
                        }
                        position = this.state.dateList.indexOf(days.format('YYYY-MM-DD'), position + 1);
                    }                    
                    if(Moment().format('YYYYMMDD') === days.format('YYYYMMDD') && days.format('MM') === this.state.today.format('MM')){        //today
                        return(
                            <TouchableWithoutFeedback onPress = {() => this._MakeListItem(days.format('YYYYMMDD'))}>
                                <View key={index} style = {{flex : 1, alignItems : 'center', justifyContent : 'flex-end', backgroundColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), borderBottomLeftRadius : (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius : (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft : (index == 0 ? 0 : 0.5)}}>
                                     {this.state.dateList.includes(days.format('YYYY-MM-DD')) && <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'center',width : '100%', height : 30}}>
                                     {pink && <Image source = {pinkCheck == 1 ? imgCirclePinkCheck : imgCirclePink} style = {{width : 10, height : 10, resizeMode : 'contain',}}></Image>}
                                        {green && <Image source = {greenCheck == 1 ? imgCircleGreenCheck : imgCircleGreen} style = {{width : 10, height : 10, resizeMode : 'contain', marginLeft : 3}}></Image>}
                                        {blue && <Image source = {blueCheck == 1 ? imgCircleBlueCheck : imgCircleBlue} style = {{width : 10, height : 10, resizeMode : 'contain', marginLeft : 3}}></Image>}
                                     </View>}
                                    <Text style = {{color : (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : '#000')), paddingBottom : 5,fontSize : 12, fontFamily : 'KHNPHDotfR'}}>{days.format('D')}</Text>
                                </View>
                            </TouchableWithoutFeedback>)
                    }else if(days.format('MM') !== this.state.today.format('MM')){      //disable
                        return(
                            <TouchableWithoutFeedback onPress = {() => this.setState({oneBtnDialogVisible : true})}>
                                <View key={index} style = {{flex : 1, alignItems : 'center', justifyContent : 'flex-end', backgroundColor : ((this.state.selectedDay == days.format('YYYYMMDD') && days.format('MM') === this.state.today.format('MM')) ? '#F1F1F1' : '#fff'), borderBottomLeftRadius : (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius : (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft : (index == 0 ? 0 : 0.5)}}>
                                    
                                    <Text style = {{color : '#AFAFAF', paddingBottom : 5,fontSize : 12, fontFamily : 'KHNPHDotfR'}}>{days.format('D')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            )
                    }else{                                                              //month
                        return(
                            <TouchableWithoutFeedback onPress = {() => this._MakeListItem(days.format('YYYYMMDD'))}>
                                <View key={index} style = {{flex : 1, alignItems : 'center', justifyContent : 'flex-end', backgroundColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#F1F1F1' : '#fff'), borderBottomLeftRadius : (index == 0 && week == this.state.lastWeek ? 12 : 0), borderBottomRightRadius : (index == 6 && week == this.state.lastWeek ? 12 : 0), marginLeft : (index == 0 ? 0 : 0.5)}}>
                                    {this.state.dateList.includes(days.format('YYYY-MM-DD')) && <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'center',width : '100%', height : 30}}>
                                        {pink && <Image source = {pinkCheck == 1 ? imgCirclePinkCheck : imgCirclePink} style = {{width : 10, height : 10, resizeMode : 'contain',}}></Image>}
                                        {green && <Image source = {greenCheck == 1 ? imgCircleGreenCheck : imgCircleGreen} style = {{width : 10, height : 10, resizeMode : 'contain', marginLeft : 3}}></Image>}
                                        {blue && <Image source = {blueCheck == 1 ? imgCircleBlueCheck : imgCircleBlue} style = {{width : 10, height : 10, resizeMode : 'contain', marginLeft : 3}}></Image>}
                                    </View>}
                                    <Text style = {{color : (holidayKr.isSolarHoliday(new Date(Moment(days.format('YYYYMMDD')))) == true ? this.state.holidayColor : (this.state.selectedDay == days.format('YYYYMMDD') ? '#4A4FC3' : '#000')), paddingBottom : 5,fontSize : 12, fontFamily : 'KHNPHDotfR'}}>{days.format('D')}</Text>
                                </View>
                            </TouchableWithoutFeedback>)
                    }})}
                </View>);
        }
        return result;
    }

    _DatePicker(){
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
                twoDialogVisible : true,
                exceptTwoDialogVisible : false,
            })
      }

      _ExceptTwoDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                exceptTwoDialogVisible : value.visible,
            })
            if(value.status == "done"){
                this._UpdateTakeTime(this.state.selectTime);
            }
        }
    
        if(this.state.exceptTwoDialogVisible){
            console.log(TAG,'time2 : ' + this.state.eatingTime)
          return <TowBtnDialog title = {"투약등록"} contents = {this.state.selectMedicineName+ "를 투약하셨나요?"} leftBtnText = {"취소"} rightBtnText = {"확인"} clcik = {this._ExceptTwoDialogVisible}></TowBtnDialog>
        }else{
          return null;
        }
    }

    _TwoDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                twoDialogVisible : value.visible,
            })
            if(value.status == "done"){
                this._UpdateTakeTime(this.state.selectTime);
            }
        }
    
        if(this.state.twoDialogVisible){
            console.log(TAG,'time2 : ' + this.state.eatingTime)
          return <TowBtnDialog title = {"투약등록"} contents = {this.state.eatingTime + " 투약시간\n등록 하시겠습니까?"} leftBtnText = {"취소"} rightBtnText = {"확인"} clcik = {this._TwoDialogVisible}></TowBtnDialog>
        }else{
          return null;
        }
    }

    _OneDialogVisible = value =>{
        if(value != undefined){
            this.setState({
                oneBtnDialogVisible : value.visible,
            })
        }
        if(this.state.oneBtnDialogVisible){
          return <OneBtnDialog title = {"안내"} contents = {"해당 날짜는 선택할 수 없습니다."} leftBtnText = {"확인"} clcik = {this._OneDialogVisible}></OneBtnDialog>
        }else{
          return null;
        }
    }

    _CalendarMove(value){
        if(value != undefined){
            if(value == "1"){//저번달
                console.log(TAG,"today : " + this.state.today.clone().subtract(1, 'month'));
                this.state.today = this.state.today.clone().subtract(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading : true,
                })
                this._MedcineInfo();
            }else {//다음달
                this.state.today = this.state.today.clone().add(1, 'month');
                this.state.requestType = 1;
                this.setState({
                    isLoading : true,
                })
                this._MedcineInfo();
            }
        }
    }

    _MakeListItem(value){
        console.log(TAG,"value : " + value);
        let position = this.state.dateList.indexOf(Moment(value).format('YYYY-MM-DD'));
        this.state.includes = [];
        console.log(TAG,"position : " + position);

        while(position != -1){
            this.state.includes.push(this.state.datas[position]);
            position = this.state.dateList.indexOf(Moment(value).format('YYYY-MM-DD'), position + 1);
        }        
        console.log(TAG,this.state.includes);
        this.setState({
            selectedDay : value,
        })
    }

    _UpdateTakeTime(str){
        console.log(TAG,'eatingTime : ' + this.state.selectTime);
        // this.state.includes = this.state.includes.filter(item => (item.idx.length != 0 && item.take_time.length != 0));
        this.state.includes = this.state.includes.map((data,index) => (this.state.selectPosition === index ) ? {
        abbreviation : data.abbreviation || '',
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
        schedule_no : data.schedule_no || '',} : data )
        console.log('updates : ',this.state.includes);
        this.state.requestType = 2;
        this.setState({twoDialogVisible : false, exceptTwoDialogVisible : false})
        this._MedcineInfo();
    }

    goBack(){
        if(this.state.routePush == true){
            this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
        }else{
            if(this.props.route.params.medicineUpdate != undefined){
                this.props.route.params.medicineUpdate(this.state.resultCode);
                this.props.navigation.goBack();
            }else{
                this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
            }
        }
    }

    render(){

        if(this.props.route.params != undefined){
            if(this.props.route.params.push != undefined){
                this.state.routePush = this.props.route.params.push;
            }
        }

        this.state.firstWeek = this.state.today.clone().startOf('month').week();
        this.state.lastWeek = this.state.today.clone().endOf('month').week() === 1 ? 53 : this.state.today.clone().endOf('month').week();
        
        return(
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    {this._OneDialogVisible()}
                    {this._DatePicker()}
                    {this._TwoDialogVisible()}
                    {this._ExceptTwoDialogVisible()}
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView style = {{width : '100%', height : '100%', paddingLeft : 20, paddingRight : 20, marginTop : 8}} scrollEnabled = {this.state.scroll} >

                        <View style = {{width : '100%', height : 32, flexDirection : 'row', flexWrap : 'nowrap', justifyContent : 'center', alignItems : 'center', marginTop : 4}}>
                            <TouchableWithoutFeedback onPress={()=> this._CalendarMove("1")}>
                                <Image source = {imgLeft} style = {{width : 32, height : 32, resizeMode : 'contain',}}></Image>
                            </TouchableWithoutFeedback>
                            
                            <View style = {{alignItems : 'center', justifyContent : 'center', width : 140, height : 40, backgroundColor : '#D5D6E2', borderRadius : 20, marginLeft : 20, marginRight : 20}}>
                                <Text style = {{color : 'black', fontSize : 14, fontFamily : 'KHNPHDotfR'}}>{this.state.today.format('YYYY년 MM월')}</Text>
                            </View>
                            
                            <TouchableWithoutFeedback onPress={() => this._CalendarMove("2")}>
                                <Image source = {imgRight} style = {{width : 32, height : 32, resizeMode : 'contain',}}></Image>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style = {styles.calendarShadow}>
                            <View style = {{width : '100%', height : 32, flexDirection : 'row', flexWrap : 'nowrap', backgroundColor : '#fff', borderTopLeftRadius : 12, borderTopRightRadius : 12}}>
                                    {this.state.dayTitleText.map((item,index) => 
                                    <View key = {index} style = {{flex : 1, justifyContent : 'center', alignItems : 'center', marginLeft : (index == 0 ? 0 : 0.5), backgroundColor : (index == 0 ? this.state.holidayColor : '#4A4FC3'), borderTopLeftRadius : (index == 0 ? 10 : 0), borderTopRightRadius : (index == this.state.dayTitleText.length-1 ? 10 : 0)}}>
                                        <Text style = {{color : '#fff', fontSize : 12, fontFamily : 'KHNPHUotfR'}}>{this.state.dayTitleText[index]}</Text>
                                    </View>)}
                                </View>

                            <GestureRecognizer onSwipe={(gestureName, gestureState) => {
                                console.log(TAG,"dx : " + JSON.stringify(gestureState) );
                                const {dx,dy} = gestureState;
                                console.log(TAG,"dx : " + dx + " dy : " + dy);
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

                        <Text style={{marginTop : 24, fontSize : 14, color : (holidayKr.isSolarHoliday(new Date(Moment(this.state.selectedDay))) == true ? this.state.holidayColor : '#4A50CA'), fontFamily : 'KHNPHDotfR'}}>{Moment(this.state.selectedDay).format("YYYY년 M월 D일") + " " + this.state.dayText[Moment(this.state.selectedDay).day()]}</Text>

                        <View style={{marginTop: 21, borderRadius : 24, backgroundColor : "rgba(219,227,241,0.5)", paddingLeft : 20 , paddingRight : 20, width : '100%',}}>
                            <View style = {{marginTop : 12, flexDirection : 'row', justifyContent : 'center', alignItems : 'center',}}>
                                <View style = {{borderRadius : 40, width : 16, height : 16, backgroundColor : '#EDA6CA'}}></View>
                                <Text style = {{marginLeft : 8, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>주사</Text>

                                <View style = {{borderRadius : 40, width : 16, height : 16, backgroundColor : '#63BEB1', marginLeft : 34}}></View>
                                <Text style = {{marginLeft : 8, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>경구약</Text>

                                <View style = {{borderRadius : 40, width : 16, height : 16, backgroundColor : '#499BD5', marginLeft : 34}}></View>
                                <Text style = {{marginLeft : 8, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>질정</Text>
                            </View>
                            <View style = {{marginBottom : 28}}>
                                {this.state.includes.length > 0 ? this.state.includes.map((item,index) => <View key={index} style = {{marginTop : index == 0 ? 16 : 8,}}>
                                    <TouchableWithoutFeedback onPress = {() => ((item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸') ? this.setState({calendarVisible : true, selectPosition : index, selectMedicineName : item.medicine_name, eatingTime : Moment().format("a HH:mm"), selectTime : Moment().format("HH:mm")}) : item.take_time.length == 0 && this.setState({exceptTwoDialogVisible : true, selectPosition : index, selectMedicineName : item.medicine_name, eatingTime : Moment().format("a HH:mm"), selectTime : Moment().format("HH:mm")}))}>
                                        <View style = {{ flexDirection : 'row', backgroundColor : '#fff', height : 40, borderRadius : 16, alignItems : 'center', justifyContent : 'center', paddingLeft : 12, paddingRight : 12}}>
                                          <Image source = {(item.type == '주사' ? imgCirclePink : (item.type == '약' ? imgCircleGreen : imgCircleBlue))} style = {{width : 8 , height : 8, resizeMode : 'contain',}}></Image>
                                          <Text style = {{marginLeft : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : '#000', flex : 0.6}}>{item.medicine_name}</Text>
                                          <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfR', color : '#000', flex : 0.6}}>{item.amount + item.unit}</Text>
                                          {(item.take_time.length > 0) ? (
                                              (item.medicine_name == '오비드렐' || item.medicine_name == '데카펩틸') ? 
                                          <View style = {{flex : 1, justifyContent : 'flex-end', flexDirection : 'row', flexWrap : 'wrap'}}>
                                                <Image source = {imgClock} style = {{width : 12, height : 12, resizeMode : 'contain',}}></Image>
                                                <Text style = {{marginLeft : 7, fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#000'}}>{Moment(Moment().format('YYYY-MM-DD') + " " + item.take_time).format('a h시 mm분')}</Text>
                                          </View> 
                                          : 
                                          <View style = {{flex : 1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                                              <Text style = {{fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#000'}}>복용 완료</Text>
                                          </View> )
                                           : 
                                           <View style = {{flex : 1, alignItems : 'flex-end'}}>
                                               <Image source = {imgArrow} style = {{width : 8, height : 12, marginRight : 11.5}}></Image>
                                            </View>}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>) : <View style = {{width : '100%', alignItems : 'center', justifyContent : 'center', marginTop : 20}}><Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}}>{"해당일에는 복약정보가 없습니다."}</Text></View>}
                            </View>        
                        </View>
                        
                        {/* <View style = {{marginTop : 32, borderRadius : 32, height : 64, backgroundColor : '#4A50CA', ...Elevations[10], alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{color : '#fff', fontSize : 16, fontFamily : 'KHNPHDotfR'}}>기록하기</Text>
                        </View> */}

                        <View style = {{height : 20}}></View>
                        
                    </ScrollView>
                    <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    calendarShadow : {
        marginTop : 16.5,
        backgroundColor : '#f6f6f9', 
        borderRadius : 20,
    },
})