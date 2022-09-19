import { EDIT_PROJECT, GET_ALL_PROJECT } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    arrProject: [],
    projectEditing: {},
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
        default:
            return { ...state };
    }
};
