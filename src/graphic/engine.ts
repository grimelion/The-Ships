import * as three from 'three';
import { has, debounce } from 'lodash';
import { Emitter, Listeners } from './../tools';
import { Camera } from './camera';
import { Scene } from './scene';
import { Item } from './item';

class GraphicEngine extends Emitter {
    private cameras: { [ id: string ]: Camera };
    private scenes: { [id: string ]: Scene };
    private items: { [ id: string ]: Item };
    private masterCamera: Camera;
    private masterScene: Scene;
    private bounds: ClientRect;
    renderer: three.WebGLRenderer;
    listeners: Listeners;

    constructor() {
        super();
        this.cameras = Object.create( null );
        this.scenes = Object.create( null );
        this.items = Object.create( null );
    }

    private frame( data?: any ): void {
        this.renderer.render( this.masterScene.instance, this.masterCamera.instance );
        requestAnimationFrame( GraphicEngine.prototype.frame.bind( this ) );
    }
    
    initialize( canvas: HTMLCanvasElement, startRendering: boolean = true ): GraphicEngine {
        this.renderer = new three.WebGLRenderer( { canvas } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        this.refresh();
        this.emit( 'init' );

        let mouseClicked = false;
        let mouseMoved = false;
        let previousX = 0;
        let previousY = 0;

        canvas.addEventListener('mousedown', (e) => {
            mouseClicked = true;

            let mouseX = e.clientX - this.bounds.left;
            let mouseY = e.clientY - this.bounds.top;
            
            previousX = mouseX;
            previousY = mouseY;

            this.emit('dragstart', {
                mouseX,
                mouseY
            });
        });

        canvas.addEventListener('mousemove', (e) => {
            if ( !mouseClicked ) {
                return;
            }

            if ( !mouseMoved ) {
                mouseMoved = true;
            }

            let mouseX = e.clientX - this.bounds.left;
            let mouseY = e.clientY - this.bounds.top;
            let deltaX = mouseX - previousX;
            let deltaY = mouseY - previousY;

            previousX = mouseX;
            previousY = mouseY;

            this.emit('dragmove', {
                mouseX,
                mouseY,
                deltaX,
                deltaY
            });
        }); 
        
        document.addEventListener('mouseup', (e) => {
            if ( mouseMoved ) {
                this.emit('dragend', e);
            }
            else {
                this.emit('click', e);
            }

            mouseClicked = false;
            mouseMoved = false;
        });

        return this;
    }

    refresh() {
        let canvas = this.renderer.domElement;
        this.bounds = canvas.getBoundingClientRect();
        this.emit( 'update' );
    }

    camera( id: string ): Camera {
        if ( !has( this.cameras, id ) ) {
            this.masterCamera = this.cameras[ id ] = new Camera();
        }
        return this.cameras[ id ];
    }

    scene( id: string ): Scene {
        if ( !has( this.scenes, id ) ) {
            this.masterScene = this.scenes[ id ] = new Scene();
        }
        return this.scenes[ id ];
    }

    item( id: string ): Item {
        if ( !has( this.items, id ) ) {
            this.items[ id ] = new Item( GraphicEngine.prototype.scene.bind( this ) );
        }
        return this.items[ id ];        
    }

    render(): GraphicEngine {
        if ( !this.renderer ) {
            throw new Error( 'Impossible to render uninitialized engine' );
        }

        this.frame();

        return this;
    }

    freeze(): GraphicEngine {

        return this;
    }
}

export { GraphicEngine };