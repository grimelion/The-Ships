import * as three from 'three';
import { YmirItem } from './item';

interface YmirSceneParams {
    background?: number/*three.Color | three.Texture | three.CubeTexture*/;
    fog?: three.Fog;
}

class YmirScene {
    public $instance: three.Scene;
    private $items: any;

    constructor() {}

    setParams(params: YmirSceneParams): YmirScene {
        let scene: three.Scene;
        let { background } = params;

        if ( !(scene = this.$instance) ) {
            scene = this.$instance = new three.Scene();
        }
        scene.background = new three.Color(background);
        return this;
    }

    attachItem(item: any): YmirScene {
        this.$instance.add(item.$instance);
        return this;
    }
}

export { YmirScene };