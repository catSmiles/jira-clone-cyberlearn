import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { history } from '~/App';
import {
    ASSIGN_USER_PROJECT_SAGA,
    CLOSE_DRAWER,
    CREATE_PROJECT_SAGA,
    DELETE_PROJECT_SAGA,
    GET_ALL_PROJECT,
    GET_ALL_PROJECT_SAGA,
    REMOVE_USER_FROM_PROJECT_SAGA,
    UPDATE_PROJECT_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { DISPLAY_LOADING, HIDE_LOADING } from '~/redux/constants/LoadingConstants';
import { projectService } from '~/services/ProjectService';
import { STATUS_CODE } from '~/util/constants/settingSystem';
import { openNotificationWithIcon } from '~/util/notification';

//--------- Create project saga
function* createProjectSaga(action) {
    // console.log('action create project: ', action);
    // Hien thi loading
    yield put({
        type: DISPLAY_LOADING,
    });

    yield delay(200);

    try {
        const { status } = yield call(() => projectService.createProjectAuthorize(action.newProject));
        if (status === STATUS_CODE.SUCCESS) {
            history.push('/project-management');
            openNotificationWithIcon('success', `Create project is success!`);
        }
    } catch (error) {
        alert('Vui lòng đăng nhập để thực hiện tính năng này');
        console.log('error createProjectSaga: ', error);
    }

    // An loading
    yield put({
        type: HIDE_LOADING,
    });
}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//--------- Get all project saga
function* getAllProjectSaga(action) {
    try {
        // Call API
        const { data, status } = yield call(() => projectService.getAllProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                payload: data.content,
            });
        }
        // console.log('data get all project: ', data);
    } catch (error) {
        console.log('error get all project: ', error);
    }
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

//--------- Update project saga
function* updateProjectSaga(action) {
    console.log('action update project saga: ', action);
    yield put({
        type: DISPLAY_LOADING,
    });

    yield delay(200);

    try {
        const { status } = yield call(() => projectService.updateProject(action.projectUpdate));

        yield put({
            type: CLOSE_DRAWER,
        });

        // console.log('data call api update project saga: ', data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_SAGA,
            });

            openNotificationWithIcon('success', `Update Project ${action.projectUpdate.id} is success!`);
        } else {
            openNotificationWithIcon('error', `Update Project ${action.projectUpdate.id} is error!`);
        }
    } catch (error) {
        // console.log('error update project: ', error);
        yield put({
            type: CLOSE_DRAWER,
        });
        openNotificationWithIcon('error', `Update Project ${action.projectUpdate.id} is error!`);
    }

    yield put({
        type: HIDE_LOADING,
    });
}
export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

//--------- Delete project saga
function* deleteProjectSaga(action) {
    // console.log('action delete project: ', action);

    yield put({
        type: DISPLAY_LOADING,
    });

    yield delay(200);

    try {
        const { status } = yield call(() => projectService.deleteProject(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            // alert(`Project ${action.projectId} was deleted!`);
            openNotificationWithIcon('success', `Delete project ${action.projectId} is success!`);
        } else {
            openNotificationWithIcon('error', `Delete project ${action.projectId} is error!`);
        }

        yield put({
            type: GET_ALL_PROJECT_SAGA,
        });
    } catch (error) {
        // console.log('error delete project: ', error);
        openNotificationWithIcon('error', `Delete project ${action.projectId} is error!`);
    }

    yield put({
        type: HIDE_LOADING,
    });
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//--------- Assign user project saga
function* assignUserProjectSaga(action) {
    try {
        const { status } = yield call(() => projectService.assignUserProject(action.project));
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon(
                'success',
                `Assign user ${action.project.userId} to project ${action.project.projectId} is success!`,
            );

            // re-load data
            yield put({
                type: GET_ALL_PROJECT_SAGA,
            });
        } else {
            openNotificationWithIcon(
                'error',
                `Assign user ${action.project.userId} to project ${action.project.projectId} is error!`,
            );
        }
    } catch (error) {
        openNotificationWithIcon(
            'error',
            `Assign user ${action.project.userId} to project ${action.project.projectId} is error!`,
        );
        console.log('error assignUserProjectSaga: ', error);
    }
}

export function* theoDoiAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

//--------- Remove user from project
function* removeUserFromProjectSaga(action) {
    try {
        const { status } = yield call(() => projectService.removeUserFromProject(action.project));
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon(
                'success',
                `Remove user ${action.project.userId} from project ${action.project.projectId} is success!`,
            );
            yield put({
                type: GET_ALL_PROJECT_SAGA,
            });
        } else {
            openNotificationWithIcon(
                'error',
                `Remove user ${action.project.userId} from project ${action.project.projectId} is error!`,
            );
        }
    } catch (error) {
        openNotificationWithIcon(
            'error',
            `Remove user ${action.project.userId} from project ${action.project.projectId} is error!`,
        );
        console.log('error removeUserFromProjectSaga: ', error);
    }
}

export function* theoDoiRemoveUserFromProjectSaga() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}
