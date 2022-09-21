import { GET_ALL_STATUS } from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    arrStatus: [],
};

export const StatusReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_STATUS:
            state.arrStatus = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
