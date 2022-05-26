import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class TwoBtnDialog extends Component {

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
            <Modal transparent={true} visible={true}>
                <View style={styles.backBgBody}>
                    <View style={styles.dialogBg}>
                        <View style={styles.titleBg}>
                            <Text style={styles.titleSt}>{this.state.title}</Text>
                        </View>
                        <View style={styles.contentsBg}>
                            <Text style={styles.contentsSt}>{this.state.contents}</Text>
                        </View>
                        <View style={styles.btnBg}>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: "cancel" })}>
                                <View style={styles.leftBtnBg}>
                                    <Text style={styles.leftSt}>{this.state.leftBtnText}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: "done" })}>
                                <View style={styles.rightBtnBg}>
                                    <Text style={styles.rightSt}>{this.state.rightBtnText}</Text>
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
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialogBg: {
        height: 180,
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
        lineHeight: 20,
    },
    btnBg: {
        height: 44,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    leftBtnBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: "#9699D6",
    },
    rightBtnBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: "#4A50CA",
        marginLeft: 23,
    },
    leftSt: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'KHNPHDotfR'
    },
    rightSt: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'KHNPHDotfR',

    },
})

export default TwoBtnDialog;

