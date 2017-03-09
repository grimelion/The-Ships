import * as three from 'three';

export class Main {
    private scene: three.Scene                = new three.Scene();
    private camera: three.Camera              = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    private renderer: three.WebGLRenderer     = new three.WebGLRenderer();

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerWidth);
        document.body.appendChild(this.renderer.domElement);
    }
}