import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet,TouchableWithoutFeedback, Dimensions, Modal, BackHandler,Animated,Easing} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Elevations from 'react-native-elevation';
import Carousel ,{ ParallaxImage } from 'react-native-snap-carousel';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import CellDevelopDialog from './Common/CellDevelopDialog'
import PageList from "react-native-page-list";
import RNAnimated from 'react-native-animated-component'

const TAG = "CellDevelop";
const imgBack = require('../assets/ic_back.png');
const imgTest = require('../assets/ic_main_hi_business.png');
const imgArrow = require('../assets/ic_main_right_arrow.png');
const { width: screenWidth } = Dimensions.get('window')
const imgClose = require('../assets/ic_calendar_back.png');

export default class CellDevelop extends React.Component{
    constructor(props){
        super(props)
        this.backAction = this.backAction.bind(this);
        this.btn = React.createRef();
        this.animationOne = new Animated.Value(0);
        this.widthAnimation = new Animated.Value(24);
        this.interpolateBar = this.animationOne.interpolate({inputRange:[0,1],outputRange:['100%','30%']})
    }

    

    handleOneAnimation = () => {
        Animated.timing(this.animationOne,{
            toValue : 1,
            duration : 200,
            easing : Easing.ease,
            useNativeDriver: false
        }).start()
        Animated.timing(this.widthAnimation,{
            toValue : 50,
            duration : 200,
            easing : Easing.ease,
            useNativeDriver: false
        }).start()
    }

    state = {
        selected : 1,
        clickItemPosition : 0,
        datas : [],
        requestType : 1,
        isLoading : false,

        chartDatas : [],
        oneBtnDialogVisible : false,
        selectedChartText : '',
        selectPosition : 0,
        catchDate : '',
        totalOpu : 0,
        ivfNo : 0,
        ivf2PN : 0,
        icsiNo : 0,
        icsi2PN : 0,
        dIvfNo : 0,
        dIvf2PN : 0,
        dIcsiNo : 0,
        dIcsi2PN : 0,
        imgMagnify : false,
        fertilication : [],
        cryo : [],
        cryo2 : [],
        lastFertilisationPosition : 0, 
        routePush : false,
        animation : false,
        testList : ['','','','',''],
        
    }

    styles = StyleSheet.create({
        labelSt : {
            height : 40,
            alignItems : 'center', 
            justifyContent : 'center',
            alignSelf : 'center',
            textAlignVertical : 'center',
            fontSize : 14,
            color : "#000",
            fontFamily : 'KHNPHDotfR',
        },
        containerSt : {
            height : 40,
            alignItems : 'center', 
            justifyContent : 'center',
        }
    })

    componentDidMount(){
        if(this.state.isLoading == false){
            this._IVFInfo();
        }
        BackHandler.addEventListener("hardwareBackPress",this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    backAction(){
        console.log(TAG,'aaasdas');
        if(this.state.imgMagnify == true){
            this.setState({imgMagnify:false});
        }else{
            if(this.state.routePush == true){
                this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
            }else{
                this.props.navigation.goBack();
            }
        }
        return true;
    };

    _goBack(){
        if(this.state.routePush == true){
            this.props.navigation.reset({index:0, routes:[{name: 'Home'}]});
        }else{
            this.props.navigation.goBack();
        }
    }
    
    _IVFInfo(){
        var details = null;
        var url = "";
    
        if(this.state.requestType == 1){
            url = ServerUrl.IVFListUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'user_no' : Users.userNo,
            };
        }else if(this.state.requestType == 2){
            url = ServerUrl.IVFDetailUrl;
            details = {
                'access_token' : Users.AccessToken,
                'refresh_token' : Users.RefreshToken,
                'chart_no' : this.state.chartDatas[this.state.selectPosition].value,
                'user_no' : Users.userNo,
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
                        this.state.chartDatas = [];

                        for(let i = Object.keys(json.Resources).length-1; i >= 0; i--){
                            const obj = ({
                                id : ''+i,
                                label : this._DegreeMake(json.Resources[i].chart_type || '', json.Resources[i].degree), 
                                value : json.Resources[i].chart_no || '',
                                })
                                this.state.chartDatas.push(obj);
                        }
                        this.state.requestType = 2;
                        this.state.selectedChartText = this.state.chartDatas[0].label;
                        this.setState({
                            isLoading : true,
                        })
                        this._IVFInfo();
                    }else if(this.state.requestType == 2){
                        this.state.datas = [];
                        this.state.fertilication = [];
                        this.state.cryo = [];
                        this.state.cryo2 = [];
                        for(let i = 0; i < Object.keys(json.Resources).length; i++){
                            console.log(TAG,json.Resources[i].Cryo);
                            console.log(TAG,json.Resources[i].Fertilization);
                            this.state.catchDate = json.Resources[i].OPU_date;
                            this.state.totalOpu = (parseInt(json.Resources[i].OPU_L) + parseInt(json.Resources[i].OPU_R))|| '0';
                            this.state.ivfNo = json.Resources[i].IVF_No || '0';
                            this.state.ivf2PN = json.Resources[i].IVF_2PN|| '0';
                            this.state.icsiNo = json.Resources[i].ICSI_No|| '0';
                            this.state.icsi2PN = json.Resources[i].ICSI_2PN|| '0';
                            this.state.dIvfNo = json.Resources[i].D_IVF_No || '0';
                            this.state.dIvf2PN = json.Resources[i].D_IVF_2PN|| '0';
                            this.state.dIcsiNo = json.Resources[i].D_ICSI_No|| '0';
                            this.state.dIcsi2PN = json.Resources[i].D_ICSI_2PN|| '0';

                            //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ동결 배아
                            if(json.Resources[i].Cryo.Cryo_date_day1.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_date_day1,
                                    ampoule : json.Resources[i].Cryo.Cryo_date_day1_ampoule,
                                    count : json.Resources[i].Cryo.Cryo_date_day1_count,
                                    no : json.Resources[i].Cryo.Cryo_date_day1_no,
                                    push : json.Resources[i].Cryo.Cryo_date_day1_push,
                                    stage : json.Resources[i].Cryo.Cryo_date_day1_stage,
                                }
                                this.state.cryo.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_date_day2.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_date_day2,
                                    ampoule : json.Resources[i].Cryo.Cryo_date_day2_ampoule,
                                    count : json.Resources[i].Cryo.Cryo_date_day2_count,
                                    no : json.Resources[i].Cryo.Cryo_date_day2_no,
                                    push : json.Resources[i].Cryo.Cryo_date_day2_push,
                                    stage : json.Resources[i].Cryo.Cryo_date_day2_stage,
                                }
                                this.state.cryo.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_date_day3.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_date_day3,
                                    ampoule : json.Resources[i].Cryo.Cryo_date_day3_ampoule,
                                    count : json.Resources[i].Cryo.Cryo_date_day3_count,
                                    no : json.Resources[i].Cryo.Cryo_date_day3_no,
                                    push : json.Resources[i].Cryo.Cryo_date_day3_push,
                                    stage : json.Resources[i].Cryo.Cryo_date_day3_stage,
                                }
                                this.state.cryo.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_date_day4.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_date_day4,
                                    ampoule : json.Resources[i].Cryo.Cryo_date_day4_ampoule,
                                    count : json.Resources[i].Cryo.Cryo_date_day4_count,
                                    no : json.Resources[i].Cryo.Cryo_date_day4_no,
                                    push : json.Resources[i].Cryo.Cryo_date_day4_push,
                                    stage : json.Resources[i].Cryo.Cryo_date_day4_stage,
                                }
                                this.state.cryo.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_date_day5.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_date_day5,
                                    ampoule : json.Resources[i].Cryo.Cryo_date_day5_ampoule,
                                    count : json.Resources[i].Cryo.Cryo_date_day5_count,
                                    no : json.Resources[i].Cryo.Cryo_date_day5_no,
                                    push : json.Resources[i].Cryo.Cryo_date_day5_push,
                                    stage : json.Resources[i].Cryo.Cryo_date_day5_stage,
                                }
                                this.state.cryo.push(obj);
                            }

                            //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ동결 배아 만료일

                            if(json.Resources[i].Cryo.Cryo_cryo_date1.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_cryo_date1,
                                    expirateDate : json.Resources[i].Cryo.Cryo_expirate_date1,
                                    year : json.Resources[i].Cryo.Cryo_expirate_year1,
                                    remaining : json.Resources[i].Cryo.Cryo_no_of_remaining1,
                                    warming : json.Resources[i].Cryo.Cryo_no_of_warming1,
                                    warmingDate : json.Resources[i].Cryo.Cryo_warming_date1,
                                }
                                this.state.cryo2.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_cryo_date2.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_cryo_date2,
                                    expirateDate : json.Resources[i].Cryo.Cryo_expirate_date2,
                                    year : json.Resources[i].Cryo.Cryo_expirate_year2,
                                    remaining : json.Resources[i].Cryo.Cryo_no_of_remaining2,
                                    warming : json.Resources[i].Cryo.Cryo_no_of_warming2,
                                    warmingDate : json.Resources[i].Cryo.Cryo_warming_date2,
                                }
                                this.state.cryo2.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_cryo_date3.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_cryo_date3,
                                    expirateDate : json.Resources[i].Cryo.Cryo_expirate_date3,
                                    year : json.Resources[i].Cryo.Cryo_expirate_year3,
                                    remaining : json.Resources[i].Cryo.Cryo_no_of_remaining3,
                                    warming : json.Resources[i].Cryo.Cryo_no_of_warming3,
                                    warmingDate : json.Resources[i].Cryo.Cryo_warming_date3,
                                }
                                this.state.cryo2.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_cryo_date4.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_cryo_date4,
                                    expirateDate : json.Resources[i].Cryo.Cryo_expirate_date4,
                                    year : json.Resources[i].Cryo.Cryo_expirate_year4,
                                    remaining : json.Resources[i].Cryo.Cryo_no_of_remaining4,
                                    warming : json.Resources[i].Cryo.Cryo_no_of_warming4,
                                    warmingDate : json.Resources[i].Cryo.Cryo_warming_date4,
                                }
                                this.state.cryo2.push(obj);
                            }

                            if(json.Resources[i].Cryo.Cryo_cryo_date5.length > 0){
                                const obj = {
                                    date : json.Resources[i].Cryo.Cryo_cryo_date5,
                                    expirateDate : json.Resources[i].Cryo.Cryo_expirate_date5,
                                    year : json.Resources[i].Cryo.Cryo_expirate_year5,
                                    remaining : json.Resources[i].Cryo.Cryo_no_of_remaining5,
                                    warming : json.Resources[i].Cryo.Cryo_no_of_warming5,
                                    warmingDate : json.Resources[i].Cryo.Cryo_warming_date5,
                                }
                                this.state.cryo2.push(obj);
                            }

                            //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                            const objD2 = {
                                g1 : json.Resources[i].Fertilization.D2.D2_G1,
                                g2 : json.Resources[i].Fertilization.D2.D2_G2,
                                g3 : json.Resources[i].Fertilization.D2.D2_G3,
                                g4 : json.Resources[i].Fertilization.D2.D2_G4,
                                g5 : json.Resources[i].Fertilization.D2.D2_G5,
                                blastocyst : json.Resources[i].Fertilization.D2.D2_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.D2.D2_premeiotic,
                                push : json.Resources[i].Fertilization.D2.D2_push,
                            }
                            if(objD2.g1.length > 0 || objD2.g2.length > 0 || objD2.g3.length > 0 || objD2.g4.length > 0 || objD2.g5.length > 0 || objD2.blastocyst.length > 0 || objD2.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 1;
                            }
                            this.state.fertilication.push(objD2);

                            const objD3 = {
                                g1 : json.Resources[i].Fertilization.D3.D3_G1,
                                g2 : json.Resources[i].Fertilization.D3.D3_G2,
                                g3 : json.Resources[i].Fertilization.D3.D3_G3,
                                g4 : json.Resources[i].Fertilization.D3.D3_G4,
                                g5 : json.Resources[i].Fertilization.D3.D3_G5,
                                blastocyst : json.Resources[i].Fertilization.D3.D3_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.D3.D3_premeiotic,
                                push : json.Resources[i].Fertilization.D3.D3_push,
                            }
                            if(objD3.g1.length > 0 || objD3.g2.length > 0 || objD3.g3.length > 0 || objD3.g4.length > 0 || objD3.g5.length > 0 || objD3.blastocyst.length > 0 || objD3.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 2;
                            }
                            this.state.fertilication.push(objD3);

                            const objD4 = {
                                g1 : json.Resources[i].Fertilization.D4.D4_G1,
                                g2 : json.Resources[i].Fertilization.D4.D4_G2,
                                g3 : json.Resources[i].Fertilization.D4.D4_G3,
                                g4 : json.Resources[i].Fertilization.D4.D4_G4,
                                g5 : json.Resources[i].Fertilization.D4.D4_G5,
                                blastocyst : json.Resources[i].Fertilization.D4.D4_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.D4.D4_premeiotic,
                                push : json.Resources[i].Fertilization.D4.D4_push,
                            }
                            if(objD4.g1.length > 0 || objD4.g2.length > 0 || objD4.g3.length > 0 || objD4.g4.length > 0 || objD4.g5.length > 0 || objD4.blastocyst.length > 0 || objD4.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 3;
                            }
                            this.state.fertilication.push(objD4);

                            const objD5 = {
                                g1 : json.Resources[i].Fertilization.D5.D5_G1,
                                g2 : json.Resources[i].Fertilization.D5.D5_G2,
                                g3 : json.Resources[i].Fertilization.D5.D5_G3,
                                g4 : json.Resources[i].Fertilization.D5.D5_G4,
                                g5 : json.Resources[i].Fertilization.D5.D5_G5,
                                blastocyst : json.Resources[i].Fertilization.D5.D5_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.D5.D5_premeiotic,
                                push : json.Resources[i].Fertilization.D5.D5_push,
                            }
                            if(objD5.g1.length > 0 || objD5.g2.length > 0 || objD5.g3.length > 0 || objD5.g4.length > 0 || objD5.g5.length > 0 || objD5.blastocyst.length > 0 || objD5.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 4;
                            }
                            this.state.fertilication.push(objD5);

                            const objD6 = {
                                g1 : json.Resources[i].Fertilization.D6.D6_G1,
                                g2 : json.Resources[i].Fertilization.D6.D6_G2,
                                g3 : json.Resources[i].Fertilization.D6.D6_G3,
                                g4 : json.Resources[i].Fertilization.D6.D6_G4,
                                g5 : json.Resources[i].Fertilization.D6.D6_G5,
                                blastocyst : json.Resources[i].Fertilization.D6.D6_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.D6.D6_premeiotic,
                                push : json.Resources[i].Fertilization.D6.D6_push,
                            }
                            if(objD6.g1.length > 0 || objD6.g2.length > 0 || objD6.g3.length > 0 || objD6.g4.length > 0 || objD6.g5.length > 0 || objD6.blastocyst.length > 0 || objD6.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 5;
                            }
                            this.state.fertilication.push(objD6);

                            const objCryo = {
                                g1 : json.Resources[i].Fertilization.cryo.cryo_G1,
                                g2 : json.Resources[i].Fertilization.cryo.cryo_G2,
                                g3 : json.Resources[i].Fertilization.cryo.cryo_G3,
                                g4 : json.Resources[i].Fertilization.cryo.cryo_G4,
                                g5 : json.Resources[i].Fertilization.cryo.cryo_G5,
                                blastocyst : json.Resources[i].Fertilization.cryo.cryo_blastocyst,
                                premeiotic : json.Resources[i].Fertilization.cryo.cryo_premeiotic,
                                push : json.Resources[i].Fertilization.cryo.cryo_push,
                            }
                            if(objCryo.g1.length > 0 || objCryo.g2.length > 0 || objCryo.g3.length > 0 || objCryo.g4.length > 0 || objCryo.g5.length > 0 || objCryo.blastocyst.length > 0 || objCryo.premeiotic.length > 0){
                                this.state.lastFertilisationPosition = 6;
                            }
                            this.state.fertilication.push(objCryo);
                            
                            if(json.Resources[i].embryo1_file_url.length > 0){
                                const obj = {
                                    uri : json.Resources[i].embryo1_file_url,
                                    text : 'embryo1',
                                }
                                this.state.datas.push(obj);
                            }
                            if(json.Resources[i].embryo2_file_url.length > 0){
                                const obj = {
                                    uri : json.Resources[i].embryo2_file_url,
                                    text : 'embryo2',
                                }
                                this.state.datas.push(obj);
                            }
                            if(json.Resources[i].embryo3_file_url.length > 0){
                                const obj = {
                                    uri : json.Resources[i].embryo3_file_url,
                                    text : 'embryo3',
                                }
                                this.state.datas.push(obj);
                            }
                            if(json.Resources[i].embryo4_file_url.length > 0){
                                const obj = {
                                    uri : json.Resources[i].embryo4_file_url,
                                    text : 'embryo4',
                                }
                                this.state.datas.push(obj);
                            }


                        }
                        this.setState({
                            isLoading : true,
                        })
                        
                    }
                }else{
    
                }
            }
        )
    }

    _DegreeMake(type, degree) {
        let text = '';
        if(degree == '1'){
            text = '신선 1차'
        }else if(degree == '2'){
            text = '신선 2차'
        }else if(degree == '3'){
            text = '신선 3차'
        }else if(degree == '4'){
            text = '신선 4차'
        }else if(degree == '11'){
            text = '선별 1차'
        }else if(degree == '12'){
            text = '선별 2차'
        }else if(degree == '13'){
            text = '선별 3차'
        }else if(degree == '14'){
            text = '선별 4차'
        }else if(degree == '15'){
            text = '선별 5차'
        }else if(degree == '16'){
            text = '선별 6차'
        }else if(degree == '17'){
            text = '선별 7차'
        }else if(degree == '50'){
            text = '차수 이외'
        }

        return type + " " + text;
    }

    _renderItem = ({item, index}) => {
        return (
            <View style = {{width : 110, height : 140, alignItems : 'center', justifyContent : 'center', backgroundColor : 'white'}}>
                <TouchableWithoutFeedback onPress = {() => this._SnapTo(index)}>
                    <View style = {{width : 106, height : 106, alignItems : 'center', justifyContent : 'center', ...Elevations[10], backgroundColor : '#fafafa', borderRadius : 8}}>
                        <Image source = {{uri : ServerUrl.Server+"/"+item.uri}} style = {{width : '90%', height : '90%',resizeMode : 'contain', borderRadius : 8}}></Image>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _renderItemTest = (index) => {
        console.log(TAG,'index : ' + index)
        return (
            <View style = {{width : '100%', height : 200, backgroundColor : 'white', borderRadius : 24, marginTop : 12}}>
                
            </View>
        )
    }

    _OneDialogVisible = value =>{
        if(value != undefined){
            if(value.position != undefined){
                console.log(TAG,value.position);
                this.state.selectedChartText = this.state.chartDatas[value.position].label;
                this.state.requestType = 2;
                this.state.selectPosition = value.position;
                this.setState({
                    oneBtnDialogVisible : value.visible,
                })
                this._IVFInfo();
            }else{
                this.setState({
                    oneBtnDialogVisible : value.visible,
                })
            }
            
        }
        if(this.state.oneBtnDialogVisible){
          return <CellDevelopDialog title = {"현재 진료 (최종진료일 순)"} datas = {this.state.chartDatas} contents = {this.state.selectedChartText} leftBtnText = {"확인"} clcik = {this._OneDialogVisible}></CellDevelopDialog>
        }else{
          return null;
        }
    }

    _SnapTo(value){
        
        if(value < this.state.clickItemPosition){
            this._carousel.snapToPrev()
        }else if(value > this.state.clickItemPosition){
            this._carousel.snapToNext()
        }
        this.state.clickItemPosition = value;
        this.setState({imgMagnify : true})
    }

    _ImageMagnify(){
        return(
            <Modal transparent={true} visible={this.state.imgMagnify} onRequestClose = {() => this.setState({imgMagnify : false})}>
                <View style={{height : '100%',width : '100%',justifyContent: "center",alignItems : 'center',backgroundColor: 'rgb(0,0,0)',}}>
                    <View style = {{width : '100%', height : '10%', alignItems : 'flex-end', justifyContent : 'center'}}>
                        <TouchableWithoutFeedback onPress = {() => this.setState({imgMagnify : false})}>
                            <Image source = {imgClose} style = {{tintColor : 'white', width : 30, height : 30, resizeMode : 'contain', marginRight : 12}} ></Image>
                        </TouchableWithoutFeedback>
                        
                    </View>
                    <View style = {{width : '100%', height : '80%'}}>
                        <PageList style = {{width : '100%', height : '100%', showsHorizontalScrollIndicator : false,}} initialPage = {this.state.clickItemPosition} data={this.state.datas} renderItem={({item, index }) => {
                                return (
                                    <View key={index} style={{flex : 1}}>
                                        <Image style = {{width : '100%', height : '100%' ,resizeMode : 'contain'}} source={{uri : ServerUrl.Server+"/"+item.uri}} />
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style = {{width : '100%', height : '10%'}}>
                    </View>
                </View>
            </Modal>
        )
    }

    

    render(){
        console.log(TAG,"position : " + this.state.datas.length);
        if(this.props.route.params != undefined){
            this.state.routePush = this.props.route.params.push;
            console.log(TAG,"push : " + this.props.route.params.push);
        }
        
        let message = '';
        let x = 0;
        if(this.state.lastFertilisationPosition != 0){
            x = this.state.lastFertilisationPosition - 1;
            if(this.state.fertilication[x].g1.length > 0){
                message += "1등급 배아 " + this.state.fertilication[x].g1 + "개";
            }
            if(this.state.fertilication[x].g2.length > 0){
                message += (message.length > 0 ? ', ' : '') + "2등급 배아 " + this.state.fertilication[x].g2 + "개";
            }
            if(this.state.fertilication[x].g3.length > 0){
                message += (message.length > 0 ? ', ' : '') + "3등급 배아 " + this.state.fertilication[x].g3 + "개";
            }
            if(this.state.fertilication[x].g4.length > 0){
                message += (message.length > 0 ? ', ' : '') + "4등급 배아 " + this.state.fertilication[x].g4 + "개";
            }
            if(this.state.fertilication[x].g5.length > 0){
                message += (message.length > 0 ? ', ' : '') + "5등급 배아 " + this.state.fertilication[x].g5 + "개";
            }
            if(this.state.fertilication[x].blastocyst.length > 0){
                message += (message.length > 0 ? ', ' : '') + "배반포 " + this.state.fertilication[x].blastocyst + "개";
            }
            if(this.state.fertilication[x].premeiotic.length > 0){
                message += (message.length > 0 ? ', ' : '') + "분열전 " + this.state.fertilication[x].premeiotic + "개";
            }
            message += '입니다.';
        }

        
        return (
            <SafeAreaView>
                <View style = {{width : '100%', height : '100%', backgroundColor : '#F6F7F9'}}>
                   {this._OneDialogVisible()}
                   {this._ImageMagnify()}
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this._goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style = {{ color : 'black', fontSize : 16, marginTop : 12, fontFamily : 'KHNPHDotfR', marginLeft : 20}}>{"배아발달 안내문"}</Text>
                    

                    
                    <ScrollView style = {{width : '100%', height : '100%', paddingLeft : 20, paddingRight : 20, marginTop : 32, marginBottom : 32}}>
                        <View style = {{width : '100%', borderRadius : 24, backgroundColor : 'white'}}>
                            {this.state.chartDatas.length > 0 ? <TouchableWithoutFeedback onPress = {() => this.setState({oneBtnDialogVisible : true})}>
                                <View style = {{ height : 40, marginTop : 18, flexDirection : 'row', paddingLeft : 20, paddingRight : 20, borderRadius : 24, borderWidth : 1, borderColor : '#AFAFAF', alignItems : 'center' ,marginLeft : 20, marginRight : 20}}>
                                    <View style = {{flex : 1, justifyContent : 'center'}}>
                                        <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : "#000"}}>{this.state.selectedChartText}</Text>
                                    </View>

                                    <Image source = {imgArrow} style = {{width : 16, height : 16, resizeMode : 'contain', transform: [{ rotate: '90deg' }]}} ></Image>
                                </View>
                            </TouchableWithoutFeedback> : <View style = {{ height : 40, marginTop : 18, flexDirection : 'row', paddingLeft : 20, paddingRight : 20, borderRadius : 24, borderWidth : 1, borderColor : '#AFAFAF', alignItems : 'center' ,marginLeft : 20, marginRight : 20}}>
                                    <View style = {{flex : 1, justifyContent : 'center'}}>
                                        <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfB', color : "#000"}}>{"진료중인 차트가 없습니다."}</Text>
                                    </View>

                                    <Image source = {imgArrow} style = {{width : 16, height : 16, resizeMode : 'contain', transform: [{ rotate: '90deg' }]}} ></Image>
                                </View>}
                            

                            <View style = {{width : '100%' ,marginTop : 17.5, flexDirection : 'row', paddingLeft : 19.5, paddingRight : 19.5, alignItems : 'center'}}>
                                <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center', backgroundColor : '#4A50CA' , height : 1}}></View>
                            </View>

                            {this.state.catchDate.length > 0 && (this.state.dIvfNo == 0 ? <View style = {{marginTop : 30.5, paddingLeft : 20}}>
                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : "#000"}}>{Moment(this.state.catchDate).format('YYYY년 M월 D일')}</Text>
                                <Text style = {{marginTop : 21, fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"채취된 난자는 " + this.state.totalOpu + "개 입니다."}</Text>
                                <Text style = {{marginTop : 24, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000", lineHeight : 25}}>{"미세수정 " + this.state.icsiNo + "개중 " + this.state.icsi2PN + "개\n" + "자연수정 " + this.state.ivfNo + "개중 " + this.state.ivf2PN + "개"}</Text>
                                <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA",}}>{"총 " + (parseInt(this.state.icsi2PN) + parseInt(this.state.ivf2PN)) + "개 수정되었습니다."}</Text>
                            </View> : (
                            <View style = {{marginTop : 30.5, paddingLeft : 20}}>
                                <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"*미성숙한 난자 채취로 인해 난자 채취 다음날"}</Text>
                                <View style = {{flexDirection : 'row', marginTop : 5}}>
                                    <Text style = {{opacity : 0,fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"*"}</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"추가 "}</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA"}}>{"자연 or 미세"}</Text>
                                    <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"수정 진행하였습니다."}</Text>
                                </View>
                                <Text style = {{marginTop : 24, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000", lineHeight : 25}}>{"추가미세수정 " + this.state.dIcsiNo + "개중 " + this.state.dIcsi2PN + "개\n" + "추가자연수정 " + this.state.dIvfNo + "개중 " + this.state.dIvf2PN + "개"}</Text>
                                <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA",}}>{"총 " + (parseInt(this.state.dIcsi2PN) + parseInt(this.state.dIvf2PN)) + "개 수정되었습니다."}</Text>
                            </View>
                            ))}
                            
                            {this.state.lastFertilisationPosition != 0 && <View>
                                <View style = {{marginTop : 40.5, paddingLeft : 20, paddingRight : 20}}>
                                    <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"오늘의 배아 발달 상태입니다."}</Text>
                                    <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA",}}>{message}</Text>
                                </View>
                            </View>}

                            {this.state.lastFertilisationPosition != 0 && <View style = {{borderWidth : 1, borderColor : '#4A50CA', marginLeft : 20 , marginRight : 20, marginTop : 27, borderRadius : 8}}>
                                <View style = {{flexDirection : 'row'}}>
                                    <View style = {{flex : 1}}>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text></Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"1등급"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"2등급"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"3등급"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"4등급"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"5등급"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"배반포"}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{"분열전"}</Text>
                                        </View>
                                    </View>

                                    {this.state.fertilication.map((item, index) => (
                                    <View style = {{flex : 1}}>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{(index != (this.state.fertilication.length-1) ? ((index + 2) + "일") : "동결") }</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.g1}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.g2}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.g3}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.g5}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.g5}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.blastocyst}</Text>
                                        </View>
                                        <View style = {{flex : 1, height : 30, alignItems : 'center', justifyContent : 'center'}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#000"}}>{item.premeiotic}</Text>
                                        </View>
                                    </View>))}
                                </View>
                                
                            </View>}

                            {this.state.datas.length > 0 && <View style = {{alignItems : 'center', justifyContent : 'center', marginTop : 21, marginBottom : 20}}>
                                <Carousel ref={(c) => { this._carousel = c;}} data={this.state.datas} renderItem={this._renderItem} sliderWidth={screenWidth - 40} itemWidth={120}/>
                            </View>}

                            {this.state.cryo.map((item, index) => (
                                <View style = {{paddingLeft : 20,}}>
                                    <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}} onPress = {() => this.setState({animation : true})}>{Moment(item.date).format("YYYY년 M월 D일") + " 동결된 배아 개수는 " + item.count + "개 입니다."}</Text>
                                </View>
                            ))}

                            {this.state.cryo2.length > 0 && <View style = {{height : 40}}></View>}
                            
                            {this.state.cryo2.map((item, index) => (
                                <View style = {{paddingLeft : 20}}>
                                    <Text style = {{marginTop : 12, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"잔여배아는 " + item.remaining + "개"}</Text>
                                    <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"동결보존일은 " + Moment(item.date).format("YYYY년 M월 D일") + "이며"}</Text>
                                    <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"보존기간만료일은 " + Moment(item.expirateDate).format("YYYY년 M월 D일") + "까지 입니다."}</Text>
                                </View>
                            ))}
                            
                            {<View style = {{width : '100%', height : 50}}></View>}
                        </View>
                        
                    </ScrollView>
                </View> 
            </SafeAreaView>
        )}
}