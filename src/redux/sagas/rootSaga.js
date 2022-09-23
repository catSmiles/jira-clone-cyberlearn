import { all } from 'redux-saga/effects';
import * as UsersSaga from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';
import * as CommentSaga from './Cyberbugs/CommentSaga';

export function* rootSaga() {
  yield all([
    //Nghiệp vụ cyberbugs - Lang nghe
    UsersSaga.theoDoiSignIn(),
    UsersSaga.theoDoiGetUser(),
    UsersSaga.theoDoiGetUserByProjectId(),
    // Nghiep vu projectCategorySaga
    ProjectCategorySaga.theoDoiGetAllProjectCategorySaga(),

    // Nhiep vu project
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiAssignUserProjectSaga(),
    ProjectSaga.theoDoiRemoveUserFromProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiCreateTask(),
    ProjectSaga.theoDoiGetTaskDetail(),
    ProjectSaga.theoDoiUpdateStatusTask(),

    // nghiep vu task type
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

    // nghiep vu priority
    PrioritySaga.theoDoiGetAllPriority(),

    // Nghiep vu status
    StatusSaga.theoDoiGetAllStatus(),

    // Nghiep vu comment
    CommentSaga.theoDoiGetAllComment(),
    CommentSaga.theoDoiInsertComment(),
    CommentSaga.theoDoiDeleteComment(),
    CommentSaga.theoDoiUpdateComment(),
  ]);
}
