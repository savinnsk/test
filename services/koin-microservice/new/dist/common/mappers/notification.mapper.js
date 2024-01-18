"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMapper = void 0;
class NotificationMapper {
    static success({ data }) {
        return {
            transaction: {
                reference_id: data.reference_id,
                business_id: data.business_id,
            },
            status: 'Confirmed',
        };
    }
    static canceled({ data }) {
        return {
            transaction: {
                reference_id: data.reference_id,
                business_id: data.business_id,
            },
            status: 'Cancelled',
        };
    }
}
exports.NotificationMapper = NotificationMapper;
//# sourceMappingURL=notification.mapper.js.map