import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import Elevations from 'react-native-elevation';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import OneBtnDialog from './Common/OneBtnDialog'

const TAG = "Inquire";
const imgBack = require('../assets/ic_back.png');
const imgCheckOff = require('../assets/ic_inquire_check_off.png');
const imgCheckOn = require('../assets/ic_inquire_check_on.png');

export default class Inquire extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        type: 1,
        email: '',
        contents: '',
        oneBtnDialogVisible: false,
    }

    _Inquiry() {
        var details = {
            'user_no': Users.userNo,
            'email': this.state.email,
            'ir_type': this.state.type,
            'contents': this.state.contents,
            'access_token': Users.AccessToken,
            'refresh_token': Users.RefreshToken,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.InquiryUrl, {
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
                    this.setState({ oneBtnDialogVisible: true });
                } else {

                }
            }
        )
    }

    _OneDialogVisible = value => {
        if (value != undefined) {
            this.setState({
                oneBtnDialogVisible: value.visible,
            })
            this.props.navigation.goBack();
        }
        if (this.state.oneBtnDialogVisible) {
            return <OneBtnDialog title={this.state.type == 1 ? "문의" : "신고"} contents={this.state.type == 1 ? "문의내용이 접수되었습니다." : "신고내용이 접수되었습니다."} leftBtnText={"확인"} clcik={this._OneDialogVisible}></OneBtnDialog>
        } else {
            return null;
        }
    }

    render() {
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

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>{this.state.type == 1 ? "문의하기" : "신고하기"}</Text>

                    <ScrollView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                        <View style={{ marginTop: 32, borderRadius: 12, backgroundColor: "#fff", height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ type: 1 })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 16, height: 16, resizeMode: 'contain', }} source={this.state.type == 1 ? imgCheckOn : imgCheckOff}></Image>
                                    <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 14, color: '#4A50CA', marginLeft: 8 }}>문의</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={{ width: 1, height: 18, backgroundColor: "#4A50CA", }}></View>

                            <TouchableWithoutFeedback onPress={() => this.setState({ type: 2 })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 16, height: 16, resizeMode: 'contain', }} source={this.state.type == 2 ? imgCheckOn : imgCheckOff}></Image>
                                    <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 14, color: '#4A50CA', marginLeft: 8 }}>신고</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 14, marginTop: 44 }}>답변 받으실 이메일</Text>

                        <View style={{ width: '100%', height: 52, marginTop: 16 }}>
                            <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="이메일 주소를 입력해주세요." autoCapitalize="none" onChangeText={(value) => this.setState({ email: value })}></TextInput>
                        </View>

                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 14, marginTop: 20 }}>{this.state.type == 1 ? "문의내용" : "신고내용"}</Text>

                        <View style={{ width: '100%', height: 180, marginTop: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, }}>
                            <TextInput style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHUotfR', textAlignVertical: 'top', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="내용을 입력해주세요." autoCapitalize="none" multiline={true} onChangeText={(value) => this.setState({ contents: value })} maxLength={2000}></TextInput>
                            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', fontSize: 12, color: '#D5D5D5' }}>{"(" + this.state.contents.length + "/2000)"}</Text>
                            </View>
                        </View>

                        <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 14, marginTop: 28, lineHeight: 24, marginBottom: 24 }}>{"앱 사용시 궁금한 점을 " + (this.state.type == 1 ? "문의" : "신고") + "하실 수 있습니다.\n(진료 및 예약에 관련한 문의는 전화 또는 카카오톡으로\n하실 수 있습니다.)"}</Text>

                    </ScrollView>

                    <View style={{ width: '100%', height: 64, paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
                        <TouchableWithoutFeedback onPress={() => this._Inquiry()}>
                            <View style={{ width: '100%', height: 64, borderRadius: 32, backgroundColor: '#4A50CA', ...Elevations[5], alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'KHNPHDotfR', fontSize: 16, color: '#fff', }}>완료</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}