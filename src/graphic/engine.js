import * as three from 'three';
import { has, debounce } from 'lodash';
import { Emitter, Listeners } from './../tools';
import { YmirCamera } from './camera';
import { YmirScene } from './scene';
import { YmirItem } from './item';

const YmirModule = Object.create( Emitter, {
    initialize: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function initialize( canvas ) {
            this.emit( 'init' );
            this.renderer = new three.WebGLRenderer( { canvas } );
            
            return this;
        }        
    },
    render: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function render() {
            this.renderer.render( this.masterScene.$instance, this.masterCamera.$instance );
        }
    },
    refresh: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function refresh() {
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.bounds = this.renderer.domElement.getBoundingClientRect();
            this.emit( 'update' );
            return this;
        }    
    },
    camera: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function camera( id ) {
            if ( !has( this.cameras, id ) ) {
                this.masterCamera = this.cameras[ id ] = new YmirCamera();
            }
            return this.cameras[ id ];
        }    
    },
    scene: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function scene( id ) {
            if ( !has( this.scenes, id ) ) {
                this.masterScene = this.scenes[ id ] = new YmirScene();
            }
            return this.scenes[ id ];
        }    
    },
    item: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function item( id ) {
            if ( !has( this.items, id ) ) {
                this.items[ id ] = Object.create( YmirItem, {
                    $scene: {
                        configurable: false,
                        enumerable: false,
                        writable: false,
                        value: YmirModule.scene.bind( this )
                    }
                });
            }
            return this.items[ id ];     
        }    
    },
    startRendering: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function startRendering( id ) {
            this.isRendering = true;
            return this;
        }    
    },    
    stopRendering: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function stopRendering( id ) {
            this.isRendering = true;
            return this;
        }    
    }
});

export { YmirModule };