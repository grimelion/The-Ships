import * as three from 'three';

interface SceneParams {
    background?: three.Color | three.Texture | three.CubeTexture;
    fog?: three.Fog;
}

class Entity {
    instance: three.Scene;

    constructor() {}

    setParams(params: SceneParams): Entity {
        let scene: three.Scene;
        let { background } = params;

        if ( !(scene = this.instance) ) {
            scene = this.instance = new three.Scene();
        }
        scene.background = background;
        return this;
    }

    addObject(id: string, thing: three.Object3D): Entity {
        this.instance.add(thing);
        return this;
    }
}

export { Entity };