import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'

const TAG = "AlarmSetting";
const imgBack = require('../assets/ic_back.png');

export default class AlarmSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: false,
        pushAlarm: false,
        kakaoAlarm: false,
        requestType: 1,
    }

    _PushUpdate() {
        var details = null;
        var url = "";

        console.log(TAG, 'push : ' + this.state.pushAlarm);
        console.log(TAG, 'push : ' + this.state.kakaoAlarm);

        if (this.state.requestType == 1) {
            url = ServerUrl.PushUpdateUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
                'use_push': (this.state.pushAlarm == true ? '1' : '0'),
                'kakao_push': (this.state.kakaoAlarm == true ? '1' : '0'),
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
                    console.log(TAG, '0000');
                    Users.userPush = this.state.pushAlarm;
                    Users.kakaoPush = this.state.kakaoAlarm;
                    this.setState({
                        isLoading: true,
                    })
                } else {

                }
            }
        )
    }

    _PushClick(value) {
        console.log(TAG, value);
        if (value == 1) {
            if (this.state.pushAlarm == true) {
                this.state.pushAlarm = false
            } else {
                this.state.pushAlarm = true
            }

        } else {
            if (this.state.kakaoAlarm == true) {
                this.state.kakaoAlarm = false
            } else {
                this.state.kakaoAlarm = true
            }
        }
        this._PushUpdate();
    }

    render() {
        if (Users.userPush == '1') {
            this.state.pushAlarm = true;
        } else {
            this.state.pushAlarm = false;
        }
        if (Users.kakaoPush == '1') {
            this.state.kakaoAlarm = true;
        } else {
            this.state.kakaoAlarm = false;
        }

        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>

                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>알림설정</Text>

                    <View style={{ marginTop: 32, paddingLeft: 20, paddingRight: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this._PushClick(1)}>
                            <View style={{ borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"푸시 알림"}</Text>
                                <SwitchToggle switchOn={this.state.pushAlarm} onPress={() => this._PushClick(1)}
                                    circleColorOff='#C6C7E0' circleColorOn='#4A50CA' backgroundColorOn="#9699D6" backgroundColorOff="#D5D6E2"
                                    containerStyle={{ width: 33, height: 10, borderRadius: 25, }}
                                    circleStyle={{ width: 20, height: 20, borderRadius: 20, }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => this._PushClick(2)}>
                            <View style={{ marginTop: 16, borderRadius: 24, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, flexDirection: 'row', width: '100%', height: 76, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfB', color: '#000', flex: 1, }}>{"카카오 알림"}</Text>
                                <SwitchToggle switchOn={this.state.kakaoAlarm} onPress={() => this._PushClick(2)}
                                    circleColorOff='#C6C7E0' circleColorOn='#4A50CA' backgroundColorOn="#9699D6" backgroundColorOff="#D5D6E2"
                                    containerStyle={{ width: 33, height: 10, borderRadius: 25, }}
                                    circleStyle={{ width: 20, height: 20, borderRadius: 20, }} />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
