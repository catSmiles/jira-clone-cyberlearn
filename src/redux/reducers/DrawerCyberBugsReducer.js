import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_FORM_EDIT_PROJECT,
  OPEN_FORM_CREATE_TASK,
  SET_SUBMIT_FORM_CREATE_TASK,
  OPEN_FORM_CREATE_USER,
  SET_SUBMIT_FORM_CREATE_USER,
  OPEN_FORM_EDIT_USER,
  SET_SUBMIT_FORM_EDIT_USER,
} from '../constants/CyberBugs/UserCyberBugsSaga';

const stateDefault = {
  visible: false,
  ComponentContent: <p>Default content</p>,
  title: 'Default title',
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
      return { ...state, visible: true, ComponentContent: action.Component, title: action.title };
    }
    case SET_SUBMIT_FORM_EDIT_PROJECT: {
      state.callbackSubmit = action.payload;
      return { ...state };
    }
    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.ComponentContent = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_FORM_CREATE_TASK: {
      return { ...state, callbackSubmit: action.submitFunction };
    }
    case OPEN_FORM_CREATE_USER: {
      state.visible = true;
      state.ComponentContent = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_FORM_CREATE_USER: {
      return { ...state, callbackSubmit: action.submitFunction };
    }
    case OPEN_FORM_EDIT_USER: {
      state.visible = true;
      state.ComponentContent = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_FORM_EDIT_USER: {
      return { ...state, callbackSubmit: action.submitFunction };
    }
    default:
      return { ...state };
  }
};
