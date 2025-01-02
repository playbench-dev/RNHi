import React from 'react';
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList, BackHandler } from 'react-native';
>>>>>>> mw
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import Moment from 'moment'

const TAG = "NoticeList";
const imgBack = require('../assets/ic_back.png');

export default class NoticeList extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
    }

    state = {
        noticeDatas : [],
        requestType : 1,
        pageShowCnt : 15,
        pageNo : 1,
    }

    componentDidMount(){
        this._NoticeList();
    }

    _NoticeList(){
        var details = null;
        var url = "";
    
        if(this.state.requestType == 1){
            url = ServerUrl.NoticeListUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'user_no' : Users.userNo,
                'page_show_cnt' : this.state.pageShowCnt,
                'page_no' : this.state.pageNo,
                'type' : 1,
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
                        for(let i = 0; i < Object.keys(json.Resources).length; i++){
                            if(json.Resources[i].alive_flag == 1){
                                const obj = ({
                                    contents : json.Resources[i].contents || '', 
                                    reg_date : json.Resources[i].reg_date || '', 
=======
        this.backAction = this.backAction.bind(this);
    }

    state = {
        noticeDatas: [],
        requestType: 1,
        pageShowCnt: 15,
        pageNo: 1,
        routePush: false,
    }

    backAction() {
        if (this.state.routePush == true) {
            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    componentDidMount() {
        this._NoticeList();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _NoticeList() {
        var details = null;
        var url = "";

        if (this.state.requestType == 1) {
            url = ServerUrl.NoticeListUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
                'page_show_cnt': this.state.pageShowCnt,
                'page_no': this.state.pageNo,
                'type': 1,
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
                        for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                            if (json.Resources[i].alive_flag == 1) {
                                const obj = ({
                                    contents: json.Resources[i].contents || '',
                                    reg_date: json.Resources[i].reg_date || '',
>>>>>>> mw
                                })
                                this.state.noticeDatas.push(obj);
                            }
                        }
                        this.setState({
<<<<<<< HEAD
                            isLoading : true,
                            pageNo : this.state.pageNo + 1,
                        })
                    }else if(this.state.requestType == 2){
                        this.state.requestType = 1;
                    }
                }else{
    
=======
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
<<<<<<< HEAD
        return (
            <SafeAreaView>
                <View style = {{width: '100%', height: '100%', backgroundColor: '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======

        if (this.props.route.params != undefined) {
            if (this.props.route.params.push != undefined) {
                this.state.routePush = this.props.route.params.push;
            }
        }

        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
>>>>>>> mw
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

<<<<<<< HEAD
                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12}}>공지사항</Text>

                    <FlatList style = {{marginTop : 16, paddingRight : 20, paddingLeft : 20}} data = {this.state.noticeDatas} keyExtractor={(item, index) => index.toString()} renderItem = {(obj) => {
                        return <View key = {obj.index} style = {{width : '100%', height : 110,backgroundColor : '#fff', borderRadius : 24, paddingLeft : 20, paddingRight : 20, paddingTop : 16, paddingBottom : 16, marginTop : 16}}>
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('NoticeDetail',{date : obj.item.reg_date, contents : obj.item.contents})}>
                                    <View>
                                        <View style = {{marginTop : 0}}>
                                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHUotfR', color : '#000', lineHeight : 25}} ellipsizeMode = "tail" numberOfLines = {2}>{obj.item.contents}</Text>
                                        </View>
                                        <View style = {{flexDirection : 'row',marginTop : 12}}>
                                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : '#000'}}>{}</Text>
                                            <View style = {{flex : 1}}></View>
                                            <Text style = {{fontSize : 12, fontFamily : 'KHNPHUotfR', color : '#AFAFAF'}}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                    }} onEndReached = {() => this._NoticeList()}></FlatList>
                </View>

                
=======
                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>공지사항</Text>

                    <FlatList style={{ marginTop: 16, paddingRight: 20, paddingLeft: 20 }} data={this.state.noticeDatas} keyExtractor={(item, index) => index.toString()} renderItem={(obj) => {
                        return <View key={obj.index} style={{ width: '100%', height: 110, backgroundColor: '#fff', borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, marginTop: 16 }}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('NoticeDetail', { date: obj.item.reg_date, contents: obj.item.contents })}>
                                <View>
                                    <View style={{ marginTop: 0 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'KHNPHUotfR', color: '#000', lineHeight: 25 }} ellipsizeMode="tail" numberOfLines={2}>{obj.item.contents}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000' }}>{ }</Text>
                                        <View style={{ flex: 1 }}></View>
                                        <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', color: '#AFAFAF' }}>{Moment(obj.item.reg_date).format('YYYY.MM.DD HH:mm')}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    }} onEndReached={() => this._NoticeList()}></FlatList>
                </View>


>>>>>>> mw
            </SafeAreaView>
        )
    }
}