import { combineReducers, Reducer } from 'redux';
import { ReducersModel } from './model';
import { location } from './location';

let combined = combineReducers<ReducersModel>({
    location
});

export { combined };