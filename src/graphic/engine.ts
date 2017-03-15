import * as three from 'three';
import { has } from 'lodash';
import { Camera } from './camera';
import { Scene } from './scene';
import { Item } from './item';

class Engine {
    private cameras: { [id: string]: Camera };
    private scenes: { [id: string]: Scene };
    private items: { [id: string]: Item };
    private renderer: three.WebGLRenderer;
    private canvas: HTMLCanvasElement;

    constructor() {
        this.cameras = Object.create(null);
        this.scenes = Object.create(null);
    }
    
    initialize(canvas: HTMLCanvasElement): Engine {
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

    item(id: string): Item {
        if (!has(this.cameras, id)) {
            this.items[id] = new Item(this.scene);
        }
        return this.items[id];        
    }

    render(): Engine {
        return this;
    }
}

export { Engine };