import { USER_LOGIN } from '~/util/constants/settingSystem';
import { GET_USER, GET_USER_BY_PROJECT_ID, USER_SIGN_IN } from '../constants/CyberBugs/UserCyberBugsSaga';

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    usersSearch: [],
    usersOnProject: [],
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_SIGN_IN: {
            // console.log('action in userReducer: ', action);
            state.userLogin = action.userLogin;
            return { ...state };
        }
        case GET_USER: {
            state.usersSearch = action.usersSearch;
            return { ...state };
        }
        case GET_USER_BY_PROJECT_ID: {
            state.usersOnProject = action.usersOnProject;
            return { ...state };
        }

        default:
            return { ...state };
    }
};
