export type Notification = {
  type: string
  sub_type: string,
  notification_date: string,
  message: string
}



export class NotificationMapper {
  static success(): Notification {
    return {     
        type: "STATUS",
        sub_type: "FINALIZED",
        notification_date: new Date().toISOString(),
        message: "Notification about finalized"
      
  }

}
  static canceled(): Notification {
    return {
      type: "STATUS",
      sub_type: "CANCELLED",
      notification_date: new Date().toISOString(),
      message: "Notification about Cancelled"
    
}
  }
}
