//
//  NotificationService.m
//  HICenterEx
//
//  Created by 김민우 on 2021/10/07.
//

#import "NotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    // Modify the notification content here...
    self.bestAttemptContent.title = [NSString stringWithFormat:@"%@", self.bestAttemptContent.title];

  self.bestAttemptContent.body = [NSString stringWithFormat:@"%@", self.bestAttemptContent.body];
  
  UNMutableNotificationContent *content = [self.bestAttemptContent mutableCopy];

      NSString *urlString = [content.userInfo valueForKeyPath:@"image"];
  
      NSError *error;
      
      UNNotificationAttachment *attachment = [UNNotificationAttachment attachmentWithIdentifier:@"image" URL:[[NSBundle mainBundle] URLForResource: urlString withExtension:@"png"] options:nil error:&error];
      
      if (error) {
          NSLog(@"Notification Extension Error : %@",error);
      } else {
          self.bestAttemptContent.attachments = @[attachment];
      }
      
      self.contentHandler(self.bestAttemptContent);
//  [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];

}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
