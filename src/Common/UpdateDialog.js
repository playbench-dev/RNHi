import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class OneBtnDialog extends Component {

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
                            <Text style={styles.titleSt}>{this.state.title}</Text>
                        </View>
                        <View style={styles.contentsBg}>
                            <Text style={styles.contentsSt}>{this.state.contents}</Text>
                            <Text style={{ marginTop: 12, fontSize: 11, textAlign: 'center', color: '#FF9090' }}>{"*구글스토어에 업데이트 문구가 뜨지 않을 경우\n구글스토어를 재실행시켜주세요."}</Text>
                        </View>
                        <View style={styles.btnBg}>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false })}>
                                <View style={styles.leftBtnBg}>
                                    <Text style={styles.leftSt}>{this.state.leftBtnText}</Text>
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
        height: 250,
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
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        marginBottom: 12,
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

export default OneBtnDialog;