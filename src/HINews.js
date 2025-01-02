import React from 'react'
<<<<<<< HEAD
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, FlatList} from 'react-native';
=======
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, FlatList } from 'react-native';
>>>>>>> mw
import Moment from 'moment'
const TAG = "HINews";
const imgBack = require('../assets/ic_back.png');

export default class HINews extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
<<<<<<< HEAD
        isLoading : false,
        datas : [],
        pagingNo : 1,
    }

    _NewsList(){
        
        fetch("https://www.hifertility.co.kr/api/notice?page="+this.state.pagingNo+"&pageSize=10",{
            method : 'GET',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode : 'cors',
            cache : 'default',
            body : null,
            }).then(
                response => response.json()  
            ).then(
                json => {
                  for(let i = 0; i < Object.keys(json.data).length; i++){
                    const obj = ({
                        boardUid : json.data[i].boardUid || '',
                        writeDate : json.data[i].writeDate || '', 
                        title : json.data[i].title || '', 
                        displayYn : json.data[i].displayYn || '', 
                        keywordCode : json.data[i].keywordCode || '',
                        keyword : json.data[i].keyword || '',
                        uplistImage : json.data[i].uplistImage || '',
                        hit : json.data[i].hit || '',
                        instDateTxt : json.data[i].instDateTxt || '',
                        updtDateTxt : json.data[i].updtDateTxt || '',
                    })
                    this.state.datas.push(obj);
                  }
                  this.setState({
                    isLoading : true,
                    pagingNo : this.state.pagingNo + 1,
                  })
=======
        isLoading: false,
        datas: [],
        pagingNo: 1,
    }

    _NewsList() {

        fetch("https://www.hifertility.co.kr/api/notice?page=" + this.state.pagingNo + "&pageSize=10", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default',
            body: null,
        }).then(
            response => response.json()
        ).then(
            json => {
                for (let i = 0; i < Object.keys(json.data).length; i++) {
                    const obj = ({
                        boardUid: json.data[i].boardUid || '',
                        writeDate: json.data[i].writeDate || '',
                        title: json.data[i].title || '',
                        displayYn: json.data[i].displayYn || '',
                        keywordCode: json.data[i].keywordCode || '',
                        keyword: json.data[i].keyword || '',
                        uplistImage: json.data[i].uplistImage || '',
                        hit: json.data[i].hit || '',
                        instDateTxt: json.data[i].instDateTxt || '',
                        updtDateTxt: json.data[i].updtDateTxt || '',
                    })
                    this.state.datas.push(obj);
                }
                this.setState({
                    isLoading: true,
                    pagingNo: this.state.pagingNo + 1,
                })
>>>>>>> mw
            }
        )
    }

<<<<<<< HEAD
    componentDidMount(){
=======
    componentDidMount() {
>>>>>>> mw
        this._NewsList();
    }

    render() {
        return (
            <SafeAreaView>
<<<<<<< HEAD
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
=======
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
                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12}}>{"HI 새소식"}</Text>

                    <FlatList style = {{paddingLeft : 20, paddingRight : 20, marginTop : 16}} data = {this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem = {(obj) => {
                        return <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AboutWebview',{tag : "news", num : obj.item.boardUid})}>
                                <View style = {{marginTop : obj.index == 0 ? 16 : 20, borderRadius : 24, backgroundColor : '#fff', paddingBottom : 20}}>
                                <View style = {{flex : 1,}}>
                                    <Image style = {{width :'100%', height : 248, borderTopLeftRadius : 24, borderTopRightRadius :24, flex : 1, resizeMode : 'cover',}} source = {{uri : "https://www.hifertility.co.kr" + obj.item.uplistImage}}></Image>
                                </View>
                                
                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : '#000', marginTop : 20, marginLeft : 20, marginRight : 20}}>{obj.item.title}</Text>
                                <View style = {{flexDirection : 'row', marginTop : 20}}>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#4A50CA', marginTop : 10, marginLeft : 20, textDecorationLine: 'underline', flex : 1}} >{obj.item.keyword}</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#AFAFAF', marginTop : 10, marginRight : 20}}>{obj.item.writeDate}</Text>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                            
                    }} onEndReached = {() => this._NewsList()}></FlatList>
=======
                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>{"HI 새소식"}</Text>

                    <FlatList style={{ paddingLeft: 20, paddingRight: 20, marginTop: 16 }} data={this.state.datas} keyExtractor={(item, index) => index.toString()} renderItem={(obj) => {
                        return <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AboutWebview', { tag: "news", num: obj.item.boardUid })}>
                            <View style={{ marginTop: obj.index == 0 ? 16 : 20, borderRadius: 24, backgroundColor: '#fff', paddingBottom: 20 }}>
                                <View style={{ flex: 1, }}>
                                    <Image style={{ width: '100%', height: 248, borderTopLeftRadius: 24, borderTopRightRadius: 24, flex: 1, resizeMode: 'cover', }} source={{ uri: "https://www.hifertility.co.kr" + obj.item.uplistImage }}></Image>
                                </View>

                                <Text style={{ fontSize: 16, fontFamily: 'KHNPHDotfR', color: '#000', marginTop: 20, marginLeft: 20, marginRight: 20 }}>{obj.item.title}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#4A50CA', marginTop: 10, marginLeft: 20, textDecorationLine: 'underline', flex: 1 }} >{obj.item.keyword}</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#AFAFAF', marginTop: 10, marginRight: 20 }}>{obj.item.writeDate}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    }} onEndReached={() => this._NewsList()}></FlatList>
>>>>>>> mw
                </View>
            </SafeAreaView>
        )
    }
}