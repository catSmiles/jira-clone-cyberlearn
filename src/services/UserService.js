/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class UserService extends baseService {
    constructor() {
        super();
    }
    signIn = (userInfo) => {
        return this.post('/api/Users/signin', userInfo);
    };
    getUser = (keyword) => {
        return this.get(`/api/Users/getUser?keyword=${keyword}`);
    };
}

export const userService = new UserService();
