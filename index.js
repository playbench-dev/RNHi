/**
 * @format
 */
import { AppRegistry, Platform, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';

const TAG = "index";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.autoCorrect = false;
TextInput.defaultProps.allowFontScaling = false;

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
}

//background
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Index : ", 'remote : ' + JSON.stringify(remoteMessage));
  //  여기에 로직을 작성한다.
  //  remoteMessage.data로 메세지에 접근가능
  //  remoteMessage.from 으로 topic name 또는 message identifier
  //  remoteMessage.messageId 는 메시지 고유값 id
  //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
  //  remoteMessage.sentTime 보낸시간

  // PushNotification.localNotification({
  //   channelId: remoteMessage.data.android_channel_id,
  //   vibrate: true,
  //   vibration: 300,
  //   priority: 'high',
  //   visibility: 'public',
  //   importance: 'hight',
  //   title: remoteMessage.data.title,
  //   message: remoteMessage.data.body, // (required)
  //   playSound: false,
  //   autoCancel: true,
  //   smallIcon: 'ic_logo',
  //   largeIcon: remoteMessage.data.image,
  //   no: remoteMessage.data.no,
  //   picture: remoteMessage.data.image,
  //   largeIconUrl: remoteMessage.data.image
  // });
});



if (Platform.OS == 'android') {
  PushNotification.createChannel(
    {
      channelId: "medicine", // (required)
      channelName: "medicine", // (required)
      channelDescription: "복약푸시", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "embryo", // (required)
      channelName: "embryo", // (required)
      channelDescription: "배아푸시", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "home", // (required)
      channelName: "home", // (required)
      channelDescription: "홈", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "empty1", // (required)
      channelName: "empty1", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "empty2", // (required)
      channelName: "empty2", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "empty3", // (required)
      channelName: "empty3", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "empty4", // (required)
      channelName: "empty4", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.createChannel(
    {
      channelId: "empty5", // (required)
      channelName: "empty5", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
}

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));
// AppRegistry.registerComponent(appName, () => HeadlessCheck);


