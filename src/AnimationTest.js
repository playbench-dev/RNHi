import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet,TouchableWithoutFeedback, Dimensions, Modal, BackHandler,Animated,Easing, ImageBackground, Platform} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Elevations from 'react-native-elevation';
import Carousel ,{ ParallaxImage } from 'react-native-snap-carousel';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import CellDevelopDialog from './Common/CellDevelopDialog'
import PageList from "react-native-page-list";
import RNAnimated from 'react-native-animated-component'

const imgBack = require('../assets/ic_back.png');
const imgEmbryo = require('../assets/ic_main_embryo.png');
const imgBg1 = require('../assets/img_cell_bg01.png');
const imgBg2 = require('../assets/img_cell_bg02.png');
const imgBg3 = require('../assets/img_cell_bg03.png');
const imgBg4 = require('../assets/img_cell_bg04.png');
const icCell01 = require('../assets/ic_cell_01.png');
const icCell02 = require('../assets/ic_cell_02.png');
const icCell03 = require('../assets/ic_cell_03.png');
const icCell04 = require('../assets/ic_cell_04.png');
const imgClose = require('../assets/ic_calendar_back.png');
const { width: screenWidth } = Dimensions.get('window')
const imgArrow = require('../assets/ic_main_right_arrow.png');

const TAG = "AnimationTest";

export default class AnimationTest extends React.Component{
    constructor(props){
        super(props)
        this.btn = React.createRef();
        this.firstView = React.createRef();
        this.animationOne = new Animated.Value(24);
        this.animationTwo = new Animated.Value(24);
        this.animationThree = new Animated.Value(24);
        this.animationFour = new Animated.Value(24);
        this.scrFirst = React.createRef();
        this.scrSecond = React.createRef();
        this.scrThird = React.createRef();
        this.scrFour = React.createRef();
        this.scrChart = React.createRef();
        this.backAction = this.backAction.bind(this);
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
        fullWidth : Dimensions.get('screen').width - 40,
        firstFlag : false,
        firstViewWidth : new Animated.Value(0),
        secondFlag : false,
        secondViewWidth : new Animated.Value(0),
        thirdFlag : false,
        thirdViewWidth : new Animated.Value(0),
        fourFlag : false,
        fourViewWidth : new Animated.Value(0),
        scrollFirstFlag : false,
        scrollSecondFlag : false,
        scrollThirdFlag : false,
        scrollFourFlag : false,

        selected : 1,
        clickItemPosition : 0,
        datas : [],
        requestType : 1,
        isLoading : false,
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
        chartDatas : [],

        chartXPosition : [],
    }

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
            console.log(TAG,this.state.chartDatas[this.state.selectPosition].value);
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

                        // for(let i = Object.keys(json.Resources).length-1; i >= 0; i--){
                            for(let i = 0; i < Object.keys(json.Resources).length; i++){
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
                        this.animationOne = new Animated.Value(24);
                        this.animationTwo = new Animated.Value(24);
                        this.animationThree = new Animated.Value(24);
                        this.animationFour = new Animated.Value(24);
                        this.setState({
                            selected : 1,
                            clickItemPosition : 0,
                            datas : [],
                            requestType : 1,
                            isLoading : false,
                            oneBtnDialogVisible : false,
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
                            firstFlag : false,
                            firstViewWidth : new Animated.Value(0),
                            secondFlag : false,
                            secondViewWidth : new Animated.Value(0),
                            thirdFlag : false,
                            thirdViewWidth : new Animated.Value(0),
                            fourFlag : false,
                            fourViewWidth : new Animated.Value(0),
                            scrollFirstFlag : false,
                            scrollSecondFlag : false,
                            scrollThirdFlag : false,
                            scrollFourFlag : false,
                            
                        })
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
                    if(this.state.requestType == 2){
                        this.animationOne = new Animated.Value(24);
                        this.animationTwo = new Animated.Value(24);
                        this.animationThree = new Animated.Value(24);
                        this.animationFour = new Animated.Value(24);
                        this.setState({
                            selected : 1,
                            clickItemPosition : 0,
                            datas : [],
                            requestType : 1,
                            isLoading : false,
                            oneBtnDialogVisible : false,
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
                            firstFlag : false,
                            firstViewWidth : new Animated.Value(0),
                            secondFlag : false,
                            secondViewWidth : new Animated.Value(0),
                            thirdFlag : false,
                            thirdViewWidth : new Animated.Value(0),
                            fourFlag : false,
                            fourViewWidth : new Animated.Value(0),
                            scrollFirstFlag : false,
                            scrollSecondFlag : false,
                            scrollThirdFlag : false,
                            scrollFourFlag : false,
                            
                        })
                    }
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

    _ChartSelect = value =>{
        // this.state.selectedChartText = this.state.chartDatas[value].label;
        console.log(TAG,value);
        console.log(TAG,this.state.chartXPosition[value]);
        this.state.requestType = 2;
        this.state.selectPosition = value;
        this.scrChart.scrollTo({x : ((20 * value) + (160 * value)) - 100, animated : true})
        this.setState({
            isLoading : true,
        })
        this._IVFInfo();
    }

    _SnapTo(value){
        
        // if(value < this.state.clickItemPosition){
        //     this._carousel.snapToPrev()
        // }else if(value > this.state.clickItemPosition){
        //     this._carousel.snapToNext()
        // }
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

    handleOneAnimation = () => {
        console.log(TAG,'click' + this.state.firstFlag)
        if(this.state.firstFlag == true){
            this.setState({firstFlag : false, scrollFirstFlag : false})
            this.scrFirst.scrollTo({x : 0, animated : true})
            Animated.timing(this.animationOne,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.firstViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({firstFlag : true, scrollFirstFlag : true})
            Animated.timing(this.animationOne,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.firstViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleTwoAnimation = () => {
        if(this.state.secondFlag == true){
            this.setState({secondFlag : false, scrollSecondFlag : false})
            this.scrSecond.scrollTo({x : 0, animated : true})
            Animated.timing(this.animationTwo,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.secondViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({secondFlag : true, scrollSecondFlag : true})
            Animated.timing(this.animationTwo,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.secondViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleThirdAnimation = () => {
        if(this.state.thirdFlag == true){
            this.setState({thirdFlag : false, scrollThirdFlag : false})
            this.scrThird.scrollTo({x : 0, animated : true})
            Animated.timing(this.animationThree,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.thirdViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({thirdFlag : true, scrollThirdFlag : true})
            Animated.timing(this.animationThree,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.thirdViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleFourAnimation = () => {
        if(this.state.fourFlag == true){
            this.setState({fourFlag : false, scrollFourFlag : false})
            this.scrFour.scrollTo({x : 0, animated : true})
            Animated.timing(this.animationFour,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.fourViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({fourFlag : true, scrollFourFlag : true})
            Animated.timing(this.animationFour,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.fourViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    _ChartXPosition(event){
        console.log(event.nativeEvent.layout.x)
        this.state.chartXPosition.push(event.nativeEvent.layout.x)
    }

    render() {

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

        return(
            <SafeAreaView>
                <View style = {{width: '100%', height : '100%', backgroundColor : '#F6F7F9',}}>
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

                    {/* selectBox */}
                    {this.state.chartDatas.length > 0 && (
                        <View style = {{width : '100%', height : 68, marginTop : 26}}>
                            <ScrollView ref = {ref => this.scrChart = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                {this.state.chartDatas.map((item, index) => (
                                    <TouchableWithoutFeedback onPress = {() => this._ChartSelect(index)}>
                                        <View onLayout = {(e) => this._ChartXPosition(e)} style = {{alignItems : 'center', justifyContent : 'center', width : 160, height : 68, backgroundColor : (this.state.selectPosition == index ? '#4a50ca' : '#fff'), marginLeft : 20, borderRadius : 24, marginRight : (index == this.state.chartDatas.length-1 ? 20 : 0)}}>
                                            <Text style = {{color : (this.state.selectPosition == index ? '#fff' : '#afafaf'), fontSize : 16, fontFamily : 'KHNPHDotfB'}}>{item.label}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* 진행챠트 check */}
                    {this.state.chartDatas.length == 0 ? <View style = {{width : '100%', height : 196, marginTop : 32, paddingLeft : 20, paddingRight : 20}}>
                        <View style = {{flex : 1, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center'}}>
                            <Image source = {imgEmbryo} style = {{width : 60, height : 60, resizeMode : 'contain', marginTop : 26}}></Image>
                            <View style = {{width : 31, height : 3, backgroundColor : '#4A50CA', marginTop : 14}}></View>
                            <Text style = {{fontFamily : 'KHNPHDotfR', marginTop : 21, color : '#000', fontSize : 18, }}>진행된 시술이 없습니다.</Text>
                            <Text style = {{fontFamily : 'NotoSansCJKkr-Regular', marginTop : 8, color : '#000', fontSize : 14, }}>난자 채취 후 상세내용을 확인 할 수 있어요.</Text>
                        </View>
                    </View> : (
                        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style = {{ marginTop : 24}}>
                        {/* 수정결과 */}
                        <RNAnimated appearFrom="top" animationDuration={500} >
                            <View style = {{width: '100%', height : 227, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView ref = {ref => this.scrFirst = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollFirstFlag}>
                                    
                                        <TouchableWithoutFeedback onPress = {() => this.handleOneAnimation()} disabled = {this.state.catchDate.length > 0 ? false : true}>
                                            <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                                <Animated.Image source = {imgBg1} ref = {this.firstView} style = {{marginLeft : 20, width : this.state.firstViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 130]}), height : this.state.firstViewWidth.interpolate({inputRange : [0,1], outputRange : [227, 130]}), backgroundColor : 'white', borderRadius : this.animationOne, }}>
                                                    
                                                </Animated.Image>
                                                {this.state.firstFlag == false ?
                                                <View style = {{position : 'absolute', left : 40, width : '100%'}}>
                                                    <View style = {{flexDirection : 'row', alignItems : 'center', marginTop: 0, marginBottom : (Platform.OS === 'android' ? 12 : 25)}}>
                                                        <Text style = {{ color : 'white', fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold'}}>Step.01 수정결과</Text>
                                                        <Image source = {icCell01} style = {{width : 50, height : 50, position : 'absolute', right : 60}}></Image>
                                                    </View>
                                                    <View style = {{backgroundColor : 'white', height : 1, marginTop : 0, width : '85%',}}></View>
                                                    <Text style = {{marginTop : 20, color : 'white', fontSize : 14, fontFamily : 'NotoSansCJKkr-Medium'}}>배아 수정 결과는 난자채취 다음 날 등록됩니다.</Text>
                                                    <Text style = {{marginTop : 0, color : 'white', fontSize : 12, fontFamily : 'NotoSansCJKkr-Regular'}}>*추가 수정이 이뤄지면 수정결과를 다시 보내드립니다.</Text>
                                                    <TouchableWithoutFeedback>
                                                        <View style = {{backgroundColor : (this.state.catchDate.length > 0 ? '#4a50ca' : '#e6e6e6'), height : 42, width : '85%', marginTop : 20, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                                            <Text style = {{color : (this.state.catchDate.length > 0 ? '#fff' : '#000'), fontSize : 12, fontFamily : 'NotoSansCJKkr-Bold',}}>{this.state.catchDate.length > 0 ? "확인 가능" : "대기중"}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                    
                                                : <View style = {{position : 'absolute', alignItems : 'center', justifyContent : 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                    <Text style = {{color : 'white', lineHeight : 32, fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold', marginLeft : 24}}>{"Step.01\n수정결과"}</Text>
                                                </View>
                                                }
                                                
                                            </View>
                                        </TouchableWithoutFeedback>

                                        {this.state.catchDate.length > 0 && (this.state.dIvfNo == 0 ? 
                                        <ImageBackground source = {imgBg1} imageStyle={{ borderRadius: 24}} style = {{marginLeft : 24, marginRight : 24, paddingLeft : 0, width : this.state.fullWidth, height : 227, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', resizeMode : 'contain'}} blurRadius = {20}>
                                            
                                            <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : "#fff"}}>{Moment(this.state.catchDate).format('YYYY년 M월 D일')}</Text>
                                            <Text style = {{marginTop : 21, fontSize : 14, fontFamily : 'KHNPHUotfR', color : "#fff"}}>{"채취된 난자는 " + this.state.totalOpu + "개 입니다."}</Text>
                                            <Text style = {{marginTop : 24, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#fff", lineHeight : 25}}>{"미세수정 " + this.state.icsiNo + "개중 " + this.state.icsi2PN + "개 " + "자연수정 " + this.state.ivfNo + "개중 " + this.state.ivf2PN + "개"}</Text>
                                            <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#0700FF",}}>{"총 " + (parseInt(this.state.icsi2PN) + parseInt(this.state.ivf2PN)) + "개 수정되었습니다."}</Text>
                                        </ImageBackground> : (
                                        <View style = {{marginLeft : 24, paddingLeft : 20, width : this.state.fullWidth, height : 227,backgroundColor : '#fff', borderRadius : 24}}>
                                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"*미성숙한 난자 채취로 인해 난자 채취 다음날"}</Text>
                                            <View style = {{flexDirection : 'row', marginTop : 5}}>
                                                <Text style = {{opacity : 0,fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"*"}</Text>
                                                <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"추가 "}</Text>
                                                <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA"}}>{"자연 or 미세"}</Text>
                                                <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB'}}>{"수정 진행하였습니다."}</Text>
                                            </View>
                                            <Text style = {{marginTop : 24, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000", lineHeight : 25}}>{"추가미세수정 " + this.state.dIcsiNo + "개중 " + this.state.dIcsi2PN + "개 " + "추가자연수정 " + this.state.dIvfNo + "개중 " + this.state.dIvf2PN + "개"}</Text>
                                            <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA",}}>{"총 " + (parseInt(this.state.dIcsi2PN) + parseInt(this.state.dIvf2PN)) + "개 수정되었습니다."}</Text>
                                        </View>
                                        ))}
                                   
                                </ScrollView>
                            </View>
                        </RNAnimated>

                        {/* 배아등급 */}
                        <RNAnimated appearFrom="top" animationDuration={1000} >
                            <View style = {{width: '100%', height : 227, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView ref = {ref => this.scrSecond = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollSecondFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleTwoAnimation()} disabled = {message.length > 0 ? false : true}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.Image source = {imgBg2} ref = {this.firstView} style = {{marginLeft : 20, width : this.state.secondViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 130]}), height : this.state.secondViewWidth.interpolate({inputRange : [0,1], outputRange : [227, 130]}), backgroundColor : 'white', borderRadius : this.animationTwo, }}>
                                            </Animated.Image>
                                            {this.state.secondFlag == false ?
                                                <View style = {{position : 'absolute', left : 40, width : '100%'}}>
                                                    <View style = {{flexDirection : 'row', alignItems : 'center', marginBottom : (Platform.OS === 'android' ? 12 : 25)}}>
                                                        <Text style = {{ color : 'white', fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold'}}>Step.02 배아등급</Text>
                                                        <Image source = {icCell02} style = {{width : 50, height : 50, position : 'absolute', right : 60}}></Image>
                                                    </View>
                                                    <View style = {{backgroundColor : 'white', height : 1, marginTop : 0, width : '85%',}}></View>
                                                    <Text style = {{marginTop : 20, color : 'white', fontSize : 14, fontFamily : 'NotoSansCJKkr-Medium'}}>배아 발달 상태는 채취 2일 후 등록됩니다.</Text>
                                                    <Text style = {{marginTop : 0, color : 'white', fontSize : 12, fontFamily : 'NotoSansCJKkr-Regular'}}>*1~5등급, 분열 전 배아, 배반포 배아로 등급이 나뉘게 됩니다.</Text>
                                                    <TouchableWithoutFeedback>
                                                        <View style = {{backgroundColor : (message.length > 0 ? '#4a50ca' : "#e6e6e6"), height : 42, width : '85%', marginTop : 20, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                                            <Text style = {{color : (message.length > 0 ? '#fff' : '#000'), fontSize : 12, fontFamily : 'NotoSansCJKkr-Bold',}}>{message.length > 0 ? "확인 가능" : "대기중"}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                    
                                                : <View style = {{position : 'absolute', alignItems : 'center', justifyContent : 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                <Text style = {{color : 'white', lineHeight : 32, fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold', marginLeft : 24}}>{"Step.02\n배아등급"}</Text>
                                            </View>
                                                }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {{width : this.state.fullWidth, marginRight : 24, height : 227, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                        {this.state.lastFertilisationPosition != 0 && <View>
                                            <View style = {{paddingLeft : 20, paddingRight : 20}}>
                                                <Text style = {{fontSize : 16, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"오늘의 배아 발달 상태입니다."}</Text>
                                                <Text style = {{marginTop : 18, fontSize : 14, fontFamily : 'KHNPHDotfB', color : "#4A50CA", lineHeight : 25}}>{message}</Text>
                                            </View>
                                        </View>}
                                    </View>

                                </ScrollView>
                            </View>
                        </RNAnimated>

                        {/* 배아이식사진 */}
                        <RNAnimated appearFrom="top" animationDuration={1500} >
                            <View style = {{width: '100%', height : 227, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView ref = {ref => this.scrThird = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollThirdFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleThirdAnimation()} disabled = {this.state.datas.length > 0 ? false : true}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.Image source = {imgBg3} ref = {this.firstView} style = {{marginLeft : 20, width : this.state.thirdViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 130]}), height : this.state.thirdViewWidth.interpolate({inputRange : [0,1], outputRange : [227, 130]}), backgroundColor : 'white', borderRadius : this.animationThree, }}>
                                            </Animated.Image>

                                            {this.state.thirdFlag == false ?
                                                <View style = {{position : 'absolute', left : 40, width : '100%'}}>
                                                    <View style = {{flexDirection : 'row', alignItems : 'center', marginBottom : (Platform.OS === 'android' ? 12 : 25)}}>
                                                        <Text style = {{ color : 'white', fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold'}}>Step.03 배아이식 사진</Text>
                                                        <Image source = {icCell03} style = {{width : 50, height : 50, position : 'absolute', right : 60}}></Image>
                                                    </View>
                                                    <View style = {{backgroundColor : 'white', height : 1, marginTop : 0, width : '85%',}}></View>
                                                    <Text style = {{marginTop : 20, color : 'white', fontSize : 14, fontFamily : 'NotoSansCJKkr-Medium'}}>배아 이식 사진은 시술 당일 오후 4-5시에 등록됩니다.</Text>
                                                    <Text style = {{marginTop : 0, color : 'white', fontSize : 12, fontFamily : 'NotoSansCJKkr-Regular'}}>*연구소 사정에 따라 통보 시점이 다소 변동될 수 있습니다.</Text>
                                                    <TouchableWithoutFeedback>
                                                        <View style = {{backgroundColor : (this.state.datas.length > 0 ? '#4a50ca' : '#e6e6e6'), height : 42, width : '85%', marginTop : 20, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                                            <Text style = {{color : (this.state.datas.length > 0 ? '#fff' : '#000'), fontSize : 12, fontFamily : 'NotoSansCJKkr-Bold',}}>{this.state.datas.length > 0 ? '확인 가능' : '대기중'}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                    
                                                : <View style = {{position : 'absolute', alignItems : 'center', justifyContent : 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                <Text style = {{color : 'white', lineHeight : 32, fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold', marginLeft : 24, textAlign : 'center'}}>{"Step.03\n배아이식사진"}</Text>
                                            </View>
                                                }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {{height : 227, marginRight : 24, borderRadius : 24, flexDirection : 'row', alignItems : 'center', paddingRight : 24, minWidth : this.state.fullWidth}}>
                                        {/* {this.state.datas.length > 0 && <View style = {{alignItems : 'center', justifyContent : 'center', marginTop : 21, }}>
                                            <Carousel ref={(c) => { this._carousel = c;}} data={this.state.datas} renderItem={this._renderItem} sliderWidth={screenWidth - 80} itemWidth={120}/>
                                        </View>} */}
                                        {this.state.datas.map((item,index) => (
                                                <TouchableWithoutFeedback onPress = {() => this._SnapTo(index)}>
                                                    <View style = {{width : 106, height : 106, backgroundColor : '#fff', marginLeft : 24, ...Elevations[4], alignItems : 'center', justifyContent : 'center'}}>
                                                        <Image source = {{uri : ServerUrl.Server+"/"+item.uri}} style = {{width : '90%', height : '90%',resizeMode : 'contain', borderRadius : 8}}></Image>
                                                    </View> 
                                                </TouchableWithoutFeedback>
                                            ))}
                                       
                                    </View>
                                </ScrollView>
                            </View>
                        </RNAnimated>

                        {/* 동결 */}
                        <RNAnimated appearFrom="top" animationDuration={2000} >
                            <View style = {{width: '100%', height : 227, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView ref = {ref => this.scrFour = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollFourFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleFourAnimation()} disabled = {this.state.cryo2.length > 0 ? false : true}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.Image source = {imgBg4} ref = {this.firstView} style = {{marginLeft : 20, width : this.state.fourViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 130]}), height : this.state.fourViewWidth.interpolate({inputRange : [0,1], outputRange : [227, 130]}), backgroundColor : 'white', borderRadius : this.animationFour, }}>
                                            </Animated.Image>
                                            {this.state.fourFlag == false ?
                                                <View style = {{position : 'absolute', left : 40, width : '100%'}}>
                                                    <View style = {{flexDirection : 'row', alignItems : 'center', marginBottom : (Platform.OS === 'android' ? 12 : 25)}}>
                                                        <Text style = {{ color : 'white', fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold'}}>Step.04 동결</Text>
                                                        <Image source = {icCell04} style = {{width : 50, height : 50, position : 'absolute', right : 60}}></Image>
                                                    </View>
                                                    <View style = {{backgroundColor : 'white', height : 1, marginTop : 0, width : '85%',}}></View>
                                                    <Text style = {{marginTop : 20, color : 'white', fontSize : 14, fontFamily : 'NotoSansCJKkr-Medium'}}>{"동결된 배아 정보, 잔여 동결 배아 정보, 동결보존일,\n보존기간만료일이 등록됩니다."}</Text>
                                                    <TouchableWithoutFeedback>
                                                        <View style = {{backgroundColor : (this.state.cryo2.length > 0 ? '#4a50ca' : '#e6e6e6'), height : 42, width : '85%', marginTop : 20, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                                            <Text style = {{color : (this.state.cryo2.length > 0 ? '#fff' : '#000'), fontSize : 12, fontFamily : 'NotoSansCJKkr-Bold',}}>{this.state.cryo2.length > 0 ? "확인 가능" : "대기중"}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                    
                                                : <View style = {{position : 'absolute', alignItems : 'center', justifyContent : 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                <Text style = {{color : 'white', lineHeight : 32, fontSize : 16, fontFamily : 'NotoSansCJKkr-Bold', marginLeft : 24, textAlign : 'center'}}>{"Step.04\n동결"}</Text>
                                            </View>
                                                }
                                        </View>
                                    </TouchableWithoutFeedback>

                                    {this.state.cryo.length > 0 && <View style = {{width : this.state.fullWidth, height : 227, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24, alignItems : 'center', justifyContent : 'center'}}>
                                        {this.state.cryo.map((item, index) => (
                                            <View style = {{paddingLeft : 20,}}>
                                                <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}} onPress = {() => this.setState({animation : true})}>{Moment(item.date).format("YYYY년 M월 D일") + " 동결된 배아 개수는 " + item.count + "개 입니다."}</Text>
                                            </View>
                                        ))}
                                    </View>}
                                    
                                    {this.state.cryo2.length > 0 &&
                                         <View style = {{width : this.state.fullWidth, height : 227, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginRight : 24}}>
                                         {this.state.cryo2.map((item, index) => ((index == 0 || index == 1) &&
                                             <View style = {{paddingLeft : 20, paddingRight : 20, marginTop : (index == 1 ? 12 : 0)}}>
                                                 <Text style = {{marginTop : 12, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"잔여배아는 " + item.remaining + "개"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"동결보존일은 " + Moment(item.date).format("YYYY년 M월 D일") + "이며"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"보존기간만료일은 " + Moment(item.expirateDate).format("YYYY년 M월 D일") + "까지 입니다."}</Text>
                                             </View>
                                         ))}
                                     </View>
                                    }
                                    {this.state.cryo2.length > 2 &&
                                         <View style = {{width : this.state.fullWidth, height : 227, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginRight : 24}}>
                                         {this.state.cryo2.map((item, index) => ((index == 2 || index == 3) &&
                                             <View style = {{paddingLeft : 20, paddingRight : 20, marginTop : (index == 3 ? 12 : 0)}}>
                                                 <Text style = {{marginTop : 12, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"잔여배아는 " + item.remaining + "개"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"동결보존일은 " + Moment(item.date).format("YYYY년 M월 D일") + "이며"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"보존기간만료일은 " + Moment(item.expirateDate).format("YYYY년 M월 D일") + "까지 입니다."}</Text>
                                             </View>
                                         ))}
                                     </View>
                                    }
                                    {this.state.cryo2.length > 4 &&
                                         <View style = {{width : this.state.fullWidth, height : 227, backgroundColor : '#fff', borderRadius : 24, alignItems : 'center', justifyContent : 'center', marginRight : 24}}>
                                         {this.state.cryo2.map((item, index) => ((index == 4) &&
                                             <View style = {{paddingLeft : 20, paddingRight : 20,}}>
                                                 <Text style = {{marginTop : 12, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"잔여배아는 " + item.remaining + "개"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"동결보존일은 " + Moment(item.date).format("YYYY년 M월 D일") + "이며"}</Text>
                                                 <Text style = {{marginTop : 8, fontSize : 14, fontFamily : 'KHNPHDotfR', color : "#000"}}>{"보존기간만료일은 " + Moment(item.expirateDate).format("YYYY년 M월 D일") + "까지 입니다."}</Text>
                                             </View>
                                         ))}
                                     </View>
                                    }
                                </ScrollView>
                            </View>
                        </RNAnimated>
                    </ScrollView>
                    )}
                    <View style = {{height : 40}}></View>
                </View>
            </SafeAreaView>
        )
    }
}