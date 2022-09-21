import { GET_ALL_TASK_TYPE } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    arrTaskType: [],
};

export const TaskTypeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_TASK_TYPE:
            state.arrTaskType = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
