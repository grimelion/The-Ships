import { Reducer } from 'redux';
import { Action } from './../../model';
import { RouterModel } from './model';

const initialState = {
    current: 'home',
    params: {}
}

const router: Reducer<RouterModel> = (state: RouterModel = initialState, action: Action): RouterModel => {
    switch (action.type) {
        case 'router.navigate':
            return {
                current: action.id,
                params: action.params
            };
        default:
            return state;
    }
};

export { router };