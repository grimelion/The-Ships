import * as three from 'three';
import { has, debounce } from 'lodash';
import { Emitter, Listeners } from './../tools';
import { YmirCamera } from './camera';
import { YmirScene } from './scene';
import { YmirItem } from './item';

let prev: number = 0;

class YmirModule extends Emitter {
    private cameras: { [ id: string ]: any };
    private scenes: { [id: string ]: YmirScene };
    private items: { [ id: string ]: YmirItem };
    private masterCamera: any;
    private masterScene: YmirScene;
    isRendering: boolean;
    bounds: ClientRect;
    renderer: three.WebGLRenderer;
    listeners: Listeners;

    constructor() {
        super();
        this.cameras = Object.create( null );
        this.scenes = Object.create( null );
        this.items = Object.create( null );
        this.isRendering = false;
    }

    render( timestamp: number ): void {
        this.masterCamera.update();
        this.renderer.render( this.masterScene.$instance, this.masterCamera.$instance );
    }
    
    initialize( canvas: HTMLCanvasElement, startRendering: boolean = true ): YmirModule {
        this.renderer = new three.WebGLRenderer( { canvas } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        this.emit( 'init' );

        let mouseClicked = false;
        let mouseMoved = false;
        let previousX = 0;
        let previousY = 0;
        let button: string;

        canvas.addEventListener('mousedown', (e) => {
            mouseClicked = true;
            
            switch(e.button) {
                case 0:
                    button = 'left';
                    break;
                case 1:
                    button = 'wheel';
                    break;
                case 2:
                    button = 'right';
                    break;
            }

            let mouseX = e.clientX - this.bounds.left;
            let mouseY = e.clientY - this.bounds.top;
            
            previousX = mouseX;
            previousY = mouseY;

            this.emit('dragstart', {
                mouseX,
                mouseY,
                button
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
                deltaY,
                button
            });
        }); 
        
        document.addEventListener('mouseup', (e) => {
            if ( mouseMoved ) {
                this.emit('dragend', {
                    button,
                    target: e.target,
                    preventDefault: Event.prototype.preventDefault.bind(e)
                });
            }
            else {
                this.emit('click', {
                    button
                });
            }
            button = '';
            mouseClicked = false;
            mouseMoved = false;
        });

        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        return this;
    }

    refresh(): YmirModule {
        let canvas = this.renderer.domElement;
        this.bounds = canvas.getBoundingClientRect();
        this.emit( 'update' );
        return this;
    }

    camera( id: string ): any {
        if ( !has( this.cameras, id ) ) {
            this.masterCamera = this.cameras[ id ] = new YmirCamera();
        }
        return this.cameras[ id ];
    }

    scene( id: string ): YmirScene {
        if ( !has( this.scenes, id ) ) {
            this.masterScene = this.scenes[ id ] = new YmirScene();
        }
        return this.scenes[ id ];
    }

    item( id: string ): YmirItem {
        if ( !has( this.items, id ) ) {
            this.items[ id ] = new YmirItem( YmirModule.prototype.scene.bind( this ) );
        }
        return this.items[ id ];        
    }

    startRendering(): YmirModule {
        this.isRendering = true;
        return this;
    }

    stopRendering(): YmirModule {
        this.isRendering = false;
        return this;
    }
}

export { YmirModule };