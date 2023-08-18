import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
>>>>>>> mw
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'

const TAG = "KakaoAlarmList";
const imgBack = require('../assets/ic_calendar_back.png');

<<<<<<< HEAD
export default class KakaoAlarmList extends React.Component{
    constructor(props){
=======
export default class KakaoAlarmList extends React.Component {
    constructor(props) {
>>>>>>> mw
        super(props);
    }

    state = {
<<<<<<< HEAD
        datas : [],
        isLoading : false,
        requestType : 1,
        pageShowCnt : 10,
        pageNo : 1,
        totalCnt : 0,
    }

    componentDidMount(){
        if(this.state.isLoading === false){
            console.log(TAG,'isLoading : ' + this.state.isLoading);
=======
        datas: [],
        isLoading: false,
        requestType: 1,
        pageShowCnt: 14,
        pageNo: 1,
        totalCnt: 0,
    }

    componentDidMount() {
        if (this.state.isLoading === false) {
            console.log(TAG, 'isLoading : ' + this.state.isLoading);
>>>>>>> mw
            this._PushInfo();
        }
    }

<<<<<<< HEAD
    _PushInfo(){
        var details = null;
        var url = "";
    
        if(this.state.requestType == 1){
            url = ServerUrl.KakaoListUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'user_no' : Users.userNo,
                'page_show_cnt' : this.state.pageShowCnt,
                'page_no' : this.state.pageNo,
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
                                    kakao_contents : json.Resources[i].kakao_contents || '', 
                                    kakao_no : json.Resources[i].kakao_no || '',
                                    kakao_type : json.Resources[i].kakao_type || '',
                                    reg_date : json.Resources[i].reg_date || '', 
=======
    _PushInfo() {
        var details = null;
        var url = "";

        if (this.state.requestType == 1) {
            url = ServerUrl.KakaoListUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
                'page_show_cnt': this.state.pageShowCnt,
                'page_no': this.state.pageNo,
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
                                    kakao_contents: json.Resources[i].kakao_contents || '',
                                    kakao_no: json.Resources[i].kakao_no || '',
                                    kakao_type: json.Resources[i].kakao_type || '',
                                    reg_date: json.Resources[i].reg_date || '',
>>>>>>> mw
                                })
                                this.state.datas.push(obj);
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

    render() {
        return (
            <SafeAreaView>
<<<<<<< HEAD
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48, flexDirection : 'row'}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48, flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
>>>>>>> mw
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

<<<<<<< HEAD
                    <View style = {{marginTop : 12, paddingLeft : 20}}>
                        <Text style = {{fontSize : 20, fontFamily : 'KHNPHDotfR'}}>카카오 알림</Text> 
                    </View>

                    {this.state.datas.length > 0 ? <FlatList style = {{marginTop : 16, paddingRight : 20, paddingLeft : 20}} data = {this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem = {(obj) => {
                        return <View key = {obj.index} style = {{width : '100%', backgroundColor : '#fff', borderRadius : 24, paddingLeft : 20, paddingRight : 20, paddingTop : 16, paddingBottom : 16, marginTop : 16}}>
                                <TouchableWithoutFeedback>
                                <View style = {{flexDirection : "column", alignItems : null}}>
                                    <View>
                                        <View style = {{flexDirection : 'row'}}>
                                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>{""}</Text>
                                            <View style = {{flex : 1}}></View>
                                            <Text style = {{fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#AFAFAF'}}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>
                                        </View>
                                        <View style = {{marginTop : 12}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000', lineHeight : 24}}>{obj.item.kakao_contents}</Text>
                                        </View>
                                    </View>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                    }} onEndReached = {() => {this.state.datas.length < this.state.totalCnt && this._PushInfo()}}></FlatList> : <View style = {{marginTop : 120, alignItems : 'center', justifyContent : 'center'}}><Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#AFAFAF',}}>{"리스트가 존재하지않습니다."}</Text></View>}
=======
                    <View style={{ marginTop: 12, paddingLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'KHNPHDotfR' }}>카카오 알림</Text>
                    </View>

                    {this.state.datas.length > 0 ? <FlatList style={{ marginTop: 16, paddingRight: 20, paddingLeft: 20 }} data={this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem={(obj) => {
                        return <View key={obj.index} style={{ width: '100%', backgroundColor: '#fff', borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, marginTop: 16 }}>
                            <TouchableWithoutFeedback>
                                <View style={{ flexDirection: "column", alignItems: null }}>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>{""}</Text>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#AFAFAF' }}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>
                                        </View>
                                        <View style={{ marginTop: 12 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', lineHeight: 24 }}>{obj.item.kakao_contents}</Text>
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