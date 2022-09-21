import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { taskTypeService } from '~/services/TaskTypeService';
import { STATUS_CODE } from '~/util/constants/settingSystem';

function* getAllTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => taskTypeService.getAll());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                payload: data.content,
            });
        }
    } catch (error) {
        console.log('error getAllTaskTypeSaga: ', error);
    }
}

export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
