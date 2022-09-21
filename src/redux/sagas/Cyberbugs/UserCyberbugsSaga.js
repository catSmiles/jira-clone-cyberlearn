/* eslint-disable require-yield */
import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { userService } from '~/services/UserService';
import { USER_LOGIN, TOKEN, STATUS_CODE } from '~/util/constants/settingSystem';
import { history } from '~/App';
import { DISPLAY_LOADING, HIDE_LOADING } from '~/redux/constants/LoadingConstants';
import {
    GET_USER,
    GET_USER_BY_PROJECT_ID,
    GET_USER_BY_PROJECT_ID_SAGA,
    GET_USER_SAGA,
    USER_SIGN_IN,
    USER_SIGN_IN_API,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';

// quan ly action Sign in Saga - Action saga return ve function giong nhu trong thunk
// Action thuong tao trong file rieng (file chua action thuong)

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
        history.push('/home');
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
