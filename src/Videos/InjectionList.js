import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput, FlatList, Dimensions } from 'react-native';
import Elevations from 'react-native-elevation';
import Users from '../Common/User'
import ServerUrl from '../Common/ServerUrl'
import Webview from 'react-native-webview';

const TAG = "InjectionList";
const imgBack = require('../../assets/ic_back.png');
const { width: screenWidth } = Dimensions.get('window')
export default class InjectionList extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: false,
        datas: [],
    }

    componentDidMount() {
        this._VideoInfo();
    }
    componentDidCatch() {
        console.log(TAG, 'componentDidCatch')
    }

    componentWillUnmount() {
        console.log(TAG, 'Unmount')
        try {
            throw new Error("Error");
        } catch (error) {
            // handle Error
        }
    }

    _VideoInfo() {
        var details = {
            'access_token': Users.AccessToken,
            'refresh_token': Users.RefreshToken,
            'category': '6',
        };

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch(ServerUrl.VideoListDetail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default',
            body: formBody,
        }).then(
            response => response.json()
        ).then(
            json => {
                console.log(TAG, json);
                if (json.Error_Cd == "0000") {
                    for (let i = 0; i < Object.keys(json.Resources).length; i++) {
                        const obj = {
                            title: json.Resources[i].title,
                            contents: json.Resources[i].contents,
                            videoUrl: json.Resources[i].file_url,
                        }
                        this.state.datas.push(obj);
                    }
                }
                this.setState({ isLoading: true });
            }
        )
    }

    _RenderItem = ({ item, index }) => {
        return <View key={index} style={{ marginTop: index == 0 ? 0 : 24, marginBottom: index == this.state.datas.length - 1 ? 40 : 0 }}>
            {item.videoUrl.length > 0 && <View style={{ backgroundColor: 'transparent', }}>
                <Webview style={{ width: (screenWidth - 150), height: ((screenWidth - 150) * 0.5625) }}
                    mediaPlaybackRequiresUserAction={true}
                    allowsInlineMediaPlayback={true}
                    javaScriptEnabled={true}
                    allowsFullscreenVideo={true}
                    domStorageEnabled={true}
                    source={{
                        uri: `https://player.vimeo.com/video/${item.videoUrl}&amp;badge=1&amp;autopause=1&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"`,
                    }} />
            </View>}

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontFamily: 'KHNPHDotfB', color: '#000' }}>{item.title}</Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontFamily: 'KHNPHUotfR', color: '#000', lineHeight: 20 }} >{item.contents}</Text>
            </View>
        </View>
    }

    render() {
        console.log(TAG, "end");
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#F6F7F9' }}>
                    <View style={{ width: '100%', height: 48 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                            <View style={{ width: 40, height: 48, justifyContent: 'center' }}>
                                <Image source={imgBack} style={{ width: 24, height: 24, resizeMode: 'contain', marginLeft: 24 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Text style={{ marginLeft: 20, fontFamily: 'KHNPHDotfR', color: '#000', fontSize: 20, marginTop: 12 }}>{"주사별 영상"}</Text>

                    <FlatList style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20 }} data={this.state.datas} renderItem={this._RenderItem} keyExtractor={(item, index) => index.toString()}></FlatList>
                    {this.state.datas.length == 0 && <View></View>}
                </View>
            </SafeAreaView>
        )
    }
}