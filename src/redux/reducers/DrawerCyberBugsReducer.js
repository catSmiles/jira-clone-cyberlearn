import {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_FORM_EDIT_PROJECT,
    SET_SUBMIT_FROM_EDIT_PROJECT,
} from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
    visible: false,
    ComponentContent: <p>Default content</p>,
    callbackSubmit: () => {
        alert('Fail submit form');
    },
};

export const DrawerCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return { ...state, visible: true };
        }
        case CLOSE_DRAWER: {
            return { ...state, visible: false };
        }
        case OPEN_FORM_EDIT_PROJECT: {
            return { ...state, visible: true, ComponentContent: action.Component };
        }
        case SET_SUBMIT_FROM_EDIT_PROJECT: {
            state.callbackSubmit = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
};
