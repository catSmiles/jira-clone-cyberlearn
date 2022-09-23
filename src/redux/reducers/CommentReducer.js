import { GET_ALL_COMMENT, SET_ID_COMMENT_EDITING } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
  comments: [],
};

export const CommentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      return { ...state, comments: action.comments };

    default:
      return { ...state };
  }
};
