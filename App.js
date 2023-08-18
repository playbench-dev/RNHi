/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
<<<<<<< HEAD
import {StatusBar, Platform, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/Common/Stack';
import Users from './src/Common/User';
import {navigationRef} from './src/Common/RootNavigation'
=======
import { StatusBar, Platform, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/Common/Stack';
import Users from './src/Common/User';
import { navigationRef } from './src/Common/RootNavigation'
>>>>>>> mw
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Home from './src/Home'
<<<<<<< HEAD
import Orientation from 'react-native-orientation';

const TAG = "App";

const CustomStatusBare = ({
  backgroundColor,
  barStyle = "dark-content",
}) => {
  const insets = useSafeAreaInsets();

  return(
    <View style = {{height : insets.top, backgroundColor}}>
      <StatusBar animated={true} backgroundColor = {backgroundColor} barStyle = {barStyle}></StatusBar>
    </View>
  )
}

class App extends React.Component{
  
  state = {
    iosPush : false,
  }

  async componentDidMount(){
    console.log(TAG, messaging().hasPermission());
    // Orientation.addOrientationListener(() => Orientation.lockToLandscapeLeft());
    this._Notification();

  }

  _orientationDidChange = (orientation) => {
    Orientation.lockToLandscapeLeft();
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
      console.log(TAG,'land left');
      Orientation.lockToLandscapeLeft();
    }
  }

  componentWillUnmount() {
    // Orientation.removeOrientationListener(this._orientationDidChange);
    this.messageListener();
  }

  _Notification(){
    this.messageListener = messaging().onMessage(async remoteMessage => {
      PushNotification.configure({
        onNotification: function (notification) {
            // const channerId = notification.data.android_channel_id;
            console.log("NOTIFICATION:", ""+JSON.stringify(notification));
            console.log("channel : " + JSON.stringify(remoteMessage));
            if (notification.foreground && notification.userInteraction) {
              if(remoteMessage.data.android_channel_id == "medicine"){
                  navigationRef.current.navigate('MedicineCalendar',{orderNo : notification.no, medicineUpdate : Home._MedicineUpdate})
              }else if(remoteMessage.data.android_channel_id == "embryo"){
                navigationRef.current.navigate('CellDevelop',{orderNo : notification.no})
              }else if(remoteMessage.data.android_channel_id == "home"){
                navigationRef.current.navigate('Home',{orderNo : notification.no})
              }else{
                navigationRef.current.navigate('Home',{orderNo : notification.no})
              }
            }
        }
    });

      PushNotification.localNotification({
        channelId : remoteMessage.data.android_channel_id,
=======
import Toast from 'react-native-toast-message';

const TAG = "App";

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    iosPush: false,
  }

  async componentDidMount() {
    console.log(TAG, messaging().hasPermission());
    this._Notification();
  }

  componentWillUnmount() {
    // this.messageListener();
  }

  _Notification() {
    this.messageListener = messaging().onMessage(async remoteMessage => {
      PushNotification.configure({
        onNotification: function (notification) {
          // const channerId = notification.data.android_channel_id;
          console.log("NOTIFICATION:", "" + JSON.stringify(notification));
          console.log("channel : " + JSON.stringify(remoteMessage));
          if (notification.foreground && notification.userInteraction) {
            if (remoteMessage.data.android_channel_id == "medicine") {
              navigationRef.current.navigate('MedicineCalendar', { orderNo: notification.no, medicineUpdate: Home._MedicineUpdate })
            } else if (remoteMessage.data.android_channel_id == "embryo") {
              navigationRef.current.navigate('CellDevelop', { orderNo: notification.no })
            } else if (remoteMessage.data.android_channel_id == "home") {
              navigationRef.current.navigate('Home', { orderNo: notification.no })
            } else if (remoteMessage.data.android_channel_id == "empty1") {
              navigationRef.current.navigate('AlarmList', { orderNo: notification.no })
            } else {
              navigationRef.current.navigate('Home', { orderNo: notification.no })
            }
          }
        }
      });

      PushNotification.localNotification({
        channelId: remoteMessage.data.android_channel_id,
>>>>>>> mw
        vibrate: true,
        vibration: 300,
        priority: 'high',
        visibility: 'public',
        importance: 'hight',
<<<<<<< HEAD
        title : remoteMessage.data.title,
        message : remoteMessage.data.body, // (required)
        playSound: false,
        autoCancel : true,
        smallIcon : 'ic_logo',
        largeIcon : remoteMessage.data.image,
        no : remoteMessage.data.no,
        picture : remoteMessage.data.image,
        largeIconUrl : remoteMessage.data.image
      });

      console.log("App",remoteMessage.data.image)
    });
    
    //background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("App : ",'remote : ' + JSON.stringify(remoteMessage));
=======
        title: remoteMessage.data.title,
        message: remoteMessage.data.body, // (required)
        playSound: false,
        autoCancel: true,
        smallIcon: 'ic_logo',
        largeIcon: remoteMessage.data.image,
        no: remoteMessage.data.no,
        picture: remoteMessage.data.image,
        largeIconUrl: remoteMessage.data.image
      });

      console.log("App", remoteMessage.data.image)
    });

    //background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("App : ", 'remote : ' + JSON.stringify(remoteMessage));

>>>>>>> mw
      //  여기에 로직을 작성한다.
      //  remoteMessage.data로 메세지에 접근가능
      //  remoteMessage.from 으로 topic name 또는 message identifier
      //  remoteMessage.messageId 는 메시지 고유값 id
      //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
      //  remoteMessage.sentTime 보낸시간
    });

    // messaging().getToken().then(token => AsyncStorage.setItem('token',token));
<<<<<<< HEAD
=======

>>>>>>> mw
    messaging().getToken().then(token => Users.token = token);

    console.log('token : ' + Users.token);

    //ios background open app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "App onNotificationOpenedApp : ",
        remoteMessage.data
      );
<<<<<<< HEAD
      navigationRef.current.navigate('Splash',{orderNo : remoteMessage.data.no, channelId : remoteMessage.data.android_channel_id})
      // navigation.navigate(remoteMessage.data.type);
    });
    
=======
      navigationRef.current.navigate('Splash', { orderNo: remoteMessage.data.no, channelId: remoteMessage.data.android_channel_id })
      // navigation.navigate(remoteMessage.data.type);
    });

>>>>>>> mw
    //android background open app
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "App getInitialNotification : ",
<<<<<<< HEAD
            remoteMessage.data 
          );
          console.log(TAG,"id : " + remoteMessage.data.android_channel_id  + " no : " + remoteMessage.data.no);
          navigationRef.current.navigate('Splash',{orderNo : remoteMessage.data.no, channelId : remoteMessage.data.android_channel_id})
        }
      });
    }

  render(){
    return (
      <NavigationContainer ref = {navigationRef}>
      <Stack/>
    </NavigationContainer>
    );
  }
}

export default App;
=======
            remoteMessage.data
          );
          console.log(TAG, "id : " + remoteMessage.data.android_channel_id + " no : " + remoteMessage.data.no);
          navigationRef.current.navigate('Splash', { orderNo: remoteMessage.data.no, channelId: remoteMessage.data.android_channel_id })
        }
      });
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack />
        <Toast />
      </NavigationContainer>

    );
  }
}
>>>>>>> mw
