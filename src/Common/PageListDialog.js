import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import PageList from "react-native-page-list";

class PageListDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contents: props.contents,
            leftBtnText: props.leftBtnText,
            rightBtnText: props.rightBtnText,
            datas: props.datas,
            position: 0,
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
                                    {/* <RadioGroup radioButtons = {this.state.datas} labelStyle = {{width : '10%', height : 100}} onValueChange = {(item, index) => console.log('aaaa : ' + item)}/> */}
                                    {this.state.datas.map((item, index) => <TouchableWithoutFeedback onPress={() => this.setState({ contents: item.label, position: index })}>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                            <Image source={item.label == this.state.contents ? imgCheckOn : imgCheckOff} style={{ width: 24, height: 24, }}></Image>
                                            <Text style={{ fontSize: 14, color: "#000", fontFamily: 'KHNPHDotfR', marginLeft: 10 }}>{item.label}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>)}
                                </View>
                            </ScrollView>
                            {/* <View style = {styles.contentsBg}>
                                <Text style = {styles.contentsSt}>{this.state.contents}</Text>
                            </View> */}
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
        height: 200,
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

export default PageListDialog;