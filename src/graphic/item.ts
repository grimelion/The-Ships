import * as three from 'three';

interface ItemParams {}

class Item {
    instance: three.Object3D;
    scene: Function;

    constructor(sceneCallback: Function) {
        this.scene = sceneCallback;
    }

    setParams(params: ItemParams): Item {
        return this;
    }

    appendTo(id: string): Item {
        this.scene(id).addItem(this);
        return this;
    }

}

export { Item };