import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import Moment from 'moment'
const TAG = "HopeMessageDetail";
const imgBack = require('../assets/ic_back.png');

export default class HopeMessageDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        type: 1,
        datas: '',
        name: '',
        maskingName: '',
        nameLength: 0,
    }

    maskingName = function (strName) {
        if (strName.length > 1) {
            var originName = strName.split('');
            originName.forEach(function (name, i) {
                if (i === 0) return;
                originName[i] = '*';
            });
            var joinName = originName.join();
            return joinName.replace(/,/g, '');
        } else {
            var pattern = /.$/; // 정규식
            return strName.replace(pattern, '*');
        }
    };

    render() {
        this.state.datas = this.props.route.params.datas;

        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>{"희망의 메세지"}</Text>

                    <ScrollView style={{ marginTop: 24, paddingLeft: 20, paddingRight: 20, marginBottom: 24 }}>
                        <View style={{ borderRadius: 24, backgroundColor: '#fff', padding: 20 }}>
                            <View style={{ width: 100, height: 30, borderRadius: 24, borderWidth: 1, borderColor: this.state.datas.kind == 1 ? '#E39C42' : "#4A50CA", alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: this.state.datas.kind == 1 ? '#E39C42' : "#4A50CA" }}>{this.state.datas.kind == 1 ? "임신했어요" : '출산했어요'}</Text>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>이름</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.maskingName(this.state.datas.customerName)}</Text>
                            </View>

                            {this.state.datas.kind == 1 ? <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                <Text style={{ flex: 1, fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>나이</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind1Age}</Text>
                            </View> : null}

                            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                <Text style={{ flex: 1, fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? "난임기간" : "출산일"}</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? this.state.datas.kind1Term : this.state.datas.kind2Childbirth}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                <Text style={{ flex: 1, fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? "시술이력" : "출산방법"}</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? this.state.datas.kind1Sisul : this.state.datas.kind2BirthType}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? "나만의 노력" : "아기정보"}</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 40 }}>
                                    <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.state.datas.kind == 1 ? this.state.datas.kind1Effort : this.state.datas.kind2Baby1 + "," + this.state.datas.kind2Baby2 + "," + this.state.datas.kind2Baby3}</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View>

                            <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16 }}>{this.state.datas.kind == 1 ? "아기를 기다리는 난임부부에게 전하고 싶은 말" : "출산하고 아기에게 처음 해준 말"}</Text>

                            <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 21, lineHeight: 20 }}>{this.state.datas.cont1.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡')}</Text>

                            {this.state.datas.kind == 1 ? null : <View>
                                <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View>
                                <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16 }}>주치의에게 전하고 싶은 말</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 21, lineHeight: 20 }}>{this.state.datas.cont2.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡')}</Text>
                            </View>}
                        </View>

                        {this.state.datas.answerYn == "Y" ? <View style={{ borderRadius: 24, backgroundColor: '#fff', padding: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16, flex: 1 }}>관리자 답변</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#AFAFAF', fontSize: 12 }}>{Moment(this.state.datas.answerDate).format("YYYY.MM.DD")}</Text>
                            </View>
                            <View style={{ marginTop: 21 }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 21, lineHeight: 20 }}>{this.state.datas.answerCont.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡')}</Text>
                            </View>
                        </View> : null}

                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}