import { combineReducers, Reducer } from 'redux';
import { router } from './router';

let combined: Reducer<any> = combineReducers({
    router
});

export { combined };