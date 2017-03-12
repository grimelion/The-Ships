import { createStore, combineReducers, Reducer, Store } from 'redux';
import { combined } from './reducers';

const storage: Store<any> = createStore<any>(combined);

export { storage };