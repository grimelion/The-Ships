import { Reducer } from 'redux';
import { ReducersModel } from './reducers/model';

type Events =
    'location.change';

interface ActionModel {
    type: Events,
    data: {
        [name: string]: any
    }
}

interface StorageModel extends ReducersModel {}

export { ActionModel, StorageModel };