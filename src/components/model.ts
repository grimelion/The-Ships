import { Store } from 'redux';

interface ComponentModel {
    storage?: Store<any>;
    router?: any;
}

export default ComponentModel;
export { ComponentModel };