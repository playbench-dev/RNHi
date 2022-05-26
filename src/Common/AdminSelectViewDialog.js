import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

class AdminSelectViewDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftBtnText: props.leftBtnText,
        };
    }

    render() {
        return (
            // animationType="slide" 
            <Modal transparent={true} visible={true}>
                <View style={styles.backBgBody}>
                    <View style={styles.dialogBg}>
                        <View style={styles.contentsBg}>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: '약' })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: "#4A50CA", height: '100%' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: "#fff",
                                        fontFamily: 'KHNPHDotfR',
                                    }}>약</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: '배아' })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: "#4A50CA", marginLeft: 14, height: '100%' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: "#fff",
                                        fontFamily: 'KHNPHDotfR',
                                    }}>배아</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: '알림' })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: "#4A50CA", marginLeft: 14, height: '100%' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: "#fff",
                                        fontFamily: 'KHNPHDotfR',
                                    }}>알림</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.props.clcik({ visible: false, status: '카카오' })}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: "#4A50CA", marginLeft: 14, height: '100%' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: "#fff",
                                        fontFamily: 'KHNPHDotfR',
                                    }}>{"카카오\n알림"}</Text>
                                </View>
                            </TouchableWithoutFeedback>

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
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialogBg: {
        height: 250,
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 12,
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
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        marginTop: 12,
    },
    contentsSt: {
        fontSize: 14,
        color: "#000",
        textAlign: 'center',
        fontFamily: 'KHNPHUotfR',
    },
    btnBg: {
        marginTop: 32,
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    leftBtnBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: "#9699D6",
    },
    leftSt: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'KHNPHDotfR',
    },
})

export default AdminSelectViewDialog;