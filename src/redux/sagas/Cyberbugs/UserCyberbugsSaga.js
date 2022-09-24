/* eslint-disable require-yield */
import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { userService } from '~/services/UserService';
import { USER_LOGIN, TOKEN, STATUS_CODE } from '~/util/constants/settingSystem';
import { history } from '~/App';
import { DISPLAY_LOADING, HIDE_LOADING } from '~/redux/constants/LoadingConstants';
import {
  CLOSE_DRAWER,
  DELETE_USER_SAGA,
  GET_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SAGA,
  UPDATE_USER_SAGA,
  USER_SIGN_IN,
  USER_SIGN_IN_API,
  USER_SIGN_UP_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { openNotificationWithIcon } from '~/util/notification';

// quan ly action Sign in Saga - Action saga return ve function giong nhu trong thunk
// Action thuong tao trong file rieng (file chua action thuong)

function* signUpSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(200);

  try {
    const { status } = yield call(() => userService.signup(action.userInfo));
    // Dong form
    yield put({
      type: CLOSE_DRAWER,
    });
    if (status === STATUS_CODE.SUCCESS) {
      // re load danh sach user
      yield put({
        type: GET_USER_SAGA,
      });
      // Show message
      openNotificationWithIcon('success', 'Create user is success');
    } else {
      openNotificationWithIcon('error', 'Create user is error');
    }
  } catch (error) {
    openNotificationWithIcon('error', 'Create user is error');
    console.log('error signUpSaga: ', error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignUp() {
  yield takeLatest(USER_SIGN_UP_SAGA, signUpSaga);
}

// Sign in
function* signInSaga(action) {
  console.log('action sign in saga: ', action);

  // const { type, userLogin } = action;
  const { userLogin } = action;

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(200);

  // Goi API - Sign in
  try {
    // const { data, status } = yield userService.signIn(userLogin);
    const { data } = yield userService.signIn(userLogin);

    // Luu vao local storage
    localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    // Dua data len reducer
    yield put({
      type: USER_SIGN_IN,
      userLogin: data.content,
    });

    // const { history } = yield select((state) => state.HistoryReducer);
    // Vao trang Home
    history.push('/');
  } catch (error) {
    console.log('error sign in action: ', error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGN_IN_API, signInSaga);
}

// Get user
function* getUserSaga(action) {
  // console.log('action get usr saga: ', action);
  try {
    const { data, status } = yield call(() => userService.getUser(action.keyWord));
    console.log('data from call api getUser: ', data);
    if (status === STATUS_CODE.SUCCESS) {
      // Dua data len reducer
      yield put({
        type: GET_USER,
        usersSearch: data.content,
      });
    }
  } catch (error) {
    console.log('error getUserSaga: ', error);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_SAGA, getUserSaga);
}

// Get user by project id
function* getUserByProjectIdSaga(action) {
  try {
    const { data, status } = yield call(() => userService.getUserByProjectId(action.idProject));
    console.log('data from call api getUserByProjectIdSaga: ', data);
    if (status === STATUS_CODE.SUCCESS) {
      // Dua data len reducer
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        usersOnProject: data.content,
      });
    }
  } catch (error) {
    // console.log('error getUserSaga: ', error);
    console.log('response getUserSaga: ', error.response?.data);
    if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        usersOnProject: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

// delete user
function* deleteUserSaga(action) {
  yield delay(200);
  try {
    const { status } = yield call(() => userService.deleteUser(action.id));
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon('success', `Delete user ${action.id} is success`);
      // Re load user list
      yield put({
        type: GET_USER_SAGA,
      });
    } else {
      openNotificationWithIcon('error', `Delete user ${action.id} is error`);
    }
  } catch (error) {
    openNotificationWithIcon('error', `Delete user ${action.id} is error`);
    console.log('error deleteUserSaga: ', error);
  }
}

export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

// edit user
function* editUserSaga(action) {
  yield delay(200);
  try {
    const { status } = yield call(() => userService.editUser(action.userUpdate));
    yield put({
      type: CLOSE_DRAWER,
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon('success', `Update user ${action.userUpdate.id} is success`);
      // Load lai sanh sach user
      yield put({
        type: GET_USER_SAGA,
      });
    } else {
      openNotificationWithIcon('error', `Update user ${action.userUpdate.id} is error`);
    }
  } catch (error) {
    openNotificationWithIcon('error', `Update user ${action.userUpdate.id} is error`);
    console.log('error editUserSaga: ', error);
  }
}

export function* theoDoiEditUser() {
  yield takeLatest(UPDATE_USER_SAGA, editUserSaga);
}
