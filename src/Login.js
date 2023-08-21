import React from 'react';
import { SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, Platform } from 'react-native';
import Elevations from 'react-native-elevation';
import AsyncStorage from '@react-native-community/async-storage';
import OneBtnDialog from './Common/OneBtnDialog'
import VersionInfo from 'react-native-version-info';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'

const TAG = "Login";
const imgLogo = require('../assets/img_login_logo.png');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        name: '',
        number: '',
        oneBtnDialogVisible: false,
    }

    _GuestLogin() {
        Users.guest = true;
        this.props.navigation.navigate('Home');
    }

    _Login() {
        var details = {
            'patient_no': this.state.number.trim(),
            'user_name': this.state.name.trim(),
            'token': Users.token,
            'os_type': (Platform.OS === 'android' ? 'android' : 'ios'),
            'app_version': (Platform.OS === 'android' ? VersionInfo.buildVersion : VersionInfo.appVersion)
        };

        var formBody = [];

        if (this.state.number.trim() == "1" && (this.state.name.trim() == "ad" || this.state.name.trim() == "Ad")) {
            AsyncStorage.setItem('userInfo', JSON.stringify({
                'user_name': this.state.name.trim(), 'patient_no': this.state.number.trim(),
            }), () => {

            });
            this.props.navigation.navigate('AdminUserSelect');
            return;
        }

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

                    // provision_yn == 0 일때 약관 동의 화면으로 이동
                    if (json.Resources[0].joined_date == null) {
                        this.props.navigation.navigate('HusbandInsert');
                    } else {
                        if (json.Resources[0].provision_yn == 0) {
                            this.props.navigation.navigate('ServiceAgree');
                        } else {
                            this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                        }
                    }
                } else {
                    this.setState({
                        oneBtnDialogVisible: true,
                    })
                }
            }
        )
    }

    _OneDialogVisible = value => {
        if (value != undefined) {
            this.setState({
                oneBtnDialogVisible: value.visible,
            })
        }
        if (this.state.oneBtnDialogVisible) {
            return <OneBtnDialog title={"로그인 실패"} contents={"이름 또는 환자 번호를 확인해주세요."} leftBtnText={"확인"} clcik={this._OneDialogVisible}></OneBtnDialog>
        } else {
            return null;
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._OneDialogVisible()}
                    <ScrollView style={{ width: '100%', height: '100%', }}>
                        <View style={{ width: '100%', height: 42.32, alignItems: 'center', justifyContent: 'center', marginTop: 58.84 }}>
                            <Image style={{ height: '100%', resizeMode: 'contain' }} source={imgLogo}></Image>
                        </View>

                        <Text style={{ width: '100%', marginTop: 60, marginLeft: 32, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>이름</Text>
                        <View style={{ width: '100%', height: 52, paddingLeft: 32, paddingRight: 32, marginTop: 16 }}>
                            <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: 'black', }} placeholderTextColor="#d0d0d0" placeholder="이름을 입력해주세요." autoCapitalize="none" onChangeText={(value) => this.setState({ name: value })}></TextInput>
                        </View>

                        <Text style={{ width: '100%', marginTop: 20, marginLeft: 32, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>등록번호</Text>
                        <View style={{ width: '100%', height: 52, paddingLeft: 32, paddingRight: 32, marginTop: 20 }}>
                            <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="등록 번호를 입력해주세요." autoCapitalize="none" keyboardType={Platform.select({ android: "numeric" }, { ios: "number-pad" })} onChangeText={(value) => this.setState({ number: value })}></TextInput>
                        </View>

                        <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 32 }}>
                            <TouchableWithoutFeedback onPress={() => this._Login()} disabled={(this.state.name.length > 0 && this.state.number.length > 0 ? false : true)}>
                                <View style={{ width: '100%', height: 64, backgroundColor: this.state.name.length > 0 && this.state.number.length > 0 ? '#4A50CA' : '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 32, ...Elevations[this.state.name.length > 0 && this.state.number.length > 0 ? 10 : 0] }}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'KHNPHDotfR' }}>로그인</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{ marginTop: 38, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', paddingLeft: 32, paddingRight: 32 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#E6E6E6' }}></View>
                            <Text style={{ marginLeft: 16, marginRight: 16, fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR' }}>OR</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#E6E6E6' }}></View>
                        </View>

                        <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 68 }}>
                            <TouchableWithoutFeedback onPress={() => this._GuestLogin()}>
                                <View style={{ width: '100%', height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderWidth: 1, borderColor: '#4A50CA' }}>
                                    <Text style={{ fontSize: 16, color: '#4A50CA', fontFamily: 'KHNPHDotfR' }}>게스트 로그인</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 16 }}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AboutWebview', { tag: 'loginStatusChart' })}>
                                <View style={{ width: '100%', height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderWidth: 1, borderColor: '#AF8BB7' }}>
                                    <Text style={{ fontSize: 16, color: '#AF8BB7', fontFamily: 'KHNPHDotfR' }}>초진문진표 작성하기(첫 방문)</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}