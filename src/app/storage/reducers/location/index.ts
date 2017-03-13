import { Reducer } from 'redux';
import { ActionModel } from './../../model';
import { LocationModel } from './model';

const initialState: LocationModel = {
    current: 'home',
    params: {}
}

function location(state: LocationModel = initialState, action: ActionModel): LocationModel {
    switch (action.type) {
        case 'location.change':
            return {
                current: action.data.id,
                params: action.data.params
            };
        default:
            return state;
    }
};

export { location, LocationModel };