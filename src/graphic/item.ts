import * as three from 'three';
import { isFunction } from 'lodash';

interface ItemParams {
    texture?: any;
    model?: Function;
}

class Item {
    instance: three.Object3D;
    scene: Function;

    constructor(sceneCallback: Function) {
        this.scene = sceneCallback;
    }

    setParams(params: ItemParams): Item {
        let { model, texture } = params;
        if ( isFunction(model) ) {
            var a =  model();
        }
        return this;
    }

    appendTo(id: string): Item {
        this.scene(id).addItem(this);
        return this;
    }

}

export { Item };