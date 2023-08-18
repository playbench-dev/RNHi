import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class PregnancyCautionDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contents: props.contents,
            leftBtnText: props.leftBtnText,
            rightBtnText: props.rightBtnText,
            titleList: ['4~5주', '6~7주', '8~9주', '10~13주', '16~18주', '20~22주', '24~26주', '28주', '30주', '32주', '34주', '36주', '37주', '38~40주'],
            titleContents: [
                '아기 집 확인, 자궁, 난소 확인\n경부암 검진(1년 경과 시)',
                '아기 심박동 확인, 분만 예정일 확인\n[임신 초기 검사]빈혈,갑상선,간기능,매독,풍진,간염,에이즈 등',
                '아기 팔,다리 나옴 / 이전 검사 결과 확인', '[초기정밀초음파]목투명대, 코뼈\n1차 통합 선별 혈액검사(발견율 높은 니프티 검사 또는 양수 검사 상담)',
                '양수 검사 시행 시기(양수,태반,아기크기)\n2차 통합 선별 혈액검사',
                '[중기정밀초음파] 태아 장기 확인, 자궁 경부 길이, 양수 양, 태반 위치 확인',
                '입체초음파, 임신성 당뇨, 빈혈 검사(임당 판정 시 내과 진료)',
                '초음파 / 임신 제3분기 시작',
                '초음파 / 임산부 백일해 접종(신생아 백일해 예방)',
                '[후기정밀초음파] 태아 장기 이상 확인',
                '초음파 / 제왕절개술 날짜 확인',
                '초음파 / 막달검사\n(심전도, 폐사진, 빈혈, 매독, 간염, 에이즈, 질분비물(B형연쇄구균) 등)',
                '태동검사 / 이전 검사 결과 이상 시 설명',
                '초음파 / 내진 후 상담\n예정일 넘으면 주 1회/2회/태동검사 추가적으로 시행']
        };
    }

    render() {
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <View style={styles.backBgBody}>
                    <View style={styles.dialogBg}>
                        <View style={styles.titleBg}>
                            <Text style={styles.titleSt}>{"임신 중 받아야 할 검사"}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#000000' }}></View>
                        <View style={styles.contentsBg}>
                            <View style={{ flexDirection: 'row', height: 30 }}>
                                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#471B87' }}>
                                    <Text style={{ fontSize: 10, color: '#ffffff' }}>{"주수"}</Text>
                                </View>
                                <View style={{ width: 1, backgroundColor: '#D6D4D2' }}></View>
                                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#471B87' }}>
                                    <Text style={{ fontSize: 10, color: '#ffffff' }}>{"검사"}</Text>
                                </View>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#D6D4D2' }}></View>

                            {this.state.titleList.map((item, index) => {
                                return (
                                    <View>
                                        <View style={{ flexDirection: 'row', height: 35 }}>
                                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ fontSize: 9, color: '#000000' }}>{this.state.titleList[index]}</Text>
                                            </View>
                                            <View style={{ width: 1, backgroundColor: '#D6D4D2' }}></View>
                                            <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ fontSize: 9, color: '#000000', textAlign: 'center' }}>{this.state.titleContents[index]}</Text>
                                            </View>
                                        </View>
                                        <View style={{ height: 1, backgroundColor: '#D6D4D2' }}></View>
                                    </View>
                                )
                            })}

                        </View>
                        <View style={styles.btnBg}>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false })}>
                                <View style={styles.leftBtnBg}>
                                    <Text style={styles.leftSt}>{"확인"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backBgBody: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialogBg: {
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    titleBg: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2D15D',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    titleSt: {
        fontSize: 16,
        color: "#000",
        fontFamily: 'KHNPHDotfR'
    },
    contentsBg: {

    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        height: 44,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    leftBtnBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F2D15D",
    },
    leftSt: {
        fontSize: 16,
        color: "#000000",
        fontFamily: 'KHNPHDotfR',
    },
})

export default PregnancyCautionDialog;