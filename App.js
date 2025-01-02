/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, Platform, Alert, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/Common/Stack';
import Users from './src/Common/User';
import { navigationRef } from './src/Common/RootNavigation'
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Home from './src/Home'
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
    // if (Platform.OS === "android") {
    //   try {
    //     console.log('1')
    //     const OsVer = Platform.Version;
    //     console.log('2')
    //     if (+OsVer >= 33) {
    //       console.log('3')
    //       const res = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
    //       );
    //       console.log(res)
    //       console.log('4')
    //       if (res === "granted") {
    //         console.log('5')
    //         console.log(TAG, messaging().hasPermission());
    //         this._Notification();
    //       }
    //     }
    //     else {
    //       console.log(TAG, messaging().hasPermission());
    //       this._Notification();
    //     }
    //   } catch (err) {
    //     console.log(TAG, err)
    //   }
    // } else {
    //   this._Notification();
    // }
    console.log(TAG, messaging().hasPermission());
    this._Notification();
  }

  componentWillUnmount() {
    // this.messageListener();
  }

  async _Notification() {
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
            } else if (remoteMessage.data.android_channel_id == "empty2") {
              navigationRef.current.navigate('AboutWebview', { tag: 'inspection', survey: remoteMessage.data.survey })
            } else {
              navigationRef.current.navigate('Home', { orderNo: notification.no })
            }
          }
        }
      });

      PushNotification.localNotification({
        channelId: remoteMessage.data.android_channel_id,
        vibrate: true,
        vibration: 300,
        priority: 'high',
        visibility: 'public',
        importance: 'hight',
        title: remoteMessage.data.title,
        message: remoteMessage.data.body, // (required)
        playSound: false,
        autoCancel: true,
        smallIcon: 'ic_logo',
        largeIcon: remoteMessage.data.image,
        no: remoteMessage.data.no,
        picture: remoteMessage.data.image,
        largeIconUrl: remoteMessage.data.image,
        survey: remoteMessage?.data?.survey
      });

      console.log("App", remoteMessage.data.image)
    });

    //background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("App : ", 'remote : ' + JSON.stringify(remoteMessage));

      //  여기에 로직을 작성한다.
      //  remoteMessage.data로 메세지에 접근가능
      //  remoteMessage.from 으로 topic name 또는 message identifier
      //  remoteMessage.messageId 는 메시지 고유값 id
      //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
      //  remoteMessage.sentTime 보낸시간
    });

    // messaging().getToken().then(token => AsyncStorage.setItem('token',token));
    await messaging().getToken().then(token => Users.token = token);

    console.log('token : ' + Users.token);

    //ios background open app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "App onNotificationOpenedApp : ",
        remoteMessage.data
      );
      navigationRef.current.navigate('Splash', { orderNo: remoteMessage.data.no, channelId: remoteMessage.data.android_channel_id, survey: remoteMessage?.data?.survey })
      // navigation.navigate(remoteMessage.data.type);
    });

    //android background open app
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "App getInitialNotification : ",
            remoteMessage.data
          );
          console.log(TAG, "id : " + remoteMessage.data.android_channel_id + " no : " + remoteMessage.data.no);
          navigationRef.current.navigate('Splash', { orderNo: remoteMessage.data.no, channelId: remoteMessage.data.android_channel_id, survey: remoteMessage?.data?.survey })
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
