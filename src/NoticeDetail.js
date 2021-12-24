import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Moment from 'moment'

const TAG = "NoticeDetail";
const imgBack = require('../assets/ic_back.png');

export default class NoticeDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        date : '',
        contents : '',
    }

    render() {
        console.log(TAG,'contents : ' + this.props.route.params.contents);
        this.state.date = this.props.route.params.date;
        this.state.contents = this.props.route.params.contents;
        return (
            <SafeAreaView>
                <View style = {{width: '100%', height: '100%', backgroundColor: '#F6F7F9'}}>    
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView style = {{width : '100%', paddingLeft : 20, paddingRight : 20, marginTop : 32, marginBottom : 32}}>
                        <View style = {{width : '100%', backgroundColor : '#fff', borderRadius : 24, paddingLeft : 20, paddingRight : 20, paddingBottom : 37}}>
                            <View style = {{width : '100%', height : 48, alignItems : 'flex-end', justifyContent : 'center', }}>
                                <Text style = {{fontSize :12, color : '#AFAFAF', fontFamily : 'KHNPHUotfR'}}>{Moment(this.state.date).format('YYYY.MM.DD HH:mm')}</Text>
                            </View>

                            <View style = {{width : '100%', height : 1, backgroundColor : '#AFAFAF'}}></View>

                            <Text style = {{marginTop : 20, fontSize :16, color : '#000', fontFamily : 'KHNPHUotfR', lineHeight : 25}}>{this.state.contents}</Text>
                        </View>
                    </ScrollView>
                    

                </View>
            </SafeAreaView>
        )
    }
}