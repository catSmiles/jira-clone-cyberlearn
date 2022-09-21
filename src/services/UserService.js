/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class UserService extends baseService {
    constructor() {
        super();
    }
    signIn = (userInfo) => {
        return this.post('/api/Users/signin', userInfo);
    };
    getUser = (keyword = '') => {
        if (keyword === '') return this.get('/api/Users/getUser');
        return this.get(`/api/Users/getUser?keyword=${keyword}`);
    };
    getUserByProjectId = (idProject) => {
        return this.get(`/api/Users/getUserByProjectId?idProject=${idProject}`);
    };
}

export const userService = new UserService();
