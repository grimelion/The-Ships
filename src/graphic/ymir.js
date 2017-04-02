import { remove } from 'lodash';
import * as io from 'socket.io-client';
import { YmirModule } from './engine';
import { YmirEvent } from './event';

let socket = io( 'ws://localhost:3000' );
socket.on('actions', ( data ) => {
    console.log(data);
});


function pushItem( array = [], value ) {
    if ( array.indexOf( value ) === -1 ) {
        array.push( value );
    }
}

function removeItem( array, value ) {
    remove( array, ( item ) => item === value );
}

const modules = Object.create( null );
let timestamp = 0;

let eventTarget;
// let event = '';
let dispatchedEvents = [];

let mouseClicked = [];
let mouseDown = false;
let mouseMoved = false;

let keysPressed = [];
let keyDown = false;

let deltaX = 0;
let deltaY = 0;
let mouseX = 0;
let mouseY = 0;

const event = Object.create( YmirEvent );

function handleMouseDown( e ) {
    pushItem( mouseClicked, e.button );
    pushItem( dispatchedEvents, 'dragstart' );
    mouseDown = true;
    mouseMoved = false;
}

function handleMouseMove( e ) {
    pushItem( dispatchedEvents, 'mousemove' );
    if ( mouseDown ) {
        pushItem( dispatchedEvents, 'dragmove' );
    }
    
    eventTarget = e.target;
    let previousX = mouseX;
    let previousY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    deltaX = mouseX - previousX;
    deltaY = mouseY - previousY;

    mouseMoved = true;
}

function handleMouseUp( e ) {
    removeItem( mouseClicked, e.button );
    pushItem( dispatchedEvents, 'dragend' );
    if ( !mouseMoved ) {
        pushItem( dispatchedEvents, 'click' );
    }
    mouseDown = false;
    mouseMoved = false;
}

function handleContextMenu( e ) {
    if ( e.target.tagName === 'CANVAS' ) {
        e.preventDefault();
    }
}

function render() {
    event.eventTarget = eventTarget;
    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.mouseX = mouseX;
    event.mouseY = mouseY;
    event.frame = -timestamp + ( timestamp = Date.now() );

    for (let id in modules) {
        let module = modules[ id ]; 

        if ( module.isRendering ) {
            module.render( event );
        }
    }
    
    dispatchedEvents = [];
    event.deltaX = 0;
    event.deltaY = 0;
    event.mouseX = 0;
    event.mouseY = 0;
    requestAnimationFrame( render );    
}

const Ymir = Object.create( null, {
    configure: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function configure( options ) {
            
        }
    },
    initialize: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function initialize() {
            document.addEventListener( 'mousemove', handleMouseMove );
            document.addEventListener( 'mousedown', handleMouseDown );
            document.addEventListener( 'mouseup', handleMouseUp );
            document.addEventListener( 'contextmenu', handleContextMenu );
            timestamp = Date.now();
            requestAnimationFrame( render );
        }
    },
    module: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function module( id ) {
            if ( !modules[ id ] ) {
                let module = Object.create( YmirModule);
                module.cameras = Object.create( null );
                module.scenes = Object.create( null );
                module.items = Object.create( null );
                module.isRendering = false;
                modules[ id ] = module;

            }
            return modules[ id ];
        }
    }
});

export { Ymir };