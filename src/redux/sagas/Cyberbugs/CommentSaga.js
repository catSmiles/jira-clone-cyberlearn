import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  GET_TASK_DETAIL_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { commentService } from '~/services/CommentService';
import { STATUS_CODE } from '~/util/constants/settingSystem';

//--------- get all comment
function* getAllCommentSaga(action) {
  try {
    const { data, status } = yield call(() => commentService.getAllComment(action.taskId));
    if (status === STATUS_CODE.SUCCESS) {
      // dua data len reducer
      yield put({
        type: GET_ALL_COMMENT,
        comments: data.content,
      });
    }
  } catch (error) {
    console.log('error getAllCommentSaga: ', error);
  }
}

export function* theoDoiGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

// ------- insert Comment
function* insertCommentSaga(action) {
  try {
    const { status } = yield call(() => commentService.insertComment(action.newComment));
    if (status === STATUS_CODE.SUCCESS) {
      // reload modal task detail
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.newComment.taskId,
      });
    }
  } catch (error) {
    console.log('error insertCommentSaga: ', error);
  }
}

export function* theoDoiInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

// ------- delete Comment
function* deleteCommentSaga(action) {
  try {
    const { status } = yield call(() => commentService.deleteComment(action.idComment));
    if (status === STATUS_CODE.SUCCESS) {
      // reload modal task detail
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskId,
      });
      // openNotificationWithIcon('success', 'Comment deleted!');
    }
  } catch (error) {
    console.log('error deleteCommentSaga: ', error);
  }
}

export function* theoDoiDeleteComment() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

// update comment
function* updateCommentSaga(action) {
  try {
    const { status } = yield call(() => commentService.updateComment(action.componentUpdate));
    if (status === STATUS_CODE.SUCCESS) {
      // Reload modal
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskId,
      });
    }
  } catch (error) {
    console.log('error updateCommentSaga: ', error);
  }
}

export function* theoDoiUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
