import * as three from 'three';
import { has } from 'lodash';
import { Camera } from './camera';

class GraphicModule {
    private cameras: { [id: string]: Camera };
    private scenes: { [id: string]: three.Scene };
    private renderer: three.WebGLRenderer;
    private canvas: HTMLCanvasElement;

    constructor() {
        this.cameras = Object.create(null);
        this.scenes = Object.create(null);
    }
    
    enhance(canvas: HTMLCanvasElement): GraphicModule {
        this.renderer = new three.WebGLRenderer({ canvas });
        return this;
    }

    camera(id: string): Camera {
        if (!has(this.cameras, id)) {
            this.cameras[id] = new Camera('');
        }
        return this.cameras[id];
    }

}