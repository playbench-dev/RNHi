import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, Modal } from 'react-native';
import Elevations from 'react-native-elevation';
import PageList from "react-native-page-list";

const TAG = "Caution";
const imgBack = require('../assets/ic_back.png');
const imgClose = require('../assets/ic_calendar_back.png');
const imgSperm01 = require('../assets/img_sperm_01.jpg');
const imgSperm02 = require('../assets/img_sperm_02.jpg');
const imgSperm03 = require('../assets/img_sperm_03.jpg');
const imgSperm04 = require('../assets/img_sperm_04.jpeg');

const imgOvum01 = require('../assets/img_ovum_01.jpg');
const imgOvum02 = require('../assets/img_ovum_02.jpg');
const imgOvum03 = require('../assets/img_ovum_03.jpg');
const imgOvum04 = require('../assets/img_ovum_04.jpg');

const imgEmbryos01 = require('../assets/img_embryos_01.jpg');
const imgEmbryos02 = require('../assets/img_embryos_02.jpg');
const imgEmbryos03 = require('../assets/img_embryos_03.jpg');

const imgOperation01 = require('../assets/img_operation_01.jpg');
const imgOperation02 = require('../assets/img_operation_02.jpg');
const imgOperation03 = require('../assets/img_operation_03.jpg');
const imgOperation04 = require('../assets/img_operation_04.jpg');
const imgOperation05 = require('../assets/img_operation_05.jpg');
const imgOperation06 = require('../assets/img_operation_06.jpg');
const imgOperation07 = require('../assets/img_operation_07.jpg');
const imgOperation08 = require('../assets/img_operation_08.jpg');
const imgOperation09 = require('../assets/img_operation_09.jpg');

export default class Caution extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        spermDatas: [imgSperm01, imgSperm02, imgSperm03, imgSperm04],
        ovumDatas: [imgOvum01, imgOvum02, imgOvum03, imgOvum04],
        embryosDatas: [imgEmbryos01, imgEmbryos02, imgEmbryos03],
        operationDatas: [imgOperation01, imgOperation02, imgOperation03, imgOperation04, imgOperation05, imgOperation06, imgOperation07, imgOperation08, imgOperation09],
        type: 1,
        clickItemPosition: 0,
        imgMagnify: false,
    }

    _ImageMagnify() {
        return (
            <Modal transparent={true} visible={this.state.imgMagnify} onRequestClose={() => this.setState({ imgMagnify: false })}>
                <View style={{ height: '100%', width: '100%', justifyContent: "center", alignItems: 'center', backgroundColor: 'rgb(0,0,0)', }}>
                    <View style={{ width: '100%', height: '10%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ imgMagnify: false })}>
                            <Image source={imgClose} style={{ tintColor: 'white', width: 40, height: 40, resizeMode: 'contain', marginRight: 12 }} ></Image>
                        </TouchableWithoutFeedback>

                    </View>
                    <View style={{ width: '100%', height: '80%' }}>
                        <PageList style={{ width: '100%', height: '100%', showsHorizontalScrollIndicator: false, }} initialPage={this.state.clickItemPosition} data={(this.state.type == 1 ? this.state.spermDatas : (this.state.type == 2 ? this.state.ovumDatas : (this.state.type == 3 ? this.state.embryosDatas : this.state.operationDatas)))} renderItem={({ item, index }) => {
                            return (
                                <View key={index} style={{ flex: 1 }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={item} />
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

    _SnapTo(type, value) {

        // if(value < this.state.clickItemPosition){
        //     this._carousel.snapToPrev()
        // }else if(value > this.state.clickItemPosition){
        //     this._carousel.snapToNext()
        // }
        this.state.type = type;
        this.state.clickItemPosition = value;
        this.setState({ imgMagnify: true })
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    {this._ImageMagnify()}
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>{"주의사항"}</Text>

                    <ScrollView style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 20 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 20, marginTop: 12 }}>{"난자채취"}</Text>
                        <ScrollView horizontal={true} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {this.state.spermDatas.map((item, index) => (<TouchableWithoutFeedback onPress={() => this._SnapTo(1, index)}><View><Image source={item} style={{ resizeMode: 'contain', width: 272, height: 272, marginLeft: (index == 0 ? 0 : 20), borderRadius: 24, }}></Image></View></TouchableWithoutFeedback>))}
                        </ScrollView>

                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 20, marginTop: 32 }}>{"정액채취"}</Text>
                        <ScrollView horizontal={true} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {this.state.ovumDatas.map((item, index) => (<TouchableWithoutFeedback onPress={() => this._SnapTo(2, index)}><View><Image source={item} style={{ resizeMode: 'contain', width: 272, height: 272, marginLeft: (index == 0 ? 0 : 20), borderRadius: 24, }}></Image></View></TouchableWithoutFeedback>))}
                        </ScrollView>

                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 20, marginTop: 32 }}>{"배아이식"}</Text>
                        <ScrollView horizontal={true} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {this.state.embryosDatas.map((item, index) => (<TouchableWithoutFeedback onPress={() => this._SnapTo(3, index)}><View><Image source={item} style={{ resizeMode: 'contain', width: 272, height: 272, marginLeft: (index == 0 ? 0 : 20), borderRadius: 24, }}></Image></View></TouchableWithoutFeedback>))}
                        </ScrollView>

                        <Text style={{ fontFamily: 'KHNPHDotfB', color: '#000', fontSize: 20, marginTop: 32 }}>{"수술 후"}</Text>
                        <ScrollView horizontal={true} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {this.state.operationDatas.map((item, index) => (<TouchableWithoutFeedback onPress={() => this._SnapTo(4, index)}><View><Image source={item} style={{ resizeMode: 'contain', width: 272, height: 272, marginLeft: (index == 0 ? 0 : 20), borderRadius: 24, }}></Image></View></TouchableWithoutFeedback>))}
                        </ScrollView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}