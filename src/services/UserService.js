/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class UserService extends baseService {
  constructor() {
    super();
  }
  signup = (userInfo) => {
    return this.post('/api/Users/signup', userInfo);
  };
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
  deleteUser = (id) => {
    return this.delete(`/api/Users/deleteUser?id=${id}`);
  };
  editUser = (userInfo) => {
    return this.put('/api/Users/editUser', userInfo);
  };
}

export const userService = new UserService();
