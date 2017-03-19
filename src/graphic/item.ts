import * as three from 'three';
import { isFunction } from 'lodash';

interface ItemParams {
    geometry?: any;
    texture?: any;
}

class Item {
    private scene: Function;
    instance: three.Mesh;

    constructor(sceneCallback: Function) {
        this.scene = sceneCallback;
    }

    setParams(params: ItemParams): Item {
        let item: three.Mesh;
        let { geometry, texture } = params;
        if (!this.instance) {
            item = this.instance = new three.Mesh(geometry, texture);
        }
        return this;
    }

    appendTo(id: string): Item {
        this.scene(id).addItem(this);
        return this;
    }

}

export { Item };