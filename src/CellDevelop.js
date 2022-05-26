import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, Dimensions, Modal, BackHandler, Animated, Easing, ImageBackground, Platform, FlatList } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Elevations from 'react-native-elevation';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import CellDevelopDialog from './Common/CellDevelopDialog'
import InformationDialog from './Common/InformationDialog'
import RNAnimated from 'react-native-animated-component'
import FetchingIndicator from 'react-native-fetching-indicator'
import SwitchToggle from 'react-native-switch-toggle';
import DashedLine from 'react-native-dashed-line';
import PageList from 'react-native-page-list'
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import FastImage from 'react-native-fast-image'

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
let icTest01 = require('../assets/cell_bg_01.png');
let icTest02 = require('../assets/cell_bg_02.png');
let icTest03 = require('../assets/cell_bg_03.png');
let icTest04 = require('../assets/cell_bg_04.png');
const imgStatusBg = require('../assets/cell_status_bg.png')
const imgClose = require('../assets/ic_calendar_back.png');
const { width: screenWidth } = Dimensions.get('window')
const imgArrow = require('../assets/ic_main_right_arrow.png');
const imgWaitBtn = require('../assets/cell_wait_btn.png');
const imgSuccessBtn = require('../assets/cell_success_btn.png');
const imgBook = require('../assets/ic_cell_book.png')
const imgCategory = require('../assets/ic_cell_category.png')
const imgCell = require('../assets/ic_cell_cell.png')

const TAG = "CellDevelop";

export default class CellDevelop extends React.Component {
    constructor(props) {
        super(props)
        this.scrollX = new Animated.Value(0);
        this.backAction = this.backAction.bind(this);
    }

    state = {
        fullWidth: Dimensions.get('screen').width - 40,
        selectedCategory: '1',
        selected: 1,
        clickItemPosition: 0,
        datas: [],
        requestType: 1,
        isLoading: false,
        oneBtnDialogVisible: false,
        informationDialogVisible: false,
        selectedChartText: '',
        selectPosition: 0,
        catchDate: '',
        opuDate: '',
        normal_push: 0,
        delay_push: 0,
        etDate: '',
        cryoDate: '',
        oocyteDate: '',
        totalOpu: 0,
        ivfNo: '0',
        ivf2PN: '0',
        icsiNo: '0',
        icsi2PN: '0',
        dIvfNo: '0',
        dIvf2PN: '0',
        dIcsiNo: '0',
        dIcsi2PN: '0',
        imgMagnify: false,
        fertilication: [],
        cryo: [],
        cryo2: [],
        lastFertilisationPosition: 0,
        routePush: false,
        animation: false,
        testList: ['', '', '', '', ''],
        chartDatas: [],
        isFetching: true,
        chartXPosition: [],
        embryoDates: [],
        oocyteDates: [],
        dayStr: '',
        chartNo: '',
    }

    componentDidMount() {
        if (this.state.isLoading == false) {
            this._IVFInfo();
        }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    }

    backAction() {
        console.log(TAG, 'aaasdas');
        if (this.state.imgMagnify == true) {
            this.setState({ imgMagnify: false });
        } else {
            if (this.state.routePush == true) {
                this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else {
                this.props.navigation.goBack();
            }
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

    _Login() {
        // this.props.navigation.navigate('AdminUserSelect');
        // return;
        var details = {
            'patient_no': Users.paitentNo,
            'user_name': Users.userName,
            'token': Users.token,
        };

        var formBody = [];

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
                    Users.spouseBirthday = json.Resources[0].spouse_birth_date || ''
                    Users.userDirectDoctor = json.Resources[0].admin_name || '';
                    Users.provisionYN = json.Resources[0].provision_yn || '';
                    Users.AccessToken = json.Resources[0].access_token || '';
                    Users.RefreshToken = json.Resources[0].refresh_token || '';
                    Users.guest = false;
                    Users.userPush = json.Resources[0].use_push || '';
                    Users.kakaoPush = json.Resources[0].kakao_push || '';
                    this._IVFInfo();
                }
            }
        )
    }

    _IVFInfo() {
        var details = null;
        var url = "";
        this.setState({ isFetching: true })
        if (this.state.requestType == 1) {
            url = ServerUrl.IVFListUrl;
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'user_no': Users.userNo,
            };
        } else if (this.state.requestType == 2) {
            url = ServerUrl.IVFDetailUrl;
            console.log(TAG, this.state.chartDatas[this.state.selectPosition].value);
            details = {
                'access_token': Users.AccessToken,
                'refresh_token': Users.RefreshToken,
                'chart_no': this.state.chartDatas[this.state.selectPosition].value,
                'user_no': Users.userNo,
            };
        } else if (this.state.requestType == 3) {
            url = ServerUrl.CryoUrl;
            details = {
                'user_no': Users.userNo,
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
                console.log('this.state.requestType : ' + this.state.requestType)
                if (json.Error_Cd == "0000") {
                    if (this.state.requestType == 1) {
                        this.state.chartDatas = [];

                        for (let i = Object.keys(json.Resources).length - 1; i >= 0; i--) {
                            // for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                            const obj = ({
                                id: '' + i,
                                label: this._DegreeMake(json.Resources[i].chart_type || '', json.Resources[i].degree),
                                value: json.Resources[i].chart_no || '',
                            })
                            this.state.chartDatas.push(obj);
                        }
                        this.state.requestType = 2;
                        this.state.selectedChartText = this.state.chartDatas[0].label;
                        this.state.chartNo = this.state.chartDatas[0].value;

                        this.setState({
                            isLoading: true,
                        })
                        this._IVFInfo();

                    } else if (this.state.requestType == 2) {
                        this.setState({
                            selectedCategory: '1',
                            selected: 1,
                            clickItemPosition: 0,
                            datas: [],
                            requestType: 1,
                            isLoading: false,
                            oneBtnDialogVisible: false,
                            catchDate: '',
                            opuDate: '',
                            normal_push: 0,
                            delay_push: 0,
                            etDate: '',
                            cryoDate: '',
                            oocyteDate: '',
                            totalOpu: 0,
                            ivfNo: '0',
                            ivf2PN: '0',
                            icsiNo: '0',
                            icsi2PN: '0',
                            dIvfNo: '0',
                            dIvf2PN: '0',
                            dIcsiNo: '0',
                            dIcsi2PN: '0',
                            imgMagnify: false,
                            fertilication: [],
                            cryo: [],
                            cryo2: [],
                            lastFertilisationPosition: 0,
                            testList: ['', '', '', '', ''],
                            isFetching: true,
                            chartXPosition: [],
                            embryoDates: [],
                            oocyteDates: [],
                            dayStr: '',
                        })
                        for (let i = 0; i < Object.keys(json.Resources).length; i++) {

                            this.state.opuDate = json.Resources[i].OPU_date;
                            if (json.Resources[i].ET_date.length > 0) {
                                this.state.etDate = json.Resources[i].ET_date;
                            }
                            console.log(`opuL : ${parseInt(json.Resources[i].OPU_L)} , opuR : ${parseInt(json.Resources[i].OPU_R)}`)
                            this.state.totalOpu = ((json.Resources[i].OPU_L.length > 0 ? parseInt(json.Resources[i].OPU_L) : 0) + (json.Resources[i].OPU_R.length > 0 ? parseInt(json.Resources[i].OPU_R) : 0)) || '0';
                            if (json.Resources[i].normal_push === "1") {
                                this.state.normal_push = 1;
                                this.state.ivfNo = json.Resources[i].IVF_No || '0';
                                this.state.ivf2PN = json.Resources[i].IVF_2PN || '0';
                                this.state.icsiNo = json.Resources[i].ICSI_No || '0';
                                this.state.icsi2PN = json.Resources[i].ICSI_2PN || '0';
                            }
                            if (json.Resources[i].delay_push === "1") {
                                this.state.delay_push = 1;
                                this.state.dIvfNo = json.Resources[i].D_IVF_No || '0';
                                this.state.dIvf2PN = json.Resources[i].D_IVF_2PN || '0';
                                this.state.dIcsiNo = json.Resources[i].D_ICSI_No || '0';
                                this.state.dIcsi2PN = json.Resources[i].D_ICSI_2PN || '0';
                            }

                            console.log(TAG, json.Resources[i].Cryo);
                            if (json.Resources[i].Cryo.length > 0) {
                                console.log(TAG, "Cryo")
                                for (let j = 0; j < json.Resources[i].Cryo.length; j++) {
                                    if (json.Resources[i].Cryo[j].no_stage_info != undefined) {
                                        if (json.Resources[i].Cryo[j].no_stage_info.length > 0) {

                                            let totalCnt = 0;

                                            for (let x = 0; x < json.Resources[i].Cryo[j].no_stage_info.length; x++) {
                                                console.log(json.Resources[i].Cryo[j].no_stage_info[x]);
                                                let total = 0;
                                                let remaining = 0;
                                                if (json.Resources[i].Cryo[j].no_stage_info[x].push == 1) {

                                                    if (x == 0) {
                                                        if (json.Resources[i].Cryo[j].cryo_type == 1) {
                                                            this.state.cryoDate += json.Resources[i].Cryo[j].no_stage_info[x].cryoDate;
                                                        } else {
                                                            this.state.oocyteDate += json.Resources[i].Cryo[j].no_stage_info[x].cryoDate;
                                                        }
                                                    } else {
                                                        if (json.Resources[i].Cryo[j].cryo_type == 1) {
                                                            this.state.cryoDate += ',' + json.Resources[i].Cryo[j].no_stage_info[x].cryoDate;
                                                        } else {
                                                            this.state.oocyteDate += ',' + json.Resources[i].Cryo[j].no_stage_info[x].cryoDate;
                                                        }
                                                    }
                                                    for (let y = 0; y < json.Resources[i].Cryo[j].no_stage_info[x].noStage.length; y++) {
                                                        console.log(json.Resources[i].Cryo[j].no_stage_info[x].noStage[y]);
                                                        total += json.Resources[i].Cryo[j].no_stage_info[x].noStage[y].count;
                                                        totalCnt += json.Resources[i].Cryo[j].no_stage_info[x].noStage[y].count;
                                                        if (json.Resources[i].Cryo[j].no_stage_info[x].noStage[y].warming.value.length == 0) {
                                                            remaining += json.Resources[i].Cryo[j].no_stage_info[x].noStage[y].count;
                                                        }
                                                    }

                                                    if (total != 0) {
                                                        const obj = {
                                                            count: total,
                                                            totalCount: totalCnt,
                                                            remaining: remaining,
                                                            expiredDate: json.Resources[i].Cryo[j].expired_date,
                                                            type: json.Resources[i].Cryo[j].cryo_type,
                                                            cryoDate: json.Resources[i].Cryo[j].no_stage_info[x].cryoDate,
                                                            opuDate: json.Resources[i].OPU_date,
                                                        }
                                                        if (json.Resources[i].Cryo[j].cryo_type == 1) {
                                                            this.state.cryo.push(obj);
                                                        } else {
                                                            this.state.cryo2.push(obj);
                                                        }

                                                    }
                                                }
                                            }
                                            if (json.Resources[i].Cryo[j].cryo_type == 1) {
                                                this.state.embryoDates = this.state.cryoDate.split(',');
                                            } else {
                                                this.state.oocyteDates = this.state.oocyteDate.split(',');
                                            }


                                        }
                                    }
                                }
                            }

                            //배아등급
                            if (json.Resources[i].Fertilization.D2.D2_push == '1') {
                                const objD2 = {
                                    g1: json.Resources[i].Fertilization.D2.D2_G1,
                                    g2: json.Resources[i].Fertilization.D2.D2_G2,
                                    g3: json.Resources[i].Fertilization.D2.D2_G3,
                                    g4: json.Resources[i].Fertilization.D2.D2_G4,
                                    g5: json.Resources[i].Fertilization.D2.D2_G5,
                                    blastocyst: json.Resources[i].Fertilization.D2.D2_blastocyst,
                                    premeiotic: json.Resources[i].Fertilization.D2.D2_premeiotic,
                                    addition: json.Resources[i].Fertilization.D2.D2_addition,
                                    push: json.Resources[i].Fertilization.D2.D2_push,
                                    dayStr: '2일 째',
                                }
                                this.state.fertilication.push(objD2);
                            }

                            if (json.Resources[i].Fertilization.D3.D3_push == '1') {
                                const objD3 = {
                                    g1: json.Resources[i].Fertilization.D3.D3_G1,
                                    g2: json.Resources[i].Fertilization.D3.D3_G2,
                                    g3: json.Resources[i].Fertilization.D3.D3_G3,
                                    g4: json.Resources[i].Fertilization.D3.D3_G4,
                                    g5: json.Resources[i].Fertilization.D3.D3_G5,
                                    blastocyst: json.Resources[i].Fertilization.D3.D3_blastocyst,
                                    premeiotic: json.Resources[i].Fertilization.D3.D3_premeiotic,
                                    addition: json.Resources[i].Fertilization.D3.D3_addition,
                                    push: json.Resources[i].Fertilization.D3.D3_push,
                                    dayStr: '3일 째',
                                }
                                this.state.fertilication.push(objD3);
                            }

                            if (json.Resources[i].Fertilization.D4.D4_push == '1') {
                                const objD4 = {
                                    g1: json.Resources[i].Fertilization.D4.D4_G1,
                                    g2: json.Resources[i].Fertilization.D4.D4_G2,
                                    g3: json.Resources[i].Fertilization.D4.D4_G3,
                                    g4: json.Resources[i].Fertilization.D4.D4_G4,
                                    g5: json.Resources[i].Fertilization.D4.D4_G5,
                                    blastocyst: json.Resources[i].Fertilization.D4.D4_blastocyst,
                                    premeiotic: json.Resources[i].Fertilization.D4.D4_premeiotic,
                                    addition: json.Resources[i].Fertilization.D4.D4_addition,
                                    push: json.Resources[i].Fertilization.D4.D4_push,
                                    dayStr: '4일 째',
                                }
                                this.state.fertilication.push(objD4);
                            }

                            if (json.Resources[i].Fertilization.D5.D5_push == '1') {
                                const objD5 = {
                                    g1: json.Resources[i].Fertilization.D5.D5_G1,
                                    g2: json.Resources[i].Fertilization.D5.D5_G2,
                                    g3: json.Resources[i].Fertilization.D5.D5_G3,
                                    g4: json.Resources[i].Fertilization.D5.D5_G4,
                                    g5: json.Resources[i].Fertilization.D5.D5_G5,
                                    blastocyst: json.Resources[i].Fertilization.D5.D5_blastocyst,
                                    premeiotic: json.Resources[i].Fertilization.D5.D5_premeiotic,
                                    addition: json.Resources[i].Fertilization.D5.D5_addition,
                                    push: json.Resources[i].Fertilization.D5.D5_push,
                                    dayStr: '5일 째',
                                }
                                this.state.fertilication.push(objD5);
                            }

                            if (json.Resources[i].Fertilization.D6.D6_push == '1') {
                                const objD6 = {
                                    g1: json.Resources[i].Fertilization.D6.D6_G1,
                                    g2: json.Resources[i].Fertilization.D6.D6_G2,
                                    g3: json.Resources[i].Fertilization.D6.D6_G3,
                                    g4: json.Resources[i].Fertilization.D6.D6_G4,
                                    g5: json.Resources[i].Fertilization.D6.D6_G5,
                                    blastocyst: json.Resources[i].Fertilization.D6.D6_blastocyst,
                                    premeiotic: json.Resources[i].Fertilization.D6.D6_premeiotic,
                                    addition: json.Resources[i].Fertilization.D6.D6_addition,
                                    push: json.Resources[i].Fertilization.D6.D6_push,
                                    dayStr: '6일 째',
                                }
                                this.state.fertilication.push(objD6);
                            }

                            //배아이식사진
                            if (json.Resources[i].embryo_push == 1) {
                                if (json.Resources[i].embryo1_file_url.length > 0) {
                                    const obj = {
                                        uri: json.Resources[i].embryo1_file_url,
                                        text: 'embryo1',
                                    }
                                    this.state.datas.push(obj);
                                }
                                if (json.Resources[i].embryo2_file_url.length > 0) {
                                    const obj = {
                                        uri: json.Resources[i].embryo2_file_url,
                                        text: 'embryo2',
                                    }
                                    this.state.datas.push(obj);
                                }
                                if (json.Resources[i].embryo3_file_url.length > 0) {
                                    const obj = {
                                        uri: json.Resources[i].embryo3_file_url,
                                        text: 'embryo3',
                                    }
                                    this.state.datas.push(obj);
                                }
                                if (json.Resources[i].embryo4_file_url.length > 0) {
                                    const obj = {
                                        uri: json.Resources[i].embryo4_file_url,
                                        text: 'embryo4',
                                    }
                                    this.state.datas.push(obj);
                                }
                            }

                        }
                        this.setState({
                            isLoading: true,
                        })

                    } else if (this.state.requestType == 3) {
                        this.state.requestType = 2;
                        this.setState({
                            isLoading: true,
                        })
                        this._IVFInfo();
                    }
                } else if (json.Error_Cd == "1001") {
                    this._Login();
                } else {
                    if (this.state.requestType == 2) {
                        this.setState({
                            selected: 1,
                            clickItemPosition: 0,
                            datas: [],
                            requestType: 1,
                            isLoading: false,
                            oneBtnDialogVisible: false,
                            catchDate: '',
                            totalOpu: 0,
                            ivfNo: '0',
                            ivf2PN: '0',
                            icsiNo: '0',
                            icsi2PN: '0',
                            dIvfNo: '0',
                            dIvf2PN: '0',
                            dIcsiNo: '0',
                            dIcsi2PN: '0',
                            imgMagnify: false,
                            opuDate: '',
                            normal_push: 0,
                            delay_push: 0,
                            fertilication: [],
                            cryo: [],
                            cryo2: [],
                            lastFertilisationPosition: 0,
                            dayStr: '',
                        })
                    }
                }
                this.setState({ isFetching: false })
            }
        )
    }

    _DegreeMake(type, degree) {
        let text = '';
        if (type == 'IVF') {
            if (degree == '1') {
                text = '신선 1차'
            } else if (degree == '2') {
                text = '신선 2차'
            } else if (degree == '3') {
                text = '신선 3차'
            } else if (degree == '4') {
                text = '신선 4차'
            } else if (degree == '5') {
                text = '신선 5차'
            } else if (degree == '6') {
                text = '신선 6차'
            } else if (degree == '7') {
                text = '신선 7차'
            } else if (degree == '8') {
                text = '신선 8차'
            } else if (degree == '9') {
                text = '신선 9차'
            } else if (degree == '11') {
                text = '선별 1차'
            } else if (degree == '12') {
                text = '선별 2차'
            } else if (degree == '13') {
                text = '선별 3차'
            } else if (degree == '14') {
                text = '선별 4차'
            } else if (degree == '15') {
                text = '선별 5차'
            } else if (degree == '16') {
                text = '선별 6차'
            } else if (degree == '17') {
                text = '선별 7차'
            } else if (degree == '18') {
                text = '선별 8차'
            } else if (degree == '19') {
                text = '선별 9차'
            } else if (degree == '50') {
                text = '차수 이외'
            } else if (degree == '51') {
                text = 'OD'
            } else if (degree == '52') {
                text = '본인난자동결'
            } else if (degree == '53') {
                text = 'RE'
            } else if (degree == '54') {
                text = '타원이관'
            } else if (degree == '55') {
                text = '공난포'
            } else if (degree == '56') {
                text = 'Cancel'
            } else if (degree == '99') {
                text = '비급여'
            }
        } else if (type == 'T-ET') {
            if (degree == '1') {
                text = '동결 1차'
            } else if (degree == '2') {
                text = '동결 2차'
            } else if (degree == '3') {
                text = '동결 3차'
            } else if (degree == '4') {
                text = '동결 4차'
            } else if (degree == '5') {
                text = '동결 5차'
            } else if (degree == '6') {
                text = '동결 6차'
            } else if (degree == '7') {
                text = '동결 7차'
            } else if (degree == '11') {
                text = '선별 1차'
            } else if (degree == '12') {
                text = '선별 2차'
            } else if (degree == '13') {
                text = '선별 3차'
            } else if (degree == '14') {
                text = '선별 4차'
            } else if (degree == '15') {
                text = '선별 5차'
            } else if (degree == '16') {
                text = '선별 6차'
            } else if (degree == '17') {
                text = '선별 7차'
            } else if (degree == '50') {
                text = '차수 이외'
            } else if (degree == '56') {
                text = 'Cancel'
            } else if (degree == '99') {
                text = '비급여'
            }
        } else if (type == 'IUI') {
            if (degree == '1') {
                text = '인공 1차'
            } else if (degree == '2') {
                text = '인공 2차'
            } else if (degree == '3') {
                text = '인공 3차'
            } else if (degree == '4') {
                text = '인공 4차'
            } else if (degree == '5') {
                text = '인공 5차'
            } else if (degree == '11') {
                text = '선별 1차'
            } else if (degree == '12') {
                text = '선별 2차'
            } else if (degree == '13') {
                text = '선별 3차'
            } else if (degree == '14') {
                text = '선별 4차'
            } else if (degree == '15') {
                text = '선별 5차'
            } else if (degree == '50') {
                text = '차수 이외'
            } else if (degree == '56') {
                text = 'Cancel'
            } else if (degree == '99') {
                text = '비급여'
            }
        }
        return type + " " + text;
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ width: 110, height: 140, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <TouchableWithoutFeedback onPress={() => this._SnapTo(index)}>
                    <View style={{ width: 106, height: 106, alignItems: 'center', justifyContent: 'center', ...Elevations[10], backgroundColor: '#fafafa', borderRadius: 8 }}>
                        <Image source={{ uri: ServerUrl.Server + "/" + item.uri }} style={{ width: '90%', height: '90%', resizeMode: 'contain', borderRadius: 8 }}></Image>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _OneDialogVisible = value => {
        if (value != undefined) {
            if (value.position != undefined) {
                console.log(TAG, value.position);
                this.state.selectedChartText = this.state.chartDatas[value.position].label;
                this.state.requestType = 2;
                this.state.selectPosition = value.position;
                this.state.chartNo = this.state.chartDatas[value.position].value;
                this.setState({
                    oneBtnDialogVisible: value.visible,
                })
                this._IVFInfo();
            } else {
                this.setState({
                    oneBtnDialogVisible: value.visible,
                })
            }

        }
        if (this.state.oneBtnDialogVisible) {
            return <CellDevelopDialog title={"현재 진료 (최종진료일 순)"} chartNo={this.state.chartNo} datas={this.state.chartDatas} contents={this.state.selectedChartText} leftBtnText={"확인"} clcik={this._OneDialogVisible} ></CellDevelopDialog>
        } else {
            return null;
        }
    }

    _ChartSelect = value => {
        console.log(TAG, value);
        console.log(TAG, this.state.chartXPosition[value]);
        this.state.requestType = 2;
        this.state.selectPosition = value;
        this.scrChart.scrollTo({ x: ((20 * value) + (160 * value)) - 100, animated: true })
        this.setState({
            isLoading: true,
        })
        this._IVFInfo();
    }

    _SnapTo(value) {
        this.state.clickItemPosition = value;
        this.setState({ imgMagnify: true })
    }

    _ImageMagnify() {
        return (
            <Modal transparent={true} visible={this.state.imgMagnify} onRequestClose={() => this.setState({ imgMagnify: false })}>
                <View style={{ height: '100%', width: '100%', justifyContent: "center", alignItems: 'center', backgroundColor: 'rgb(0,0,0)', }}>
                    <View style={{ width: '100%', height: '10%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ imgMagnify: false })}>
                            <Image source={imgClose} style={{ tintColor: 'white', width: 60, height: 60, resizeMode: 'contain', marginRight: 0 }} ></Image>
                        </TouchableWithoutFeedback>

                    </View>
                    <View style={{ width: '100%', height: '80%' }}>
                        <PageList style={{ width: '100%', height: '100%', showsHorizontalScrollIndicator: false, }} initialPage={this.state.clickItemPosition} data={this.state.datas} renderItem={({ item, index }) => {
                            return (
                                <View key={index} style={{ flex: 1 }}>
                                    {/* <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: ServerUrl.Server + "/" + item.uri }} /> */}
                                    <FastImage style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: ServerUrl.Server + "/" + item.uri, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }} resizeMode={FastImage.resizeMode.contain}></FastImage>
                                </View>
                            );
                        }}
                        />
                    </View>
                    <View style={{ width: '100%', height: '10%' }}>
                    </View>
                </View>
            </Modal>
        )
    }

    _ChartXPosition(event) {
        console.log(event.nativeEvent.layout.x)
        this.state.chartXPosition.push(event.nativeEvent.layout.x)
    }

    _DegreeText(x) {
        let message = "";
        if (this.state.fertilication[x].g1.length > 0) {
            message += "1등급 배아 " + this.state.fertilication[x].g1 + "개";
        }

        if (this.state.fertilication[x].g2.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "2등급 배아 " + this.state.fertilication[x].g2 + "개";
        }

        if (this.state.fertilication[x].g3.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "3등급 배아 " + this.state.fertilication[x].g3 + "개";
        }

        if (this.state.fertilication[x].g4.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "4등급 배아 " + this.state.fertilication[x].g4 + "개";
        }

        if (this.state.fertilication[x].g5.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "5등급 배아 " + this.state.fertilication[x].g5 + "개";
        }

        if (this.state.fertilication[x].blastocyst.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "배반포 " + this.state.fertilication[x].blastocyst + "개";
        }

        if (this.state.fertilication[x].premeiotic.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "분열전 " + this.state.fertilication[x].premeiotic + "개";
        }

        if (this.state.fertilication[x].addition.length > 0) {
            message += (message.length > 0 ? ', ' : '') + "추가수정 " + this.state.fertilication[x].addition + "개";
        }

        if (message.length == 0) {
            message = "0개"
        }

        return message += '입니다.';
    }

    //20220503 진행과정 안내 팝업
    _InformationPopup = value => {
        if (value != undefined) {
            this.setState({
                informationDialogVisible: value.visible,
            })

        }
        if (this.state.informationDialogVisible) {
            return <InformationDialog clcik={this._InformationPopup}></InformationDialog>
        } else {
            return null;
        }
    }

    render() {
        if (this.props.route.params != undefined) {
            this.state.routePush = this.props.route.params.push;
            console.log(TAG, "push : " + this.props.route.params.push);
        }
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9', }}>
                    {this._OneDialogVisible()}
                    {this._ImageMagnify()}
                    {this._InformationPopup()}
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this._goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* 20220503 변경될 부분 */
                        <ScrollView>
                            <View style={{}}>
                                <View style={{ width: '100%', height: 48, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ flex: 1, color: 'black', fontSize: 22, fontFamily: 'KHNPHDotfR', marginLeft: 20, lineHeight: 24 }}>{"배아의 발달상태를 확인\n해보세요:)"}</Text>
                                    {/* 20220503 디자인 추가진행 안내버튼부분 */}
                                    <TouchableWithoutFeedback onPress={() => this.setState({ informationDialogVisible: true })}>
                                        <View style={{ width: 62, height: 32, backgroundColor: '#e6e6e6', borderRadius: 8, marginRight: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#565960', fontSize: 14, fontFamily: 'KHNPHDotfR' }}>안내</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                {/* 시술일정 */}
                                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: 'white', borderRadius: 16, marginTop: 20, paddingLeft: 20 }}>
                                    <View style={{ width: '100%', justifyContent: 'center', paddingBottom: 20, paddingTop: 20, }}>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Image source={imgBook} style={{ width: 28, height: 28, resizeMode: 'contain' }}></Image>
                                            <Text style={{ fontSize: 18, fontFamily: 'KHNPHDotfR', color: "#000", marginLeft: 8 }}>나의 시술 일정</Text>
                                        </View>

                                        <View style={{ paddingRight: 20, marginTop: 13 }}>
                                            <DashedLine dashLength={4} dashColor='#afafaf' />
                                        </View>

                                        {this.state.opuDate.length > 0 && <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", marginTop: 16 }}>{Moment(this.state.opuDate).format("YYYY년 MM월 DD일") + " - 난자 채취일입니다."}</Text>}
                                        {this.state.etDate.length > 0 && <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", marginTop: 4 }}>{Moment(this.state.etDate).format("YYYY년 MM월 DD일") + " - 배아 이식일입니다."}</Text>}

                                        {this.state.embryoDates.length > 0 && (
                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", marginTop: 4 }}>{Moment(this.state.embryoDates[0]).format("YYYY년 MM월 DD일") + ' - 배아 동결일입니다.'}</Text>
                                        )}

                                        {this.state.oocyteDates.length > 0 && (
                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", marginTop: 4 }}>{Moment(this.state.oocyteDates[0]).format("YYYY년 MM월 DD일") + ' - 난자 동결일입니다.'}</Text>
                                        )}

                                        {(this.state.opuDate.length > 0 || this.state.etDate.length > 0 || this.state.datas.length > 0 || this.state.cryo.length > 0) == true ? (
                                            <Text style={{ marginTop: 21, fontSize: 13, fontFamily: 'KHNPHUotfR', color: "#000", textAlign: 'center', paddingRight: 20 }}>{"Step 01 ~ 04는 등록과 동시에 푸시 전송이 되오니,\n푸시 알림을 켜두시기 바랍니다."}</Text>) : (
                                            <View style={{ width: '100%', alignItems: 'center' }}><Text style={{ marginTop: 21, fontSize: 13, fontFamily: 'KHNPHUotfR', color: "#000" }}>{"일정이 확정되면 등록됩니다."}</Text></View>
                                        )}
                                    </View>
                                </View>

                                {this.state.chartDatas.length > 0 && (
                                    <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: 'white', borderRadius: 16, marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 16 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={imgCategory} style={{ width: 28, height: 28, resizeMode: 'contain' }}></Image>
                                                <Text style={{ fontSize: 18, fontFamily: 'KHNPHDotfR', color: "#000", marginLeft: 8 }}>{this.state.selectedChartText}</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ oneBtnDialogVisible: true })}>
                                                <View style={{ width: 62, height: 32, backgroundColor: '#63beb1', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'KHNPHDotfR' }}>차수선택</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        <View style={{ marginTop: 13 }}>
                                            <DashedLine dashLength={4} dashColor='#afafaf' />
                                        </View>

                                        {/* select category */}
                                        <View style={{ marginTop: 20, }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableWithoutFeedback onPress={() => this.setState({ selectedCategory: '1' })}>
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.selectedCategory == "1" ? "#f6f7f9" : "#e6e6e6") }}>
                                                        <Text style={{ color: (this.state.selectedCategory == "1" ? "#4b51c3" : "#565960"), fontSize: 16, fontFamily: 'KHNPHDotfR', lineHeight: 20, marginTop: 10, textAlign: 'center' }}>{"수정\n결과"}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                <View style={{ width: 1 }}></View>
                                                <TouchableWithoutFeedback onPress={() => this.setState({ selectedCategory: '2' })}>
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.selectedCategory == "2" ? "#f6f7f9" : "#e6e6e6") }}>
                                                        <Text style={{ color: (this.state.selectedCategory == "2" ? "#4b51c3" : "#565960"), fontSize: 16, fontFamily: 'KHNPHDotfR', lineHeight: 20, marginTop: 10, textAlign: 'center' }}>{"배아\n등급"}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                <View style={{ width: 1 }}></View>
                                                <TouchableWithoutFeedback onPress={() => this.setState({ selectedCategory: '3' })}>
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.selectedCategory == "3" ? "#f6f7f9" : "#e6e6e6") }}>
                                                        <Text style={{ color: (this.state.selectedCategory == "3" ? "#4b51c3" : "#565960"), fontSize: 16, fontFamily: 'KHNPHDotfR', lineHeight: 20, marginTop: 10, textAlign: 'center' }}>{"배아\n사진"}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                <View style={{ width: 1 }}></View>
                                                <TouchableWithoutFeedback onPress={() => this.setState({ selectedCategory: '4' })}>
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.selectedCategory == "4" ? "#f6f7f9" : "#e6e6e6") }}>
                                                        <Text style={{ color: (this.state.selectedCategory == "4" ? "#4b51c3" : "#565960"), fontSize: 16, fontFamily: 'KHNPHDotfR', marginTop: 10, textAlign: 'center' }}>{"동결"}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                            </View>
                                        </View>

                                        <View style={{ backgroundColor: '#f6f7f9', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                                            {this.state.selectedCategory == "1" && (
                                                <View style={{ marginTop: 25, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, }}>
                                                    {(this.state.delay_push == 1 && this.state.dIcsiNo !== '0' || this.state.delay_push == 1 && this.state.dIvfNo !== '0' || this.state.normal_push == 1) == false && (
                                                        <View>
                                                            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', lineHeight: 20 }}>{"채취된 난자와 수정된 결과를 알려드립니다."}</Text>
                                                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 6, lineHeight: 18 }}>{"*채취 다음날 등록되며, 공휴일과 추가 수정은 그 다음날 등록됩니다."}</Text>
                                                            <Image source={icTest01} style={{ width: (screenWidth - 120), height: ((screenWidth - 120) * 0.5), resizeMode: 'contain', borderRadius: 24, marginTop: 7 }}></Image>
                                                        </View>
                                                    )}

                                                    {this.state.delay_push == 1 && this.state.dIcsiNo !== '0' && (
                                                        <View style={{ marginTop: 15, padding: 14, width: screenWidth - 120, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"*미성숙한 난자 채취로 인해 난자 채취"}</Text>
                                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                <Text style={{ opacity: 0, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"*"}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"다음날 추가 "}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA" }}>{"미세수정 "}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"진행하였습니다."}</Text>
                                                            </View>
                                                            <Text style={{ marginTop: 24, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", lineHeight: 25 }}>{"추가미세수정 " + this.state.dIcsiNo + "개 -> " + this.state.dIcsi2PN + "개 수정되어,"}</Text>
                                                            <Text style={{ marginTop: 18, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA", }}>{"총 " + (parseInt(this.state.icsi2PN) + parseInt(this.state.ivf2PN) + parseInt(this.state.dIvf2PN) + parseInt(this.state.dIcsi2PN)) + "개 수정되었습니다."}</Text>
                                                        </View>
                                                    )}

                                                    {this.state.delay_push == 1 && this.state.dIvfNo !== '0' && (
                                                        <View style={{ marginTop: 15, padding: 14, width: screenWidth - 120, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"*미성숙한 난자 채취로 인해 난자 채취"}</Text>
                                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                <Text style={{ opacity: 0, fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"*"}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"다음날 추가 "}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA" }}>{"자연수정 "}</Text>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB' }}>{"진행하였습니다."}</Text>
                                                            </View>
                                                            <Text style={{ marginTop: 24, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", lineHeight: 25 }}>{"추가자연수정 " + this.state.dIvfNo + "개 -> " + this.state.dIvf2PN + (this.state.dIcsiNo == 0 ? "개 수정되어," : "개 수정")}</Text>
                                                            {/* <Text style={{ marginTop: 18, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA", }}>{"총 " + (parseInt(this.state.dIvf2PN)) + "개 수정되었습니다."}</Text> */}
                                                            {this.state.dIcsiNo == 0 && <Text style={{ marginTop: 18, fontSize: 12, fontFamily: 'KHNPHDotfB', color: "#4A50CA", }}>{"총 " + (parseInt(this.state.icsi2PN) + parseInt(this.state.ivf2PN) + parseInt(this.state.dIvf2PN)) + "개 수정되었습니다."}</Text>}
                                                        </View>
                                                    )}

                                                    {this.state.normal_push == 1 && (
                                                        <View style={{ marginTop: 15, padding: 14, width: screenWidth - 120, backgroundColor: '#fff', borderRadius: 24, alignItems: 'center', justifyContent: 'center', resizeMode: 'contain', }}>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"채취된 난자는 총 " + this.state.totalOpu + "개 입니다."}</Text>
                                                            <Text style={{ marginTop: 24, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000", lineHeight: 25 }}>{"미세수정 " + this.state.icsiNo + "개 -> " + this.state.icsi2PN + "개\n" + "자연수정 " + this.state.ivfNo + "개 -> " + this.state.ivf2PN + "개"}</Text>
                                                            {(this.state.dIvfNo == 0 && this.state.dIcsiNo == 0) && <Text style={{ marginTop: 18, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA", }}>{"총 " + (parseInt(this.state.icsi2PN) + parseInt(this.state.ivf2PN)) + "개 수정되었습니다."}</Text>}
                                                        </View>)}
                                                </View>
                                            )}
                                            {this.state.selectedCategory == "2" && (
                                                <View style={{ marginTop: 25, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, }}>
                                                    {this.state.fertilication.length == 0 && (
                                                        <View>
                                                            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', lineHeight: 20 }}>{"수정된 배아는 1~5등급 배반포로 나누어집니다."}</Text>
                                                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 6, lineHeight: 18 }}>{"*채취 2일 후부터 안내해 드리며, 이식 당일은 등록되지 않습니다."}</Text>
                                                            <Image source={icTest02} style={{ width: (screenWidth - 120), height: ((screenWidth - 120) * 0.5), resizeMode: 'contain', borderRadius: 24, marginTop: 7 }}></Image>
                                                        </View>
                                                    )}
                                                    {this.state.fertilication.map((item, index) => (
                                                        <View style={{ width: screenWidth - 120, marginRight: (index == this.state.fertilication.length - 1 ? 24 : 0), backgroundColor: '#fff', borderRadius: 24, marginTop: 15 }}>
                                                            <View style={{ padding: 14 }}>
                                                                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#000" }}>{`채취 후 ${this.state.fertilication[this.state.fertilication.length - (index + 1)].dayStr} 배아 발달 상태입니다.`}</Text>
                                                                <Text style={{ marginTop: 18, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA", lineHeight: 25 }}>{this._DegreeText(this.state.fertilication.length - (index + 1))}</Text>
                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            {this.state.selectedCategory == "3" && (
                                                <View style={{ marginTop: 25, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, }}>
                                                    {this.state.datas.length == 0 && (
                                                        <View>
                                                            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', lineHeight: 20 }}>{"이식된 배아 사진을 확인하실 수 있습니다."}</Text>
                                                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 6, lineHeight: 18 }}>{"*이식 당일 오후에 등록되며, 사정에 따라 지연될 수 있습니다."}</Text>
                                                            <Image source={icTest03} style={{ width: (screenWidth - 120), height: ((screenWidth - 120) * 0.5), resizeMode: 'contain', borderRadius: 24, marginTop: 7 }}></Image>
                                                        </View>
                                                    )}
                                                    <ScrollView style={{}} horizontal={true}>
                                                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                                            {this.state.datas.map((item, index) => (
                                                                <TouchableWithoutFeedback onPress={() => this._SnapTo(index)}>
                                                                    <View style={{ width: 106, height: 106, backgroundColor: '#fff', marginLeft: (index == 0 ? 0 : 12), ...Elevations[4], alignItems: 'center', justifyContent: 'center' }}>
                                                                        <FastImage style={{ width: '90%', height: '90%', resizeMode: 'contain', borderRadius: 8 }} source={{ uri: ServerUrl.Server + "/" + item.uri, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }} resizeMode={FastImage.resizeMode.contain}></FastImage>
                                                                        {/* <Image source={{ uri: ServerUrl.Server + "/" + item.uri }} style={{ width: '90%', height: '90%', resizeMode: 'contain', borderRadius: 8 }}></Image> */}
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                            ))}
                                                        </View>
                                                    </ScrollView>


                                                </View>
                                            )}
                                            {this.state.selectedCategory == "4" && (
                                                <View style={{ marginTop: 25, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, }}>
                                                    {(this.state.cryo.length == 0 && this.state.cryo2.length == 0) && (
                                                        <View>
                                                            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', lineHeight: 20 }}>{"이번 시술에서 동결된 배아 정보입니다."}</Text>
                                                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'KHNPHDotfR', lineHeight: 18 }}>{"*동결 관련 비용과 기간에 관하여는 주치의와 상의 후에 결정됩니다."}</Text>
                                                            <Image source={icTest04} style={{ width: (screenWidth - 120), height: ((screenWidth - 120) * 0.5), resizeMode: 'stretch', borderRadius: 24, marginTop: 7 }}></Image>
                                                        </View>
                                                    )}
                                                    {this.state.cryo.map((item, index) => (
                                                        <View style={{ width: screenWidth - 120, backgroundColor: '#fff', padding: 14, marginTop: 15, borderRadius: 24 }}>
                                                            <View style={{ marginTop: 0 }}>
                                                                <Text style={{ marginTop: 0, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }} onPress={() => this.setState({ animation: true })}>{(this.state.cryo.length - 1 - index != 0 ? "추가로 " : "") + "배아 " + this.state.cryo[this.state.cryo.length - 1 - index].count + "개가 동결되었습니다."}</Text>
                                                                {/* <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"동결보존일은 " + Moment(item.cryoDate).format("YYYY년 M월 D일") + "이며"}</Text> */}
                                                                {(index != 0 || this.state.cryo.length == 1) && <Text style={{ marginTop: 12, fontSize: 12, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"*추가로 동결 가능한 " + "배아" + "가 있을 시에는 다음날 등록됩니다."}</Text>}
                                                                {(index == 0 && this.state.cryo.length > 1) && <Text style={{ marginTop: 12, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA" }}>{"총 " + this.state.cryo[this.state.cryo.length - 1 - index].totalCount + "개의 배아가 동결되었습니다."}</Text>}
                                                            </View>
                                                        </View>
                                                    ))}

                                                    {this.state.cryo2.map((item, index) => (
                                                        <View style={{ width: screenWidth - 120, backgroundColor: '#fff', padding: 14, marginTop: 15, borderRadius: 24 }}>
                                                            <View style={{ marginTop: 0 }}>
                                                                <Text style={{ marginTop: 0, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }} onPress={() => this.setState({ animation: true })}>{(this.state.cryo2.length - 1 - index != 0 ? "추가로 " : "") + "난자 " + this.state.cryo2[this.state.cryo2.length - 1 - index].count + "개가 동결되었습니다."}</Text>
                                                                {/* <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"동결보존일은 " + Moment(item.cryoDate).format("YYYY년 M월 D일") + "이며"}</Text> */}
                                                                {(index != 0 || this.state.cryo2.length == 1) && <Text style={{ marginTop: 12, fontSize: 12, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"*추가로 동결 가능한 " + "난자" + "가 있을 시에는 다음날 등록됩니다."}</Text>}
                                                                {(index == 0 && this.state.cryo2.length > 1) && <Text style={{ marginTop: 12, fontSize: 14, fontFamily: 'KHNPHDotfB', color: "#4A50CA" }}>{"총 " + this.state.cryo2[this.state.cryo2.length - 1 - index].totalCount + "개의 난자가 동결되었습니다."}</Text>}
                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>

                                            )}
                                        </View>
                                    </View>
                                )}

                                {this.state.cryo.length > 0 && (
                                    <View style={{ marginTop: 15, backgroundColor: '#fff', borderRadius: 24, marginLeft: 20, marginRight: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, marginBottom: 20 }}>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 16 }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={imgCell} style={{ width: 28, height: 28, resizeMode: 'contain' }}></Image>
                                                <Text style={{ fontSize: 18, fontFamily: 'KHNPHDotfR', color: "#000", marginLeft: 8 }}>{"나의 잔여 배아"}</Text>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 13 }}>
                                            <DashedLine dashLength={4} dashColor='#afafaf' />
                                        </View>

                                        <Animated.ScrollView
                                            horizontal
                                            pagingEnabled
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            onScroll={Animated.event(
                                                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                                                { useNativeDriver: true })}
                                        >
                                            {this.state.cryo.map((item, index) =>
                                            (
                                                <View style={{ marginTop: 15, backgroundColor: '#f6f7f9', height: 120, width: screenWidth - 80 }}>
                                                    <View style={{ padding: 15, height: '100%' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"채취일 : "}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{item.opuDate}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"동결일 : "}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{item.cryoDate}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"잔여 배아 갯수 : "}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{item.remaining}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{"보존기간 만료일 : "}</Text>
                                                            <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfR', color: "#000" }}>{item.expiredDate}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                            )}
                                        </Animated.ScrollView>
                                        {this.state.cryo.length > 1 && (<View style={{
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 100,
                                            marginBottom: 0,
                                            marginTop: 15,
                                        }}>
                                            <RNAnimatedScrollIndicators
                                                numberOfCards={this.state.cryo.length}
                                                scrollWidth={screenWidth - 80}
                                                activeColor={'#4a50ca'}
                                                inActiveColor={'#e7e7e7'}
                                                scrollAnimatedValue={this.scrollX}
                                            />
                                        </View>)}
                                    </View>
                                )}
                            </View>
                        </ScrollView>

                    }
                    <FetchingIndicator isFetching={this.state.isFetching} message='' color='#4a50ca' />
                </View>
            </SafeAreaView>
        )
    }
}
