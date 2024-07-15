import CheckBox from '@react-native-community/checkbox';
import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';

const imgCheckTrue = require('../../assets/ic_check_true.png');
const imgCheckFalse = require('../../assets/ic_check_false.png');

class BryoInfoDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contents: props.contents,
            leftBtnText: props.leftBtnText,
            rightBtnText: props.rightBtnText,
            allCheck: false,
            bryoFlag: props.bryoFlag,
        };
    }

    checkBoxEvent() {
        console.log('check ');
        this.setState({
            allCheck: true
        })
        this.props.clcik({ visible: false })
    }

    render() {
        console.log('asd', this.state.bryoFlag)
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <View style={styles.backBgBody}>
                    <View style={styles.dialogBg}>
                        <View style={styles.titleBg}>
                            <Text style={styles.titleSt}>{"보존배아 연장 및 폐기에 관한 주의사항"}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#000000' }}></View>
                        <View style={styles.contentsBg}>
                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingRight: 12, marginTop: this.state.bryoFlag == 0 ? 40 : 0, }}>
                                <ScrollView persistentScrollbar={true}>
                                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingRight: 12, marginTop: 0, }}>
                                        <Text style={{ fontSize: 15, fontFamily: 'KHNPHUotfR', textAlign: 'left', lineHeight: 22 }}>{"본원의 최초 동결 보존기간은 1년입니다.\n1년 단위로 추가 연장이 가능하며 비용이 발생합니다.\n만료일 이전에 연장 및 폐기에 관한 안내를 드리겠습니다."}</Text>

                                        <Text style={{ fontSize: 15, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 20, lineHeight: 22 }}>{"본인 및 배우자의 연락처 또는 주소 변경이 있을 시\n반드시 본원으로 알려주셔야 합니다."}</Text>

                                        <Text style={{ fontSize: 15, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 20, lineHeight: 22 }}>{"연락이 불가능하여 보존기간 만료일이 지난 배아는 자동으로 폐기됩니다."}</Text>

                                        <View style={{ height: 2, backgroundColor: '#ddd', marginTop: 20 }}></View>
                                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 14, lineHeight: 22 }}>{"배아의 보존 기간은 최초 배아 생성일부터 5년까지이며, 다음과 같은 경우에는 5년 이상 보관 가능합니다."}</Text>

                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, }}>{"·"}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, marginLeft: 8 }}>{"항암치료를 받았거나 받을 예정인 경우"}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, }}>{"·"}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, marginLeft: 8, lineHeight: 20 }}>{"해당 배아를 생성한 의료기관의 기관위원회가 동의자의 건강상 문제로 인해 생식세포 채취나 배아 생성이 어려울 것으로 판단한 경우"}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, }}>{"·"}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 0, marginLeft: 8 }}>{"그 외에 기관위원회가 배아를 5년 이상 보관할 필요가 있다고 인정하는 경우"}</Text>
                                        </View>

                                        <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', textAlign: 'left', marginTop: 14, lineHeight: 22 }}>{"5년 이상 보관을 원하시는 경우, 만료일 전까지 본원에 연락해주셔야 합니다.(*심사에 시간이 필요하므로 최소 만료일 한달 전까지 연락주시기 바랍니다)"}</Text>
                                        <View style={{ marginTop: 0 }}></View>
                                    </View>
                                </ScrollView>

                                {this.state.bryoFlag == 0 && <TouchableWithoutFeedback onPress={() => this.checkBoxEvent()}>
                                    <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                        <View style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, borderRadius: 30, backgroundColor: '#F2D15D', borderColor: '#F2D15D', borderWidth: 2, marginLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.titleSt}>확인하였습니다.</Text>
                                            <Image source={imgCheckFalse} style={{ width: 22, height: 22, marginLeft: 8, tintColor: '#000' }} ></Image>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>}
                            </View>


                        </View>
                        {this.state.bryoFlag == 1 && <View style={styles.btnBg}>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false })}>
                                <View style={styles.leftBtnBg}>
                                    <Text style={styles.leftSt}>{"닫기"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>}
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
        height: '70%',
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
        height: '70%'
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

export default BryoInfoDialog;