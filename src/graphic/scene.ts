import * as three from 'three';
import { Item } from './item';

interface SceneParams {
    background?: number/*three.Color | three.Texture | three.CubeTexture*/;
    fog?: three.Fog;
}

class Scene {
    public instance: three.Scene;

    constructor() {}

    setParams(params: SceneParams): Scene {
        let scene: three.Scene;
        let { background } = params;

        if ( !(scene = this.instance) ) {
            scene = this.instance = new three.Scene();
        }
        scene.background = new three.Color(background);
        return this;
    }

    addItem(item: Item): Scene {
        this.instance.add(item.instance);
        return this;
    }
}

export { Scene };