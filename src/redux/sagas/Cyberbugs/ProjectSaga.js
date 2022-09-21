import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { history } from '~/App';
import {
  ASSIGN_USER_PROJECT_SAGA,
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  CREATE_TASK_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
  UPDATE_STATUS_TASK_SAGA,
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
      // dua data len reducer
      yield put({
        type: GET_ALL_PROJECT,
        payload: data.content,
      });

      // Load ra danh sach user for idProject first of arrProject
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        idProject: data.content[0]?.id,
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

//--------- Get project detail
function* getProjectDetailSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(200);

  try {
    const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
    if (status === STATUS_CODE.SUCCESS) {
      // push data info reducer
      yield put({
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content,
      });
    }
  } catch (error) {
    console.log('error getProjectDetailSaga: ', error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

//--------- Create task
function* createTaskSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(200);

  try {
    const { status } = yield call(() => projectService.createTask(action.newTask));
    if (status === STATUS_CODE.SUCCESS) {
      // history.push('/project-management');
      openNotificationWithIcon('success', `Create task is success!`);
      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (error) {
    // alert('Vui lòng đăng nhập để thực hiện tính năng này');
    openNotificationWithIcon('error', `Create task is error!`);
    console.log('error createProjectSaga: ', error);
  }

  // An loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTask() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

// -------- Get task detail
function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(() => projectService.getTaskDetail(action.taskId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        taskDetail: data.content,
      });
    }
  } catch (error) {
    console.log('error getTaskDetailSaga: ', error);
  }
}

export function* theoDoiGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// ------- update Status task
function* updateStatusTaskSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(300);

  try {
    // cap nhat api status cho task hien tai (task dang mo modal)
    const { status } = yield call(() => projectService.updateStatusTask(action.taskStatusUpdate));
    if (status === STATUS_CODE.SUCCESS) {
      //  Some thing here

      // cap nhat lai du lieu - get task detail
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskStatusUpdate.taskId,
      });

      // Neu cap nhat thanh cong -> goi lai get project detail saga -> sap xep (cap nhat) lai thong tin cac task
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.taskStatusUpdate.projectId,
      });

      // reload page - get project detail
    }
  } catch (error) {
    console.log('error updateStatusTaskSaga: ', error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateStatusTask() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}
