import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, StatusBar, StyleSheet,TouchableWithoutFeedback, Dimensions, Modal, BackHandler,Animated,Easing} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Elevations from 'react-native-elevation';
import Carousel ,{ ParallaxImage } from 'react-native-snap-carousel';
import Moment from 'moment'
import ServerUrl from './Common/ServerUrl'
import Users from './Common/User'
import CellDevelopDialog from './Common/CellDevelopDialog'
import PageList from "react-native-page-list";
import RNAnimated from 'react-native-animated-component'

const TAG = "AnimationTest";

export default class AnimationTest extends React.Component{
    constructor(props){
        super(props)
        this.btn = React.createRef();
        this.firstView = React.createRef();
        this.animationOne = new Animated.Value(24);
        this.animationTwo = new Animated.Value(24);
        this.animationThree = new Animated.Value(24);
        this.animationFour = new Animated.Value(24);
        this.scrFirst = React.createRef();
    }

    state = {
        fullWidth : Dimensions.get('screen').width - 40,
        firstFlag : false,
        firstViewWidth : new Animated.Value(0),
        secondFlag : false,
        secondViewWidth : new Animated.Value(0),
        thirdFlag : false,
        thirdViewWidth : new Animated.Value(0),
        fourFlag : false,
        fourViewWidth : new Animated.Value(0),
        scrollFirstFlag : false,
        scrollSecondFlag : false,
        scrollThirdFlag : false,
        scrollFourFlag : false,
    }

    handleOneAnimation = () => {
        console.log(TAG,'click' + this.state.firstFlag)
        if(this.state.firstFlag == true){
            this.setState({firstFlag : false, scrollFirstFlag : false})
            this.scrFirst.scrollTo({x : 0, animated : true})
            Animated.timing(this.animationOne,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.firstViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({firstFlag : true, scrollFirstFlag : true})
            Animated.timing(this.animationOne,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.firstViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleTwoAnimation = () => {
        if(this.state.secondFlag == true){
            this.setState({secondFlag : false, scrollSecondFlag : false})
            Animated.timing(this.animationTwo,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.secondViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({secondFlag : true, scrollSecondFlag : true})
            Animated.timing(this.animationTwo,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.secondViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleThirdAnimation = () => {
        if(this.state.thirdFlag == true){
            this.setState({thirdFlag : false, scrollThirdFlag : false})
            Animated.timing(this.animationThree,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.thirdViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({thirdFlag : true, scrollThirdFlag : true})
            Animated.timing(this.animationThree,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.thirdViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }

    handleFourAnimation = () => {
        if(this.state.fourFlag == true){
            this.setState({fourFlag : false, scrollFourFlag : false})
            Animated.timing(this.animationFour,{
                toValue : 24,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.fourViewWidth,{
                toValue : 0,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }else{
            this.setState({fourFlag : true, scrollFourFlag : true})
            Animated.timing(this.animationFour,{
                toValue : 300,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.fourViewWidth,{
                toValue : 1,
                duration : 200,
                easing : Easing.ease,
                useNativeDriver: false
            }).start()
        }
    }


    render() {
        return(
            <SafeAreaView>
                <View style = {{width: '100%', height : '100%', backgroundColor : '#000', paddingLeft : 20, paddingRight : 20}}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <RNAnimated appearFrom="top" animationDuration={500} >
                            <View style = {{width: '100%', height : 200, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView ref = {ref => this.scrFirst = ref} style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollFirstFlag}>
                                    
                                        <TouchableWithoutFeedback onPress = {() => this.handleOneAnimation()}>
                                            <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                                <Animated.View ref = {this.firstView} style = {{width : this.state.firstViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 90]}), height : this.state.firstViewWidth.interpolate({inputRange : [0,1], outputRange : [200, 90]}), backgroundColor : 'white', borderRadius : this.animationOne, }}>
                                                </Animated.View>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <View style = {{width : 300, height : 200, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24}}></View>
                                   
                                </ScrollView>
                            </View>
                        </RNAnimated>

                        <RNAnimated appearFrom="top" animationDuration={1000} >
                            <View style = {{width: '100%', height : 200, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollSecondFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleTwoAnimation()}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.View ref = {this.firstView} style = {{width : this.state.secondViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 90]}), height : this.state.secondViewWidth.interpolate({inputRange : [0,1], outputRange : [200, 90]}), backgroundColor : 'white', borderRadius : this.animationTwo, }}>
                                            </Animated.View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {{width : 300, height : 200, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24}}></View>
                                </ScrollView>
                            </View>
                        </RNAnimated>

                        <RNAnimated appearFrom="top" animationDuration={1500} >
                            <View style = {{width: '100%', height : 200, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollThirdFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleThirdAnimation()}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.View ref = {this.firstView} style = {{width : this.state.thirdViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 90]}), height : this.state.thirdViewWidth.interpolate({inputRange : [0,1], outputRange : [200, 90]}), backgroundColor : 'white', borderRadius : this.animationThree, }}>
                                            </Animated.View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {{width : 300, height : 200, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24}}></View>
                                </ScrollView>
                            </View>
                        </RNAnimated>

                        <RNAnimated appearFrom="top" animationDuration={2000} >
                            <View style = {{width: '100%', height : 200, marginTop : 24, alignItems : 'center', flexDirection : 'row'}}>
                                <ScrollView style = {{}} horizontal = {true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} scrollEnabled = {this.state.scrollFourFlag}>
                                    <TouchableWithoutFeedback onPress = {() => this.handleFourAnimation()}>
                                        <View style = {{alignItems : 'center', justifyContent : 'center'}}>
                                            <Animated.View ref = {this.firstView} style = {{width : this.state.fourViewWidth.interpolate({inputRange : [0,1], outputRange : [this.state.fullWidth, 90]}), height : this.state.fourViewWidth.interpolate({inputRange : [0,1], outputRange : [200, 90]}), backgroundColor : 'white', borderRadius : this.animationFour, }}>
                                            </Animated.View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {{width : this.state.fullWidth, height : 200, backgroundColor : '#fff',marginLeft : 24, borderRadius : 24}}></View>
                                </ScrollView>
                            </View>
                        </RNAnimated>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}