import { all } from 'redux-saga/effects';
import * as UsersSaga from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';

export function* rootSaga() {
    yield all([
        //Nghiệp vụ cyberbugs - Lang nghe
        UsersSaga.theoDoiSignIn(),
        UsersSaga.theoDoiGetUser(),
        // Nghiep vu projectCategorySaga
        ProjectCategorySaga.theoDoiGetAllProjectCategorySaga(),

        // Nhiep vu project
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetAllProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiAssignUserProjectSaga(),
        ProjectSaga.theoDoiRemoveUserFromProjectSaga(),
    ]);
}
