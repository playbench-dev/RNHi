import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, FlatList, BackHandler } from 'react-native';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import AsyncStorage from '@react-native-community/async-storage';

const TAG = "AdminAlarmList";
const imgBack = require('../assets/ic_calendar_back.png');
const imgDelete = require('../assets/ic_alarm_delete.png');
const imgCheckTrue = require('../assets/ic_check_true.png');
const imgCheckFalse = require('../assets/ic_check_false.png');

export default class AdminAlarmList extends React.Component {
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
                'user_no': this.props.route.params.userNo,
                'page_show_cnt': this.state.pageShowCnt,
                'page_no': this.state.pageNo,
            };
        } else if (this.state.requestType == 2) {
            url = ServerUrl.PushDeleteUrl;
            details = {
                'push_no': this.state.deletes,
                'user_no': this.props.route.params.userNo,
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
                                    survey: json.Resources[i].survey || '',
                                })
                                this.state.datas.push(obj);
                                this.state.checks.push(false);
                            }
                        }
                        this.setState({
                            totalCnt: json.Total,
                            isLoading: true,
                            pageNo: this.state.pageNo + 1,
                        })
                    } else if (this.state.requestType == 2) {
                        this.state.requestType = 1;
                    }
                } else {

                }
            }
        )
    }

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
        }
    }

    _ChildCheckEvent = value => {
        console.log(TAG, this.state.datas[value].push_no)
        this.state.checks = this.state.checks.map((item, index) => value == index ? (this.state.checks[index] == true ? false : true) : item);
        this.setState({
            allCheck: false,
        })
    }

    render() {
        if (this.props.route.params != undefined) {
            if (this.props.route.params.push != undefined) {
                this.state.routePush = this.props.route.params.push;
            }
        }
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableWithoutFeedback onPress={() => this._goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center', }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 40 }}>
                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR' }}>{this.props.route.params.userName + " " + this.props.route.params.patientNo}</Text>
                        </View>
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

                </View>
            </SafeAreaView>
        )
    }
}