import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_COMMENT,
  EDIT_PROJECT,
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGNESS,
  SET_ID_COMMENT_EDITING,
} from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
  arrProject: [],
  projectEditing: {},
  projectDetail: {},
  taskDetail: {},
};

export const ProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      state.arrProject = action.payload;
      return { ...state };
    }
    case EDIT_PROJECT: {
      state.projectEditing = action.payload;
      return { ...state };
    }
    case GET_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }
    case GET_TASK_DETAIL: {
      state.taskDetail = action.taskDetail;
      return { ...state };
    }

    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      console.log(name, value);
      return { ...state, taskDetail: { ...state.taskDetail, [name]: value } };
    }
    case CHANGE_ASSIGNESS: {
      state.taskDetail.assigness = [...state.taskDetail.assigness, action.userSelected];
      return { ...state };
    }
    case REMOVE_USER_ASSIGNESS: {
      state.taskDetail.assigness = [...state.taskDetail.assigness.filter((member) => member.id !== action.userId)];
      return { ...state };
    }
    case DELETE_COMMENT: {
      state.taskDetail.lstComment = [
        ...state.taskDetail.lstComment.filter((comment) => {
          // if (comment.idUser === action.idUser) {
          //   // alert('Ban khong co quyen xoa comment nay!');
          //   return false;
          // } else {
          // }
          return comment.id !== action.idComment;
        }),
      ];
      return { ...state };
    }
    case SET_ID_COMMENT_EDITING: {
      state.taskDetail.lstComment = [
        ...state.taskDetail.lstComment.map((comment) => {
          if (comment.id === action.payload.idComment) {
            return { ...comment, editing: action.payload.editing };
          }
          return { ...comment, editing: false };
        }),
      ];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
