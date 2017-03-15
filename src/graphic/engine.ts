import * as three from 'three';
import { has } from 'lodash';
import { Camera } from './camera';
import { Scene } from './scene';

class GraphicEngine {
    private cameras: { [id: string]: Camera };
    private scenes: { [id: string]: Scene };
    private renderer: three.WebGLRenderer;
    private canvas: HTMLCanvasElement;

    constructor() {
        this.cameras = Object.create(null);
        this.scenes = Object.create(null);
    }
    
    initialize(canvas: HTMLCanvasElement): GraphicEngine {
        this.renderer = new three.WebGLRenderer({ canvas });
        return this;
    }

    camera(id: string): Camera {
        if (!has(this.cameras, id)) {
            this.cameras[id] = new Camera();
        }
        return this.cameras[id];
    }

    scene(id: string): Scene {
        if (!has(this.cameras, id)) {
            this.cameras[id] = new Camera();
        }
        return this.scenes[id];
    }

    dispatch(command: string = 'render') {
        
    }
}