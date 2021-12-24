/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import codePush from 'react-native-code-push';

const TAG = "index";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
}

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));

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