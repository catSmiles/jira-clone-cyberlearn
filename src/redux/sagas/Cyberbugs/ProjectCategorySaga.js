import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { projectCategoryService } from '~/services/ProjectCategoryService';
import { STATUS_CODE } from '~/util/constants/settingSystem';

function* getAllProjectCategorySaga(action) {
    console.log('action saga: ', action);

    try {
        const { data, status } = yield call(() => projectCategoryService.getProjectCategory());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                payload: data.content,
            });
        }
    } catch (error) {
        console.log('error getAllProjectCategorySaga: ', error);
    }

    // console.log('data: ', data);
}

export function* theoDoiGetAllProjectCategorySaga() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
