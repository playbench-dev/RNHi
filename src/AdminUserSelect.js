import React from 'react'
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, FlatList,TouchableOpacity} from 'react-native';
import ServerUrl from './Common/ServerUrl'

const imgBack = require('../assets/ic_back.png');
const imgSearch = require('../assets/ic_search.png');
const imgUser = require('../assets/ic_user.png')
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import ServerUrl from './Common/ServerUrl'
import Elevations from 'react-native-elevation';
import AsyncStorage from '@react-native-community/async-storage';
import AdminSelectViewDialog from './Common/AdminSelectViewDialog'
const imgBack = require('../assets/ic_back.png');
const imgSearch = require('../assets/ic_search.png');
const imgUser = require('../assets/ic_user.png')
const imgLogo = require('../assets/ic_main_logo.png');
>>>>>>> mw
const TAG = "AdminUserSelect";

export default class AdminUserSelect extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
    }
    state = {
        datas : [],
        textSearch : '',
        isLoading : false,
        pageNo : 1,
        totalCnt : 0,
    }

    componentDidMount(){
        this._UserList();
    }

    _UserList(){
        var details = {
            searchText : this.state.textSearch, // 검색문자열
            page_no : this.state.pageNo, // 시작번호
            page_show_cnt : 8 // 페이지당 내용 갯수
        };
        
        var formBody = [];
    
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
    
        formBody = formBody.join("&");
        
        fetch(ServerUrl.UserList,{
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
                  console.log(json.Resources.length)
                  if(json.Error_Cd == "0000"){
                    for(let i = 0; i < json.Resources.length; i++){
                        const obj = {
                            userNo : json.Resources[i].user_no || '',
                            userName : json.Resources[i].user_name || '',
                            userPhone : json.Resources[i].phone_num || '',
                            userPatientNo : json.Resources[i].patient_no || '',
                            userBirth : json.Resources[i].birth_date || '',
                        }
                        this.state.datas.push(obj);
                      }
                      this.setState({
                          isLoading : true,
                          pageNo : this.state.pageNo + 1,
                          totalCnt : json.Total,
                      })
                  }
=======
        this.backAction = this.backAction.bind(this);
    }
    state = {
        datas: [],
        textSearch: '',
        isLoading: false,
        pageNo: 1,
        totalCnt: 0,
        isDialogVisible: false,
        selectUserNo: '',
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this._UserList();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    _UserList() {
        var details = {
            searchText: this.state.textSearch, // 검색문자열
            page_no: this.state.pageNo, // 시작번호
            page_show_cnt: 14 // 페이지당 내용 갯수
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.UserList, {
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
                console.log(json.Resources.length)
                if (json.Error_Cd == "0000") {
                    for (let i = 0; i < json.Resources.length; i++) {
                        const obj = {
                            userNo: json.Resources[i].user_no || '',
                            userName: json.Resources[i].user_name || '',
                            userPhone: json.Resources[i].phone_num || '',
                            userPatientNo: json.Resources[i].patient_no || '',
                            userBirth: json.Resources[i].birth_date || '',
                        }
                        this.state.datas.push(obj);
                    }
                    this.setState({
                        isLoading: true,
                        pageNo: this.state.pageNo + 1,
                        totalCnt: json.Total,
                    })
                }
>>>>>>> mw
            }
        )
    }

<<<<<<< HEAD
    searchSubmit(){
        console.log(TAG,this.state.textSearch)
        this.state.datas = [];
        this._UserList();
    }

    render(){
        if(this.state.datas.length > 0){
            console.log(this.state.datas[0].userNo)
        }
        
        return(
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
    searchSubmit() {
        console.log(TAG, this.state.textSearch)
        this.state.datas = [];
        this.state.pageNo = 1;
        this._UserList();
    }

    backAction() {
        AsyncStorage.clear();
        this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return true;
    };

    _goBack() {
        AsyncStorage.clear();
        this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    _CategorySelectDialog = value => {
        console.log(`value : ${this.state.selectUserNo}`)
        if (value != undefined) {
            this.setState({
                isDialogVisible: value.visible,
            })
            console.log(`value : ${value.status}`)
            if (value.status == "약") {
                this.props.navigation.navigate('AdminMedicineCalendar', { userNo: this.state.selectUserNo })
            } else if (value.status == "배아") {
                this.props.navigation.navigate('AdminCellDevelop', { userNo: this.state.selectUserNo })
            } else if (value.status == "알림") {
                this.props.navigation.navigate('AdminAlarmList', { userNo: this.state.selectUserNo })
            } else if (value.status == "카카오") {
                this.props.navigation.navigate('AdminKakaoList', { userNo: this.state.selectUserNo })
            }
        }
        if (this.state.isDialogVisible) {
            return <AdminSelectViewDialog leftBtnText={"취소"} clcik={this._CategorySelectDialog}></AdminSelectViewDialog>
        } else {
            return null;
        }
    }

    _ChartCheck(name, phone, birth, patientNo) {
        var details = {
            'name': name,
            'phone': phone,
            'birthDate': birth,
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.Server + "/userApi/select-checkup-list", {
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
                    // console.log(Users.userName,)
                    if (Object.keys(json.Resources).length > 0) {
                        this.props.navigation.navigate('AboutWebview', { tag: 'adminChart', url: ServerUrl.Server + '/MedicalExamIndex?patient_no=' + patientNo })
                    } else {
                        this.props.navigation.navigate('AboutWebview', { tag: 'adminChart', url: ServerUrl.Server + '/ValidateUserIndex' })
                    }
                } else {
                    this.setState({
                        isLoading: true,
                    })
                }
            }
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._CategorySelectDialog()}
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this._goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
>>>>>>> mw
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

<<<<<<< HEAD
                    <View style = {{paddingLeft : 20, paddingRight : 20, marginTop : 4}}>
                        <View style = {{borderRadius : 24, borderWidth : 1, borderColor : '#4A50CA', height : 45, alignItems : 'center', flexDirection : 'row', }}>
                            <Image source = {imgSearch} style = {{width : 24, height : 24, marginLeft : 12,}} resizeMode = "contain"></Image>
                            <TextInput style = {{flex : 1, marginLeft : 12, }} placeholder = '이름, 환자번호를 입력해주세요.' returnKeyType='search' onSubmitEditing={() => this.searchSubmit()} onChangeText = {(value) => this.setState({textSearch : value,})}></TextInput>
                        </View>
                    </View>

                    <FlatList style = {{flex : 1, marginTop : 12, paddingLeft : 20, paddingRight : 20}} data = {this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem = {(obj)=> (
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('AdminMedicineCalendar',{userNo : obj.item.userNo})}>
                            <View style = {{borderRadius : 12, backgroundColor : '#fff', height : 75, marginTop : 12, flexDirection : 'row', alignItems : 'center', paddingLeft : 12, paddingRight : 12}}>
                                <Image style = {{width : 44, height : 44, resizeMode : 'contain',}} source = {imgUser}></Image>
                                <View style = {{flex : 1, marginLeft : 12, justifyContent : 'center', alignItems : 'center',}}>
                                    <View style = {{flexDirection : 'row', alignItems : 'center',}}>
                                        <View style = {{flex : 1}}>
                                            <Text>{"이름 : " + obj.item.userName}</Text>
                                        </View>
                                    </View>
                                    <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                        <View style = {{flex : 1}}>
                                            <Text>{"환자번호 : " + obj.item.userPatientNo}</Text>
                                        </View>
                                    </View>
                                    <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                        <View style = {{flex : 1}}>
=======
                    <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 4 }}>
                        <View style={{ borderRadius: 24, borderWidth: 1, borderColor: '#4A50CA', height: 45, alignItems: 'center', flexDirection: 'row', }}>
                            <Image source={imgSearch} style={{ width: 24, height: 24, marginLeft: 12, }} resizeMode="contain"></Image>
                            <TextInput style={{ flex: 1, marginLeft: 12, color: 'black' }} placeholderTextColor="#d0d0d0" placeholder='이름, 환자번호를 입력해주세요.' returnKeyType='search' onSubmitEditing={() => this.searchSubmit()} onChangeText={(value) => this.setState({ textSearch: value, })}></TextInput>
                        </View>
                    </View>

                    <FlatList style={{ flex: 1, marginTop: 12, paddingLeft: 20, paddingRight: 20 }} data={this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem={(obj) => (
                        // <TouchableOpacity onPress={() => this.setState({selectUserNo: obj.item.userNo })}>
                        <View style={{ borderRadius: 12, backgroundColor: '#fff', height: 75, marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 12 }}>
                            <View style={{ width: 44, height: 44, backgroundColor: '#fff', borderRadius: 22, alignItems: 'center', justifyContent: 'center', ...Elevations[3] }}>
                                <Image style={{ width: 33, height: 33, resizeMode: 'contain', }} source={imgLogo}></Image>
                            </View>

                            <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>{"이름 : " + obj.item.userName}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text>{"환자번호 : " + obj.item.userPatientNo}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
>>>>>>> mw
                                            <Text>{"전화번호 : " + obj.item.userPhone}</Text>
                                        </View>
                                    </View>
                                </View>
<<<<<<< HEAD
                            </View>
                        </TouchableOpacity>
                        
                    )} onEndReached = {() => {this.state.datas.length < this.state.totalCnt && this._UserList()}}></FlatList>
=======

                                <View style={{ flexDirection: 'row', marginLeft: 12, alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => this._ChartCheck(obj.item.userName, obj.item.userPhone, obj.item.userBirth, obj.item.userPatientNo)}>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: "#AF8BB7", height: 40 }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#000",
                                                fontFamily: 'KHNPHDotfR',
                                            }}>문진표</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AdminMedicineCalendar', { userNo: obj.item.userNo, userName: obj.item.userName, patientNo: obj.item.userPatientNo })}>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: "#EDA5CA", height: 40, marginLeft: 14, }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#000",
                                                fontFamily: 'KHNPHDotfR',
                                            }}>주사</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AdminKakaoList', { userNo: obj.item.userNo, userName: obj.item.userName, patientNo: obj.item.userPatientNo })}>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: "#FAE101", marginLeft: 14, height: 40 }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#000",
                                                fontFamily: 'KHNPHDotfR',
                                            }}>알림톡</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AdminCellDevelop', { userNo: obj.item.userNo, userName: obj.item.userName, patientNo: obj.item.userPatientNo })}>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: "#673AB7", marginLeft: 14, height: 40 }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#000",
                                                fontFamily: 'KHNPHDotfR',
                                            }}>배아</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AdminAlarmList', { userNo: obj.item.userNo, userName: obj.item.userName, patientNo: obj.item.userPatientNo })}>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: "#548235", marginLeft: 14, height: 40 }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: "#000",
                                                fontFamily: 'KHNPHDotfR',
                                            }}>푸시</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>
                            </ScrollView>

                        </View>
                        // </TouchableOpacity>

                    )} onEndReached={() => { this.state.datas.length < this.state.totalCnt && this._UserList() }}></FlatList>
>>>>>>> mw
                </View>
            </SafeAreaView>
        )
    }
}