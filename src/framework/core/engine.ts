export class Stage {
    private canvas: HTMLCanvasElement;
    private context: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('webgl');
    }
}