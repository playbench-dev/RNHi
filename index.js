/**
 * @format
 */
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';

const TAG = "index";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
}

//background
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("App : ", 'remote : ' + JSON.stringify(remoteMessage));
//   //  여기에 로직을 작성한다.
//   //  remoteMessage.data로 메세지에 접근가능
//   //  remoteMessage.from 으로 topic name 또는 message identifier
//   //  remoteMessage.messageId 는 메시지 고유값 id
//   //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
//   //  remoteMessage.sentTime 보낸시간
// });

// function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     console.log('index', 'aaaa');
//     return null;
//   }
//   return <App />;
// }

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


