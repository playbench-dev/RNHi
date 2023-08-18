import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList} from 'react-native';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList, BackHandler } from 'react-native';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import AsyncStorage from '@react-native-community/async-storage';
>>>>>>> mw

const TAG = "AlarmList";
const imgBack = require('../assets/ic_calendar_back.png');
const imgDelete = require('../assets/ic_alarm_delete.png');
const imgCheckTrue = require('../assets/ic_check_true.png');
const imgCheckFalse = require('../assets/ic_check_false.png');

<<<<<<< HEAD
export default class AlarmList extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        datas : [],
        deleteMode : false,
        allCheck : false,
        checks : [],
        isLoading : false,
        requestType : 1,
        pageShowCnt : 10,
        pageNo : 1,
        deletes : [],
        totalCnt : 0,
    }

    componentDidMount(){
        if(this.state.isLoading === false){
            console.log(TAG,'isLoading : ' + this.state.isLoading);
            this._PushInfo();
        }
        
    }

    _PushInfo(){
        var details = null;
        var url = "";
    
        if(this.state.requestType == 1){
            url = ServerUrl.PushListUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'user_no' : Users.userNo,
                'page_show_cnt' : this.state.pageShowCnt,
                'page_no' : this.state.pageNo,
            };
        }else if(this.state.requestType == 2){
            url = ServerUrl.PushDeleteUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'push_no' : this.state.deletes,
                'user_no' : Users.userNo,
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

                        // this.state.datas = [];
                        for(let i = 0; i < Object.keys(json.Resources).length; i++){
                            if(json.Resources[i].alive_flag == 1){
                                const obj = ({
                                    image_url : json.Resources[i].image_url || '',
                                    push_contents : json.Resources[i].push_contents || '', 
                                    push_no : json.Resources[i].push_no || '',
                                    push_title : json.Resources[i].push_title || '',
                                    push_type : json.Resources[i].push_type || '',
                                    reg_date : json.Resources[i].reg_date || '', 
=======
export default class AlarmList extends React.Component {
    constructor(props) {
        super(props);
        this.backAction = this.backAction.bind(this);
    }

    state = {
        datas: [],
        deleteMode: false,
        allCheck: false,
        checks: [],
        isLoading: false,
        requestType: 1,
        pageShowCnt: 14,
        pageNo: 1,
        deletes: [],
        totalCnt: 0,
        routePush: false,
        accessToken: '',
        refreshToken: '',
        userNo: '',
    }

    backAction() {
        if (this.state.routePush == true) {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    _goBack() {
        if (this.state.routePush == true) {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            this.props.navigation.goBack();
        }
    }

    componentDidMount() {
        if (Users.userName == undefined) {
            console.log(TAG, 'un : ' + Users.userName)
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
                console.log(TAG, 'accessToken : ' + UserInfo.access_token + ' refreshToken : ' + UserInfo.refresh_token)
                this.setState({
                    userNo: UserInfo.user_no,
                    accessToken: UserInfo.access_token,
                    refreshToken: UserInfo.refresh_token,
                })
                console.log(TAG, 'un : ' + this.state.userName)
            });
        }

        if (this.state.isLoading === false) {
            console.log(TAG, 'isLoading : ' + this.state.isLoading);
            this._PushInfo();
        }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _PushInfo() {
        var details = null;
        var url = "";

        if (this.state.requestType == 1) {
            url = ServerUrl.PushListUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
                'page_show_cnt': this.state.pageShowCnt,
                'page_no': this.state.pageNo,
            };
        } else if (this.state.requestType == 2) {
            url = ServerUrl.PushDeleteUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'push_no': this.state.deletes,
                'user_no': Users.userNo,
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

                        // this.state.datas = [];
                        for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                            if (json.Resources[i].alive_flag == 1) {
                                const obj = ({
                                    image_url: json.Resources[i].image_url || '',
                                    push_contents: json.Resources[i].push_contents || '',
                                    push_no: json.Resources[i].push_no || '',
                                    push_title: json.Resources[i].push_title || '',
                                    push_type: json.Resources[i].push_type || '',
                                    reg_date: json.Resources[i].reg_date || '',
>>>>>>> mw
                                })
                                this.state.datas.push(obj);
                                this.state.checks.push(false);
                            }
                        }
                        this.setState({
<<<<<<< HEAD
                            totalCnt : json.Total,
                            isLoading : true,
                            pageNo : this.state.pageNo + 1,
                        })
                    }else if(this.state.requestType == 2){
                        this.state.requestType = 1;
                    }
                }else{
    
=======
                            totalCnt: json.Total,
                            isLoading: true,
                            pageNo: this.state.pageNo + 1,
                        })
                    } else if (this.state.requestType == 2) {
                        this.state.requestType = 1;
                    }
                } else {

>>>>>>> mw
                }
            }
        )
    }

<<<<<<< HEAD
    _AllCheckEvent(){
        this.state.checks = [];
        if(this.state.allCheck == true){
            for(let i = 0; i < this.state.datas.length; i++){
                this.state.checks.push(false);
            }
            this.setState({allCheck: false})
        }else{
            for(let i = 0; i < this.state.datas.length; i++){
                this.state.checks.push(true);
            }
            this.setState({allCheck: true})
=======
    _AllCheckEvent() {
        this.state.checks = [];
        if (this.state.allCheck == true) {
            for (let i = 0; i < this.state.datas.length; i++) {
                this.state.checks.push(false);
            }
            this.setState({ allCheck: false })
        } else {
            for (let i = 0; i < this.state.datas.length; i++) {
                this.state.checks.push(true);
            }
            this.setState({ allCheck: true })
>>>>>>> mw
        }
    }

    _ChildCheckEvent = value => {
<<<<<<< HEAD
        console.log(TAG,this.state.datas[value].push_no)
        this.state.checks = this.state.checks.map((item,index) => value == index ? (this.state.checks[index] == true ? false : true) : item);
        this.setState({
            allCheck : false,
        })
    }

    _DeletePush(){
        this.state.deletes = [];
        
        for(var i = 0; i < this.state.checks.length; i++){
            console.log(TAG,'i ' + i + " " + this.state.datas[i].push_no)
            if(this.state.checks[i] === true){
=======
        console.log(TAG, this.state.datas[value].push_no)
        this.state.checks = this.state.checks.map((item, index) => value == index ? (this.state.checks[index] == true ? false : true) : item);
        this.setState({
            allCheck: false,
        })
    }

    _DeletePush() {
        this.state.deletes = [];

        for (var i = 0; i < this.state.checks.length; i++) {
            console.log(TAG, 'i ' + i + " " + this.state.datas[i].push_no)
            if (this.state.checks[i] === true) {
>>>>>>> mw
                this.state.deletes.push(this.state.datas[i].push_no);
                // newList.splice(i,1);
                // newList1.splice(i,1);
            }
        }

<<<<<<< HEAD
        for(let i = 0; i < this.state.datas.length; i++){
            for(let j = 0; j < this.state.deletes.length; j++){
                if(this.state.datas[i].push_no == this.state.deletes[j]){
                    console.log(TAG,this.state.datas[i].push_no + " j : " + j);
                    this.state.datas.splice(i,1);
                    this.state.checks.splice(i,1);
=======
        for (let i = 0; i < this.state.datas.length; i++) {
            for (let j = 0; j < this.state.deletes.length; j++) {
                if (this.state.datas[i].push_no == this.state.deletes[j]) {
                    console.log(TAG, this.state.datas[i].push_no + " j : " + j);
                    this.state.datas.splice(i, 1);
                    this.state.checks.splice(i, 1);
>>>>>>> mw
                }
            }
        }

<<<<<<< HEAD
        if(this.state.datas.length == 0){
=======
        if (this.state.datas.length == 0) {
>>>>>>> mw
            this.state.deleteMode = false;
        }

        this.setState({
<<<<<<< HEAD
            isLoading : true,
            allCheck : false,
        })
        
=======
            isLoading: true,
            allCheck: false,
        })

>>>>>>> mw
        this.state.requestType = 2;
        this._PushInfo();
    }

    render() {
<<<<<<< HEAD
        return (
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48, flexDirection : 'row'}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style = {{flex : 1}}></View>

                        {this.state.deleteMode == false ? <TouchableWithoutFeedback onPress = {() => {this.state.datas.length > 0 && this.setState({deleteMode : true, checks : this.state.checks.map((item,index) => false), allCheck : false})}}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgDelete} style = {{width : 24, height : 24, resizeMode : 'contain', marginRight : 20}}></Image>
                            </View>
                        </TouchableWithoutFeedback> 
                        : 
                        <View style = {{flexDirection : 'row', height : 40, alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}} onPress = {() => this.setState({deleteMode : false})}>취소</Text>
                            <TouchableWithoutFeedback onPress = {() => this._DeletePush()}>
                                <View style = {{height : 40, alignItems : 'center', justifyContent : 'center'}}>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#00000029', marginLeft : 20, marginRight : 20}}>삭제</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>}
                    </View>

                    <View style = {{marginTop : 12, paddingLeft : 20}}>
                        {this.state.deleteMode == false ? <Text style = {{fontSize : 20, fontFamily : 'KHNPHDotfR'}}>알림</Text> : <View style = {{flexDirection : 'row', alignItems : 'center', paddingLeft : 16}}><TouchableWithoutFeedback onPress = {() => this._AllCheckEvent()}>
                                    <View style = {{width : 24, height : 24}}>
                                        <Image source = {(this.state.allCheck == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24}}></Image>
                                    </View>
                                </TouchableWithoutFeedback>
                        <Text style = {{marginLeft : 7, fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000'}}>전체</Text></View>}
                    </View>
                    {this.state.datas.length > 0 ? <FlatList style = {{marginTop : 16, paddingRight : 20, paddingLeft : 20}} data = {this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem = {(obj) => {
                        return <View key = {obj.index} style = {{width : '100%', backgroundColor : '#fff', borderRadius : 24, paddingLeft : 20, paddingRight : 20, paddingTop : 16, paddingBottom : 16, marginTop : 16}}>
                                <TouchableWithoutFeedback>
                                <View style = {{flexDirection : this.state.deleteMode == false ? "column" : 'row', alignItems : this.state.deleteMode == false ? null : 'center'}}>
                                    {this.state.deleteMode && <TouchableWithoutFeedback onPress = {() => this._ChildCheckEvent(obj.index)}>
                                                                <Image source = {(this.state.checks[obj.index] == true) ? imgCheckTrue : imgCheckFalse} style = {{width : 24, height : 24, marginRight : 20}}></Image>
                                                            </TouchableWithoutFeedback>}
                                    <View>
                                        <View style = {{flexDirection : 'row'}}>
                                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>{obj.item.push_title}</Text>
                                            <View style = {{flex : 1}}></View>
                                            {this.state.deleteMode == false && <Text style = {{fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#AFAFAF'}}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>}
                                        </View>
                                        <View style = {{marginTop : 12}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', lineHeight : 24}}>{obj.item.push_contents}</Text>
                                        </View>
                                    </View>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                    }} onEndReached = {() => {this.state.datas.length < this.state.totalCnt && this._PushInfo()}}></FlatList> : <View style = {{marginTop : 120, alignItems : 'center', justifyContent : 'center'}}><Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#AFAFAF',}}>{"리스트가 존재하지않습니다."}</Text></View>}
                    
=======
        if (this.props.route.params != undefined) {
            if (this.props.route.params.push != undefined) {
                this.state.routePush = this.props.route.params.push;
            }
        }
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48, flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => this._goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ flex: 1 }}></View>

                        {this.state.deleteMode == false ? <TouchableWithoutFeedback onPress={() => { this.state.datas.length > 0 && this.setState({ deleteMode: true, checks: this.state.checks.map((item, index) => false), allCheck: false }) }}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgDelete} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 20 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                            :
                            <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }} onPress={() => this.setState({ deleteMode: false })}>취소</Text>
                                <TouchableWithoutFeedback onPress={() => this._DeletePush()}>
                                    <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#00000029', marginLeft: 20, marginRight: 20 }}>삭제</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>}
                    </View>

                    <View style={{ marginTop: 12, paddingLeft: 20 }}>
                        {this.state.deleteMode == false ? <Text style={{ fontSize: 20, fontFamily: 'KHNPHDotfR' }}>알림</Text> : <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}><TouchableWithoutFeedback onPress={() => this._AllCheckEvent()}>
                            <View style={{ width: 24, height: 24 }}>
                                <Image source={(this.state.allCheck == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                            <Text style={{ marginLeft: 7, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }}>전체</Text></View>}
                    </View>
                    {this.state.datas.length > 0 ? <FlatList style={{ marginTop: 16, paddingRight: 20, paddingLeft: 20 }} data={this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem={(obj) => {
                        return <View key={obj.index} style={{ width: '100%', backgroundColor: '#fff', borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, marginTop: 16 }}>
                            <TouchableWithoutFeedback>
                                <View style={{ flexDirection: this.state.deleteMode == false ? "column" : 'row', alignItems: this.state.deleteMode == false ? null : 'center' }}>
                                    {this.state.deleteMode && <TouchableWithoutFeedback onPress={() => this._ChildCheckEvent(obj.index)}>
                                        <Image source={(this.state.checks[obj.index] == true) ? imgCheckTrue : imgCheckFalse} style={{ width: 24, height: 24, marginRight: 20 }}></Image>
                                    </TouchableWithoutFeedback>}
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>{obj.item.push_title}</Text>
                                            <View style={{ flex: 1 }}></View>
                                            {this.state.deleteMode == false && <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#AFAFAF' }}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>}
                                        </View>
                                        <View style={{ marginTop: 12 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', lineHeight: 24 }}>{obj.item.push_contents}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    }} onEndReached={() => { this.state.datas.length < this.state.totalCnt && this._PushInfo() }}></FlatList> : <View style={{ marginTop: 120, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#AFAFAF', }}>{"리스트가 존재하지않습니다."}</Text></View>}

>>>>>>> mw
                </View>
            </SafeAreaView>
        )
    }
}