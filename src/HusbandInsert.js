import React from 'react';
import {SafeAreaView, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Elevations from 'react-native-elevation';
import Users from './Common/User'
import ServerUrl from './Common/ServerUrl'

const TAG = "HusbandInsert";
const imgBack = require('../assets/ic_back.png');

export default class HusbandInsert extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        husbandName : '',
        husbandPhone : '',
    }

    _SpouseUpdate(){
        var details = {
            'user_no' : Users.userNo,
            'spouse_name' : this.state.husbandName,
            'spouse_phone' : this.state.husbandPhone,
        };
        
        var formBody = [];
  
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
  
        formBody = formBody.join("&");
        
        fetch(ServerUrl.spouseUpdateUrl,{
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
                    if(Users.provisionYN == 0){
                        this.props.navigation.navigate('ServiceAgree')
                    }else{
                        this.props.navigation.reset({index:0, routes:[{name: 'Home'}]})
                    }
                }else{

                }
            }
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView style = {{width : '100%', height : '100%',}}>
                        <Text style = {{marginTop : 16, marginLeft : 24, fontSize : 16, fontFamily : 'KHNPHDotfB'}}>반갑습니다. {Users.userName+"님"}</Text>

                        <Text style = {{marginTop : 20, marginLeft : 24, fontSize : 14, fontFamily : 'KHNPHDotfR'}}>배우자분의 연락처를 입력하시면</Text>
                        <Text style = {{marginTop : 10, marginLeft : 24, fontSize : 14, fontFamily : 'KHNPHDotfR'}}>시술 진행과정을 함께 안내해드려요</Text>

                        <Text style = {{width : '100%', marginTop : 20, marginLeft : 32, fontSize : 14, fontFamily : 'KHNPHDotfB'}}>배우자 성함</Text>
                        <View style = {{width : '100%', height : 52, paddingLeft : 32, paddingRight : 32, marginTop : 16}}>
                            <TextInput style = {{width : '100%', height : '100%', backgroundColor : '#fff', borderRadius : 12, paddingLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR',}} placeholder="배우자분의 성함을 입력해주세요." autoCapitalize = "none" onChangeText = {(value) => this.setState({husbandName : value})}></TextInput>
                        </View>

                        <Text style = {{width : '100%', marginTop : 20, marginLeft : 32, fontSize : 14, fontFamily : 'KHNPHDotfB'}}>전화번호</Text>
                        <View style = {{width : '100%', height : 52, paddingLeft : 32, paddingRight : 32, marginTop : 16}}>
                            <TextInput style = {{width : '100%', height : '100%', backgroundColor : '#fff', borderRadius : 12, paddingLeft : 20, fontSize : 14, fontFamily : 'KHNPHUotfR'}} placeholder="배우자분의 전화번호를 -없이 입력해주세요." autoCapitalize = "none" keyboardType={Platform.select({android : "numeric"}, {ios : "number-pad"})} onChangeText = {(value) => this.setState({husbandPhone : value})}></TextInput>
                        </View>

                        <View style = {{width: '100%', height : 64, paddingLeft : 32, paddingRight : 32, marginTop : 32 }}>
                            <TouchableWithoutFeedback onPress = {() => this._SpouseUpdate()} disabled = {(this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? false : true)}>
                                <View style = {{width: '100%', height : 64, backgroundColor : this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? '#4A50CA' : '#E6E6E6', alignItems : 'center', justifyContent : 'center', borderRadius : 32, ...Elevations[this.state.husbandName.length > 0 && this.state.husbandPhone.length > 0 ? 10 : 0]}}>
                                    <Text style = {{fontSize : 16, color : '#fff', fontFamily : 'KHNPHDotfR'}}>다음</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style = {{width: '100%', height : 64, paddingLeft : 32, paddingRight : 32, marginTop : 121 }}>
                            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate(Users.provisionYN == 0 ? 'ServiceAgree' : 'Home')}>
                                <View style = {{width: '100%', height : 64, alignItems : 'center', justifyContent : 'center', borderRadius : 32, borderWidth : 1, borderColor : '#4A50CA'}}>
                                    <Text style = {{fontSize : 16, color : '#4A50CA', fontFamily : 'KHNPHDotfB'}}>{"건너뛰기 >"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}