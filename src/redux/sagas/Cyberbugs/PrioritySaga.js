import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { priorityService } from '~/services/PriorityService';
import { STATUS_CODE } from '~/util/constants/settingSystem';

function* getAllPriority(action) {
    try {
        const { data, status } = yield call(() => priorityService.getAll());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY,
                payload: data.content,
            });
        }
    } catch (error) {
        console.log('error getAllPriority: ', error);
    }
}

export function* theoDoiGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}
