import { GET_ALL_PRIORITY } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    arrPriority: [],
};

export const PriorityReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PRIORITY:
            state.arrPriority = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
