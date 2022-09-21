import { createStore, applyMiddleware, combineReducers } from 'redux';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { DrawerCyberBugsReducer } from './reducers/DrawerCyberBugsReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
// import thunk from 'redux-thunk';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    DrawerCyberBugsReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
// const store = createStore(rootReducer, applyMiddleware(thunk));

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;
