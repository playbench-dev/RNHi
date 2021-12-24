import React from 'react'
import {SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, Dimensions} from 'react-native';
import Elevations from 'react-native-elevation';
import {Vimeo} from 'react-native-vimeo-iframe';
import Users from '../Common/User'
import ServerUrl from '../Common/ServerUrl'

const TAG = "SelfInjection";
const imgBack = require('../../assets/ic_back.png');
const { width: screenWidth } = Dimensions.get('window')
export default class SelfInjection extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading : false,
        title : '',
        contents : '',
        videoUrl : '',
    }

    componentDidMount(){
        this._VideoInfo();
    }

    _VideoInfo(){
        var details = {
          'access_token' : Users.AccessToken,
          'refresh_token' : Users.RefreshToken,
          'category' : '5',
        };
        
        var formBody = [];
    
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
    
        formBody = formBody.join("&");
        
        fetch(ServerUrl.VideoListDetail,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode : 'cors',
            cache : 'default',
            body : formBody,
            }).then(
                response => response.json()  
            ).then(
                json => {
                  console.log(TAG,json);
                  if(json.Error_Cd == "0000"){
                    if(Object.keys(json.Resources).length > 0){
                        this.state.title = json.Resources[0].title;
                        this.state.contents = json.Resources[0].contents;
                        this.state.videoUrl = json.Resources[0].video_id;
                    }
                  }
                  this.setState({isLoading : true});
            }
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{width: '100%', height: '100%', backgroundColor: '#F6F7F9'}}>
                    <View style = {{width : '100%', height : 48}}>
                        <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                            <View style = {{width : 40, height : 48, justifyContent : 'center'}}>
                                <Image source = {imgBack} style = {{width : 24, height : 24, resizeMode : 'contain', marginLeft : 24}}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style = {{marginLeft : 20, fontFamily : 'KHNPHDotfR', color : '#000', fontSize : 20, marginTop : 12}}>{"자가주사 방법"}</Text>

                    <ScrollView style = {{marginTop : 20, paddingLeft : 20, paddingRight : 20}}>
                        {this.state.videoUrl.length > 0 && <View style = {{borderRadius : 12, backgroundColor : '#ededed', width : '100%', height : (screenWidth - 40) * 0.55, alignItems : 'center', justifyContent : 'center'}}>
                            <Vimeo videoId={this.state.videoUrl} onReady={() => console.log('ready')} onPlay={() => console.log('playing')} onPlayProgress={(data) => console.log('data:', data)} onFinish={() => console.log('inish')} loop={false} autoPlay={false} controls={true} speed={false} style = {{width : 1296, height : 540}}/>
                        </View>}

                        <View style = {{marginTop: 20}}>
                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHDotfB', color : '#000'}}>{this.state.title}</Text>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <Text style = {{fontSize : 14, fontFamily : 'KHNPHUotfR', color : '#000',lineHeight : 20}} >{this.state.contents}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}