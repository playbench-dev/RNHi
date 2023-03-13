import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';

const imgCheckOff = require('../../assets/ic_inquire_check_off.png');
const imgCheckOn = require('../../assets/ic_inquire_check_on.png');

class InformationDialog extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false })}>
                    <View style={styles.backBgBody}>
                        <View style={styles.dialogBg}>
                            <View style={styles.titleBg}>
                                <Text style={styles.titleSt}>{"진행과정 안내"}</Text>
                            </View>

                            <View style={{ marginTop: 26, width: '100%', backgroundColor: '#f2f3f4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 16, paddingBottom: 19 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'KHNPHDotfR' }}>{"Step.01 수정결과"}</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 12, textAlign: 'center', lineHeight: 22 }}>{"채취된 난자와 수정된 결과를 알려드립니다."}</Text>
                                <Text style={{ fontSize: 11, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 4, textAlign: 'center', lineHeight: 15 }}>{"*채취 다음날 등록되며, 공휴일과 추가 수정은 그 다음날 등록됩니다.\n*수정된 배아의 수는 등록시점 이후 배양과정에서 변경될 수 있습니다."}</Text>
                            </View>

                            <View style={{ marginTop: 14, width: '100%', backgroundColor: '#f2f3f4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 16, paddingBottom: 19 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'KHNPHDotfR' }}>{"Step.02 배아등급"}</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 12, textAlign: 'center', lineHeight: 22 }}>{"수정된 배아는 1~5등급, 배반포로 나누어집니다."}</Text>
                                <Text style={{ fontSize: 11, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 4, textAlign: 'center', lineHeight: 22 }}>{"*채취 2일 후부터 안내해 드리며, 이식 당일은 등록되지 않습니다."}</Text>
                            </View>

                            <View style={{ marginTop: 14, width: '100%', backgroundColor: '#f2f3f4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 16, paddingBottom: 19 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'KHNPHDotfR' }}>{"Step.03 배아사진"}</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 12, textAlign: 'center', lineHeight: 22 }}>{"이식된 배아 사진을 확인하실 수 있습니다."}</Text>
                                <Text style={{ fontSize: 11, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 4, textAlign: 'center', lineHeight: 22 }}>{"*이식 당일 오후에 등록되며, 사정에 따라 지연될 수 있습니다."}</Text>
                            </View>

                            <View style={{ marginTop: 14, width: '100%', backgroundColor: '#f2f3f4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 16, paddingBottom: 19 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'KHNPHDotfR' }}>{"Step.04 동결정보"}</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 12, textAlign: 'center', lineHeight: 22 }}>{"이번 시술에서 동결된 배아 정보입니다."}</Text>
                                <Text style={{ fontSize: 11, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 4, textAlign: 'center', lineHeight: 22 }}>{"*동결 관련 비용과 기간에 관하여는 주치의와 상의 후에 결정됩니다."}</Text>
                            </View>

                            <View style={{ marginTop: 14, width: '100%', backgroundColor: '#f2f3f4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 16, paddingBottom: 19 }}>
                                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'KHNPHDotfR' }}>{"Step.05 보존배아"}</Text>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 12, textAlign: 'center', lineHeight: 22 }}>{"22년 4월 이후 시술에서 생성된 보존배아의 보존기간 만료일을 확인하실 수 있습니다."}</Text>
                                <Text style={{ fontSize: 11, color: '#000', fontFamily: 'KHNPHDotfR', marginTop: 4, textAlign: 'center', lineHeight: 22 }}>{"*배아가 사용되었을 경우 정보가 사라집니다."}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backBgBody: {
        height: '100%',
        width: '100%',
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialogBg: {
        width: '100%',
        backgroundColor: "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 20,
    },
    titleBg: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleSt: {
        fontSize: 20,
        color: "#000",
        fontFamily: 'KHNPHDotfR'
    },
    contentsBg: {
        marginTop: 10,
        maxHeight: 200,
        width: '100%',
    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        marginTop: 32,
        height: 44,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    leftBtnBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: "#4A50CA",
    },
    leftSt: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'KHNPHDotfR',
    },
})

export default InformationDialog;