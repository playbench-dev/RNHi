import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class PregnancyDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contents: props.contents,
            leftBtnText: props.leftBtnText,
            rightBtnText: props.rightBtnText,
        };
    }

    render() {
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <View style={styles.backBgBody}>
                    <View style={styles.dialogBg}>
                        <View style={styles.titleBg}>
                            <Text style={styles.titleSt}>{"임신 초기 주의사항"}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#000000' }}></View>
                        <View style={styles.contentsBg}>
                            <View style={{ paddingLeft: 12, paddingRight: 12 }}>
                                <Text style={{ fontSize: 12, }}>{"* 임신 중 소량의 출혈은 있을 수 있습니다. 복통을 동반하여 패드에 적실 정도의 선홍색 출혈이 지속 시 병원에 연락 후 내원해 주시기 바랍니다."}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 12 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'1'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"엽산을 복용해 주세요."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'2'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"음식은 생선, 유제품, 채식으로 드시고 참치와 조개류는\n적게 드세요."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'3'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"사우나, 탕 목욕은 5분 이상 하지 마세요."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'4'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"커피는 하루 1잔 정도는 괜찮습니다."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'5'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"술은 안됩니다."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'6'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"일상적은 활동을 제한하지는 않습니다."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'7'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"안전밸트를 꼭 착용해주세요."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'8'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"정상 임신에는 성 생활을 제한하지 않습니다."}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'9'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"입덧의 증상 : 피곤함, 두통, 구역질, 소화불량, 변비"}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ backgroundColor: '#8379AA', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>{'10'}</Text>
                                </View>
                                <Text style={{ marginLeft: 8, fontSize: 12, }}>{"입덧의 해결법 : 짭잘한 과자, 과일, 주스, 사탕, 물, 바나나,\n호두, 땅콩, 씨리얼"}</Text>
                            </View>

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
        fontFamily: 'KHNPHDotfB'
    },
    contentsBg: {
        marginTop: 32,
        justifyContent: 'center',
    },
    contentsSt: {
        fontSize: 12,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        marginTop: 32,
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

export default PregnancyDialog;