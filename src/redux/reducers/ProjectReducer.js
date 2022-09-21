import {
  EDIT_PROJECT,
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
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
    default:
      return { ...state };
  }
};
