import React from 'react';

<<<<<<< HEAD
export default class ServerUrl{
    static Server = "https://hi-admin.co.kr";    
    static Server1 = "http://192.168.0.17:3010";    //명성
    static Server2 = "http://192.168.0.102:3010";   //용범
=======
export default class ServerUrl {
    static Server = "https://hi-admin.co.kr"; //hi-admin.co.kr
    static Server1 = "http://192.168.0.26:8080";    //ㅈㅣ훈이형
    static Server2 = "http://220.87.39.187:3010";   //용범
>>>>>>> mw
    static loginUrl = ServerUrl.Server + "/userApi/user-login";                                           //로그인                  // refresh_token null
    static spouseUpdateUrl = ServerUrl.Server + '/userApi/insert-spouse-info';                            //배우자 정보 수정          // refresh_token null (마이페이지에서는 넣어야됨)
    static provisionAgree = ServerUrl.Server + '/userApi/update-provision-agree';                         //약관동의                // refresh_token null

    //Home
    static oneLineNoticeUrl = ServerUrl.Server + "/userApi/app-message-info";                             //한 줄 공지사항
    static RandomMessageInfo = ServerUrl.Server + "/userApi/app-random-message-info"                      //랜덤메시지  
<<<<<<< HEAD
    static hopeMessagesUrl = "https://www.hifertility.co.kr/api/pregnancy?page=1&pageSize=4";             //희망메세지
=======
    static hopeMessagesUrl = "https://www.hifertility.co.kr/api/pregnancy?page=1&pageSize=10";             //희망메세지
    static BannerInfo = ServerUrl.Server + "/userApi/select-banner-info"
    static ChartCheck = ServerUrl.Server + "/userApi/select-checkup-list"
>>>>>>> mw

    //medicine
    static medicineInfoList = ServerUrl.Server + "/userApi/select-shedule-medicine-info";                 //투약 리스트
    static medicineUpdate = ServerUrl.Server + "/userApi/take-time-update";                               //투약 업데이트
<<<<<<< HEAD
=======
    static MedicineInfo = ServerUrl.Server + "/userApi/select-all-medicine-info"                          //약 정보
>>>>>>> mw

    //MyPage
    static myInfoEditUrl = ServerUrl.Server + "/userApi/update-user-info";                                //개인정보 수정
    static logoutUrl = ServerUrl.Server + "/userApi/user-logout";                                         //로그아웃                // refresh_token null
    static InquiryUrl = ServerUrl.Server + "/userApi/insert-inquiry-report-list"                          //문의 및 신고
    static ConditionInfoUrl = ServerUrl.Server + "/userApi/select-condition-month-info"                   //운동기록 정보
    static ConditionInfoDetailUrl = ServerUrl.Server + "/userApi/select-condition-day-info"               //운동기록 정보
    static ConditionInfoInsertUrl = ServerUrl.Server + "/userApi/insert-condition-info"                   //운동기록 정보 등록
    static ConditionInfoUpdateUrl = ServerUrl.Server + "/userApi/update-condition-info"                   //운동기록 정보 수정
    static NoticeListUrl = ServerUrl.Server + "/userApi/select-notice-list"                               //공지사항 리스트
    static PushUpdateUrl = ServerUrl.Server + "/userApi/update-push-setting"                              //푸시 업데이트

    //Push
    static PushListUrl = ServerUrl.Server + "/userApi/select-push-list"                                   //푸시 리스트
    static PushDeleteUrl = ServerUrl.Server + "/userApi/delete-push-info"                                 //푸시 삭제

    //Kakao
    static KakaoListUrl = ServerUrl.Server + "/userApi/select-kakao-list"

    //IVF
    static IVFListUrl = ServerUrl.Server + "/userApi/select-app-chart-list"                               //IVF 리스트
    static IVFDetailUrl = ServerUrl.Server + "/userApi/select-app-opu-info"                               //IVF 상세
<<<<<<< HEAD
=======
    static CryoUrl = ServerUrl.Server + "/userApi/select-cryo-all-info"                                   //Cryo 리스트
>>>>>>> mw

    //동영상
    static VideoListDetail = ServerUrl.Server + "/userApi/video-app-management-list"                      //동영상 관리
    // category = 1 THEN '시술 영상'
    // category = 2 THEN '자가주사'
    // category = 3 THEN '주사별 영상'
    // category = 4 THEN '난임 기본검사'
    // category = 5 THEN '인공수정'
    // category = 6 THEN '배양기술력'
    // category = 7 THEN '주사방법'
    // category = 8 THEN '난임 지원사업관리'
    // -> 아래로 바뀜
    // category = 1 THEN '난임 기본검사'
    // category = 2 THEN '인공수정'
    // category = 3 THEN '시험관 시술'
    // category = 4 THEN '배양기술력'
    // category = 5 THEN '주사방법'
    // category = 6 THEN '주사별영상'
<<<<<<< HEAD
    
=======

>>>>>>> mw
    // category = 8 THEN '난임 지원사업관리'

    //admin 
    static UserList = ServerUrl.Server + "/userApi/select-admin-patient-list"                             //환자 리스트
    static AdminMedicineList = ServerUrl.Server + "/userApi/select-admin-schedule-medicine-info"         //환자 캘린더
<<<<<<< HEAD
=======

>>>>>>> mw
}