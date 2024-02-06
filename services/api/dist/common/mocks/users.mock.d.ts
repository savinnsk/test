import { User } from '@domain/entities/user/user.schema';
import { Document, ObjectId } from 'mongoose';
export declare const createUserMock: {
    name: string;
    email: string;
    password: string;
};
export declare const userCreatedMock: {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
};
export declare const usersCreatedMock: (Document<unknown, any, User> & User & {
    _id: ObjectId;
})[] | Promise<(Document<unknown, any, User> & User & {
    _id: ObjectId;
})[]>;
