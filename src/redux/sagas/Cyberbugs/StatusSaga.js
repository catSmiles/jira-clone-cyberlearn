import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { statusService } from '~/services/StatusService';
import { STATUS_CODE } from '~/util/constants/settingSystem';

function* getAllStatusSaga(action) {
    try {
        const { data, status } = yield call(() => statusService.getAll());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_STATUS,
                payload: data.content,
            });
        }
    } catch (error) {
        console.log('error getAllStatusSaga: ', error);
    }
}

export function* theoDoiGetAllStatus() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
