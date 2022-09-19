import { GET_ALL_PROJECT_CATEGORY } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
};
