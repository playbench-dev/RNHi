import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';

const imgCheckOff = require('../../assets/ic_inquire_check_off.png');
const imgCheckOn = require('../../assets/ic_inquire_check_on.png');

class CellDevelopDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contents: props.contents,
            leftBtnText: props.leftBtnText,
            rightBtnText: props.rightBtnText,
            datas: props.datas,
            position: 0,
            chartNo: props.chartNo,
        };
    }

    onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    render() {
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false })}>
                    <View style={styles.backBgBody}>
                        <View style={styles.dialogBg}>
                            <View style={styles.titleBg}>
                                <Text style={styles.titleSt}>{this.state.title}</Text>
                            </View>

                            <ScrollView style={styles.contentsBg}>
                                <View style={{ paddingLeft: 20 }}>
                                    {this.state.datas.map((item, index) => <TouchableWithoutFeedback onPress={() => this.setState({ contents: item.label, position: index, chartNo: item.value })}>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                            <Image source={item.value == this.state.chartNo ? imgCheckOn : imgCheckOff} style={{ width: 24, height: 24, }}></Image>
                                            <Text style={{ fontSize: 14, color: "#000", fontFamily: 'KHNPHDotfR', marginLeft: 10 }}>{item.label}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>)}
                                </View>
                            </ScrollView>
                            <View style={styles.btnBg}>
                                <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, position: this.state.position })}>
                                    <View style={styles.leftBtnBg}>
                                        <Text style={styles.leftSt}>{this.state.leftBtnText}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
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
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        paddingBottom: 20,
    },
    titleBg: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleSt: {
        fontSize: 16,
        color: "#000",
        fontFamily: 'KHNPHDotfR'
    },
    contentsBg: {
        marginTop: 10,
        marginBottom: 44,
        maxHeight: '80%',
        minHeight: 50,
        width: '100%',
    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        height: 44,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        bottom: 15,
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

export default CellDevelopDialog;