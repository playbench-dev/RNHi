import React from 'react';
import { SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, Modal, BackHandler, TouchableOpacity } from 'react-native';
import Elevations from 'react-native-elevation';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

const TAG = "HusbandInsert";
const imgBack = require('../assets/ic_back.png');

export default class HusbandInsert extends React.Component {
    constructor(props) {
        super(props);
        this.backAction = this.backAction.bind(this);
    }

    state = {
        husbandName: '',
        husbandPhone: '',
        userNo: '',
        userName: '',
        open: false,
        date: Moment(new Date()).format('YYYY-MM-DD'),
        husbandBirthday: '',
        birthDay: '',
        selected: false,
        autoLogin: false,
    }

    backAction() {
        if (this.state.autoLogin == true) {
            this._Logout();
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    _goBack() {
        if (this.state.autoLogin == true) {
            this._Logout();
        } else {
            this.props.navigation.goBack();
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
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

            });
        } else {
            console.log(TAG, 'no un : ' + Users.userName)
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _Logout() {
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
            'access_token': Users.AccessToken,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.logoutUrl, {
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
                AsyncStorage.clear();
                Users.userNo = '';
                Users.userName = '';
                Users.userBirthday = '';
                Users.userPhoneNumber = '';
                Users.paitentNo = '';
                Users.spouseName = '';
                Users.spousePhoneNumber = '';
                Users.userDirectDoctor = '';
                Users.guest = false;
                Users.provisionYN = 0;
                if (this.state.autoLogin == true) {
                    this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                } else {
                    this.props.navigation.goBack();
                }
            }
        )
    }

    _SpouseUpdate() {
        var details = {
            'user_no': Users.userNo,
            'spouse_name': this.state.husbandName,
            'spouse_phone': this.state.husbandPhone,
            'spouse_birth_date': this.state.husbandBirthday,
        };

        Users.spouseName = this.state.husbandName;
        Users.spousePhoneNumber = this.state.husbandPhone;

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.spouseUpdateUrl, {
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
                    if (Users.provisionYN == 0) {
                        this.props.navigation.navigate('ServiceAgree')
                    } else {
                        this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                    }
                } else {

                }
            }
        )
    }

    _DatePicker() {
        return (
            <Modal transparent={true} visible={this.state.open}>
                <View style={{ height: '100%', width: '100%', justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', }}>
                    <View style={{ height: 320, width: '90%', backgroundColor: "#fff", borderRadius: 12, justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 50, justifyContent: "center", alignItems: 'center', paddingTop: 10 }}>
                            <Text style={{ fontSize: 16, color: "#000", fontFamily: 'KHNPHDotfR' }}>생년월일</Text>
                        </View>
                        <View style={{ width: '100%', height: 216, justifyContent: "center", alignItems: 'center' }}>
                            <DatePicker
                                locale={"ko"}
                                mode="date"
                                open={true}
                                date={new Date()}
                                textColor={"#000000"}
                                onDateChange={(date) => {
                                    console.log('DatePicker', 'date : ' + date + ' moment : ' + Moment(date).format('yyyy-MM-DD'));
                                    this.state.birthDay = Moment(date).format('yyyy-MM-DD');
                                }}
                            />
                        </View>
                        <View style={{ width: '100%', height: 54, borderRadius: 12, flexDirection: 'row' }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ open: false })}>
                                <View style={{ flex: 1, borderBottomLeftRadius: 12, justifyContent: "center", alignItems: 'center', backgroundColor: '#9699D6' }}>
                                    <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'KHNPHDotfR' }}>취소</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({ open: false, selected: true })}>
                                <View style={{ flex: 1, borderBottomRightRadius: 12, justifyContent: "center", alignItems: 'center', backgroundColor: "#4A50CA", }}>
                                    <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'KHNPHDotfR' }}>확인</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    render() {
        if (this.props.route.params != undefined) {
            this.state.autoLogin = this.props.route.params.splash;
            console.log(TAG, "push : " + this.props.route.params.splash);
        }
        if (this.state.selected == true && this.state.birthDay.length == 0) {
            this.state.husbandBirthday = Moment(new Date()).format('yyyy-MM-DD');
            this.state.selected = false;
            this.state.birthDay = '';
        } else {
            this.state.husbandBirthday = this.state.birthDay;
            this.state.selected = false;
            this.state.birthDay = '';
        }

        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._DatePicker()}
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this._goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView style={{ width: '100%', height: '100%', }}>
                        <Text style={{ marginTop: 16, marginLeft: 24, fontSize: 16, fontFamily: 'KHNPHDotfB' }}>반갑습니다. {Users.userName + "님"}</Text>

                        <Text style={{ marginTop: 20, marginLeft: 24, fontSize: 14, fontFamily: 'KHNPHDotfR' }}>배우자분의 연락처를 입력하시면</Text>
                        <Text style={{ marginTop: 10, marginLeft: 24, fontSize: 14, fontFamily: 'KHNPHDotfR' }}>시술 진행과정을 함께 안내해드려요</Text>

                        <Text style={{ width: '100%', marginTop: 20, marginLeft: 32, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>배우자 성함</Text>
                        <View style={{ width: '100%', height: 52, paddingLeft: 32, paddingRight: 32, marginTop: 16 }}>
                            <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="배우자분의 성함을 입력해주세요." autoCapitalize="none" onChangeText={(value) => this.setState({ husbandName: value })}></TextInput>
                        </View>

                        <Text style={{ width: '100%', marginTop: 20, marginLeft: 32, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>전화번호</Text>
                        <View style={{ width: '100%', height: 52, paddingLeft: 32, paddingRight: 32, marginTop: 16 }}>
                            <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: 'black' }} placeholderTextColor="#d0d0d0" placeholder="배우자분의 전화번호를 -없이 입력해주세요." autoCapitalize="none" keyboardType={Platform.select({ android: "numeric" }, { ios: "number-pad" })} onChangeText={(value) => this.setState({ husbandPhone: value })}></TextInput>
                        </View>

                        <Text style={{ width: '100%', marginTop: 20, marginLeft: 32, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>생년월일</Text>
                        <TouchableOpacity onPress={() => this.setState({ open: true })}>
                            <View style={{ width: '100%', height: 52, paddingLeft: 32, paddingRight: 32, marginTop: 16 }}>
                                <TextInput style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 12, paddingLeft: 20, fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000' }} placeholderTextColor="#d0d0d0" placeholder="배우자분의 생년월일을 선택해주세요." editable={false} pointerEvents="none" defaultValue={this.state.husbandBirthday}></TextInput>
                            </View>
                        </TouchableOpacity>


                        <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 32 }}>
                            <TouchableWithoutFeedback onPress={() => this._SpouseUpdate()} disabled={(this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? false : true)}>
                                <View style={{ width: '100%', height: 64, backgroundColor: this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? '#4A50CA' : '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 32, ...Elevations[this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? 10 : 0] }}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'KHNPHDotfR' }}>다음</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{ width: '100%', height: 64, paddingLeft: 32, paddingRight: 32, marginTop: 21 }}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(Users.provisionYN == 0 ? 'ServiceAgree' : 'Home')}>
                                <View style={{ width: '100%', height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderWidth: 1, borderColor: '#4A50CA' }}>
                                    <Text style={{ fontSize: 16, color: '#4A50CA', fontFamily: 'KHNPHDotfB' }}>{"건너뛰기 >"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}