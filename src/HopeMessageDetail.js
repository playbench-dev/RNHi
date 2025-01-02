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

    replaceText(text) {
        return text.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
    }

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
                        <View style={{ borderRadius: 24, backgroundColor: '#fff', padding: 20, borderWidth: 1, borderColor: '#333' }}>
                            {/* <View style={{ width: 100, height: 30, borderRadius: 24, borderWidth: 1, borderColor: this.state.datas.kind == 1 ? '#E39C42' : "#4A50CA", alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: this.state.datas.kind == 1 ? '#E39C42' : "#4A50CA" }}>{this.state.datas.kind == 1 ? "임신했어요" : '출산했어요'}</Text>
                            </View> */}

                            <Text style={{ fontSize: 18, fontFamily: 'KHNPHDotfB', color: '#000', marginTop: 13, marginBottom: 18 }}>{this.replaceText(this.state.datas.acf.name_prefix) + this.replaceText(this.state.datas.title.rendered) + this.replaceText(this.state.datas.acf.name_suffix)}</Text>

                            {/* <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View> */}

                            {/* <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>이름</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14 }}>{this.maskingName(this.state.datas.customerName)}</Text>
                            </View> */}

                            {/* 임신 */}
                            {
                                this.state.datas.acf.msg_type_form == 34 &&
                                <View style={{ backgroundColor: '#f1f2f3', borderRadius: 12, padding: 12 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ flex: 0.35, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12 }}>{"나이: " + this.state.datas.acf.age}</Text>
                                        <Text style={{ flex: 0.65, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12 }}>{"난임기간: " + this.state.datas.acf.period + "년"}</Text>
                                    </View>
                                    <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12, marginTop: 8, }}>{"시술 이력: " + this.state.datas.acf.ivf_history}</Text>
                                    <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12, marginTop: 4, lineHeight: 22 }}>{"나만의 노력: " + this.replaceText(this.state.datas.acf.my_effort)}</Text>

                                </View>
                            }
                            {/* 출산 */}
                            {
                                this.state.datas.acf.msg_type_form == 35 &&
                                <View style={{ backgroundColor: '#f1f2f3', borderRadius: 12, padding: 12 }}>
                                    <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12 }}>{"아기정보: " + this.state.datas.acf.baby_gender + ", " + this.state.datas.acf.baby_weight + "kg, " + this.state.datas.acf.baby_singluar_plural}</Text>
                                    <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12, marginTop: 6, lineHeight: 18 }}>{"아기에게 처음 해준 말: " + this.replaceText(this.state.datas.acf.the_first_words)}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12 }}>{"출산일: " + this.state.datas.acf.baby_birthday}</Text>
                                        <Text style={{ flex: 1, fontFamily: 'KHNPHDotfR', color: '#333', fontSize: 12 }}>{"출산방법: " + this.state.datas.acf.birthing_options}</Text>
                                    </View>

                                </View>
                            }
                            {/* 감사 */}
                            {
                                this.state.datas.acf.msg_type_form == 36 && null
                            }
                            {/* <View style={{ flexDirection: 'row', marginTop: 25 }}>
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
                            </View> */}

                            {/* <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View> */}

                            {/* <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16 }}>{this.state.datas.kind == 1 ? "아기를 기다리는 난임부부에게 전하고 싶은 말" : "출산하고 아기에게 처음 해준 말"}</Text> */}

                            <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 12, lineHeight: 24 }}>{this.replaceText(this.state.datas.content.rendered)}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 18 }}>
                                <View style={{ flex: 1 }}></View>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#333', fontSize: 12 }}>{Moment(this.state.datas.date).format("YYYY.MM.DD")}</Text>
                            </View>

                            {/* {this.state.datas.kind == 1 ? null : <View>
                                <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 1, backgroundColor: '#00000029' }}></View>
                                <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16 }}>주치의에게 전하고 싶은 말</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 21, lineHeight: 20 }}>{this.state.datas.cont2.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡')}</Text>
                            </View>} */}
                        </View>

                        {/* {this.state.datas.answerYn == "Y" ? <View style={{ borderRadius: 24, backgroundColor: '#fff', padding: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 16, flex: 1 }}>관리자 답변</Text>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#AFAFAF', fontSize: 12 }}>{Moment(this.state.datas.answerDate).format("YYYY.MM.DD")}</Text>
                            </View>
                            <View style={{ marginTop: 21 }}>
                                <Text style={{ fontFamily: 'KHNPHUotfR', color: '#000', fontSize: 14, marginTop: 21, lineHeight: 20 }}>{this.state.datas.answerCont.replace(/&quot;/gi, "\"").replace(/&ldquo;/gi, '\"').replace(/&rdquo;/gi, '\"').replace(/&iexcl;/gi, '¡')}</Text>
                            </View>
                        </View> : null} */}

                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}