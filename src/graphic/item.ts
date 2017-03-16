import * as three from 'three';
import { isFunction } from 'lodash';

interface ItemParams {
    geometry?: any;
    texture?: any;
}

class Item {
    instance: three.Object3D;
    scene: Function;

    constructor(sceneCallback: Function) {
        this.scene = sceneCallback;
    }

    setParams(params: ItemParams): Item {
        let item: three.Mesh;
        let { geometry, texture } = params;
        if (!this.instance) {

        }
        return this;
    }

    appendTo(id: string): Item {
        this.scene(id).addItem(this);
        return this;
    }

}

export { Item };