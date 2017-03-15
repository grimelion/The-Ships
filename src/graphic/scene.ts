import * as three from 'three';

interface SceneParams {
    background?: three.Color | three.Texture | three.CubeTexture;
    fog?: three.Fog;
}

class Scene {
    instance: three.Scene;

    constructor() {}

    setParams(params: SceneParams): Scene {
        let scene: three.Scene;
        let { background } = params;

        if ( !(scene = this.instance) ) {
            scene = this.instance = new three.Scene();
        }
        scene.background = background;
        return this;
    }

    addObject(id: string, thing: three.Object3D): Scene {
        this.instance.add(thing);
        return this;
    }
}

export { Scene };