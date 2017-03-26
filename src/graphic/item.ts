import * as three from 'three';
import { isFunction } from 'lodash';

interface YmirItemParams {
    geometry?: any;
    texture?: any;
}

class YmirItem {
    private scene: Function;
    $instance: three.Mesh;

    constructor(sceneCallback: Function) {
        this.scene = sceneCallback;
    }

    setParams(params: YmirItemParams): YmirItem {
        let item: three.Mesh;
        let { geometry, texture } = params;
        if (!this.$instance) {
            item = this.$instance = new three.Mesh(geometry, texture);
        }
        return this;
    }

    appendTo(id: string): YmirItem {
        this.scene(id).addItem( this );
        return this;
    }

}

export { YmirItem };