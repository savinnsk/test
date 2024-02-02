export class NotificationMapper {
  static success({ data }: any): any {
    return {
      transaction: {
        reference_id: data.reference_id,
        business_id: data.business_id,
      },
      status: 'Confirmed',
    };
  }
  static canceled({ data }: any): any {
    return {
      transaction: {
        reference_id: data.reference_id,
        business_id: data.business_id,
      },
      status: 'Cancelled',
    };
  }
}
