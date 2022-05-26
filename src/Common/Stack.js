import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Splash from '../Splash'
import Login from '../Login'
import GuestLogin from '../GuestLogin'
import Home from '../Home'
import CalendarTest from '../CalendarTest'
import HusbandInsert from '../HusbandInsert'
import ServiceAgree from '../ServiceAgree'
import AboutWebview from '../AboutWebview'
import AlarmList from '../AlarmList'
import KakaoAlarmList from '../KakaoAlarmList'
import MyPage from '../MyPage'
import MyInfoEdit from '../MyInfoEdit'
import NoticeList from '../NoticeList'
import NoticeDetail from '../NoticeDetail'
import AlarmSetting from '../AlarmSetting'
import MyPageAgree from '../MyPageAgree'
import AgreeDetail from '../AgreeDetail'
import Inquire from '../Inquire'
import Business from '../Videos/Business'
import BasicInspection from '../Videos/BasicInspection'
import IUI from '../Videos/IUI'
import IVF_ET from '../Videos/IVF_ET'
import Technology from '../Videos/Technology'
import SelfInjection from '../Videos/SelfInjection'
import InjectionList from '../Videos/InjectionList'
import HopeMessageDetail from '../HopeMessageDetail'
import HINews from '../HINews'
import MedicineCalendar from '../MedicineCalendar'
import CellDevelop from '../CellDevelop'
import Caution from '../Caution'
import AdminWebView from '../AdminWebView'
import AdminUserSelect from '../AdminUserSelect'
import AdminMedicineCalendar from '../AdminMedicineCalendar'
import AdminCellDevelop from '../AdminCellDevelop'
import AdminAlarmList from '../AdminAlarmList'
import AdminKakaoList from '../AdminKakaoList'

const Stack = createStackNavigator();

const CustomStatusBare = ({
  backgroundColor,
  barStyle = "dark-content",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle}></StatusBar>
    </View>
  )
}

export default function () {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor='white' />
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='GuestLogin' component={GuestLogin} />
        <Stack.Screen name='HusbandInsert' component={HusbandInsert} />
        <Stack.Screen name='ServiceAgree' component={ServiceAgree} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AboutWebview' component={AboutWebview} />
        <Stack.Screen name='CalendarTest' component={CalendarTest} />
        <Stack.Screen name='AlarmList' component={AlarmList} />
        <Stack.Screen name='KakaoAlarmList' component={KakaoAlarmList} />
        <Stack.Screen name='MyPage' component={MyPage} />
        <Stack.Screen name='MyInfoEdit' component={MyInfoEdit} />
        <Stack.Screen name='NoticeList' component={NoticeList} />
        <Stack.Screen name='NoticeDetail' component={NoticeDetail} />
        <Stack.Screen name='AlarmSetting' component={AlarmSetting} />
        <Stack.Screen name='MyPageAgree' component={MyPageAgree} />
        <Stack.Screen name='AgreeDetail' component={AgreeDetail} />
        <Stack.Screen name='Inquire' component={Inquire} />
        <Stack.Screen name='Business' component={Business} options={{ animationEnabled: false, }} />
        <Stack.Screen name='BasicInspection' component={BasicInspection} options={{ animationEnabled: false, }} />
        <Stack.Screen name='IUI' component={IUI} options={{ animationEnabled: false, }} />
        <Stack.Screen name='IVF_ET' component={IVF_ET} options={{ animationEnabled: false, }} />
        <Stack.Screen name='Technology' component={Technology} options={{ animationEnabled: false, }} />
        <Stack.Screen name='SelfInjection' component={SelfInjection} options={{ animationEnabled: false, }} />
        <Stack.Screen name='InjectionList' component={InjectionList} options={{ animationEnabled: false, }} />
        <Stack.Screen name='HopeMessageDetail' component={HopeMessageDetail} />
        <Stack.Screen name='HINews' component={HINews} />
        <Stack.Screen name='MedicineCalendar' component={MedicineCalendar} />
        <Stack.Screen name='CellDevelop' component={CellDevelop} />
        <Stack.Screen name='Caution' component={Caution} />
        <Stack.Screen name='AdminWebView' component={AdminWebView} />
        <Stack.Screen name='AdminUserSelect' component={AdminUserSelect} />
        <Stack.Screen name='AdminMedicineCalendar' component={AdminMedicineCalendar} />
        <Stack.Screen name='AdminCellDevelop' component={AdminCellDevelop} />
        <Stack.Screen name='AdminAlarmList' component={AdminAlarmList} />
        <Stack.Screen name='AdminKakaoList' component={AdminKakaoList} />

      </Stack.Navigator>
    </SafeAreaView>

  )
}