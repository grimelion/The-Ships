import { remove } from 'lodash';
import { YmirModule } from './engine';
import { YmirEvent } from './event';

function pushUnique( array = [], value ) {
    if ( array.indexOf( value ) === -1 ) {
        array.push( value );
    }
}

const modules = Object.create( null );
let time = Date.now();

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
let previousX = 0;
let previousY = 0;

const event = Object.create( YmirEvent );

function render() {
    event.eventTarget = eventTarget;
    console.log(mouseClicked);
    for (let id in modules) {
        let module = modules[ id ]; 

        if ( module.isRendering ) {
            time = Date.now();
            module.render( time );
        }
    }
    dispatchedEvents = [];
    mouseClicked = [];
    requestAnimationFrame( render );    
}

document.addEventListener('mousemove', function ( e ) {
    pushUnique( dispatchedEvents, 'mousemove' );
    if ( mouseDown ) {
        pushUnique( dispatchedEvents, 'dragmove' );
    }
    
    eventTarget = e.target;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    deltaX = mouseX - previousX;
    deltaY = mouseY - previousY;
    previousX = mouseX;
    previousY = mouseY;

    mouseMoved = true;
});
document.addEventListener( 'mousedown', function ( e ) {
    pushUnique( dispatchedEvents, 'dragstart' );
    pushUnique( mouseClicked, e.button );
    mouseDown = true;
    mouseMoved = false;
});
document.addEventListener( 'mouseup', function ( e ) {
    remove( mouseClicked, e.button );
    pushUnique( dispatchedEvents, 'click' );
    if ( mouseMoved ) {
        pushUnique( dispatchedEvents, 'dragend' );
    }
    mouseDown = false;
    mouseMoved = false;
});

document.addEventListener( 'contextmenu', function ( e ) {
    if ( e.target.tagName === 'CANVAS' ) {
        e.preventDefault();
    }
});


const Ymir = Object.create( null, {
    initialize: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function () {
            requestAnimationFrame( render );
        }
    },
    module: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function module( id ) {
            if ( !modules[ id ] ) {
                modules[ id ] = new YmirModule();
            }
            return modules[ id ];
        }
    }
});

export { Ymir };