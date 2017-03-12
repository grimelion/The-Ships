import { createStore, Store } from 'redux';
import { ActionModel, StorageModel } from './model';
import { combined } from './reducers';

const storage: Store<StorageModel> = createStore<StorageModel>(combined);
const { dispatch, getState, subscribe } = storage;

/**
 * @description Wrapper function for Redux Store.dispatch
 * @param action 
 */
function dispatchAction(action: ActionModel): ActionModel {
    dispatch(action);
    return action;
}

export { dispatchAction, getState, subscribe };