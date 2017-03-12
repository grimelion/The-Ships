// TODO: Implement event-interface
export class Renderer {
    private scene:      THREE.Scene = new THREE.Scene();    
    private width:      number = window.innerWidth;
    private height:     number = window.innerHeight;
    private camera:     THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60, this.width/this.height, 0.1, 5000);
    private renderer:   THREE.WebGLRenderer = new THREE.WebGLRenderer(); 
    private light:      THREE.AmbientLight = new THREE.AmbientLight(0xffffff);

    constructor() { 
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000);
        this.camera.position.set(0,0,1000);
        this.scene.add(this.light);

        document.body.appendChild(this.renderer.domElement);
        document.addEventListener('load', () => {
            this.loop();
        });
    }

    // TODO: Find solution how launch loop() outside class
    public loop(): void {
        console.log('call');
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.loop());
    }
}