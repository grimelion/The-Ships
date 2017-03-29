import * as three from 'three';
import { YmirVector2, YmirVector3 } from './data';

const YmirEntityControls = Object.create( null, {
     instance: {
        configurable: false,
        enumerable: false,
        writable: true,
        value: undefined
    },   
    move: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function move( x, y, z ) {
            this.instance.translateX( x );
        }
    },
    rotate: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function rotate( x, y, z ) {

        }
    },
    turn: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function turn( x, y, z ) {

        }
    }    
});

const YmirEntity = Object.create( null, {	
    appearance: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function appearance( handler ) {
            this.$appearanceHandler = handler;
            return this;
        }
    },
    behaviour: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function behaviour( handler ) {
            this.$behaviourHandler = handler;
            return this;
        }
    },
    update: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function update( event ) {
            YmirEntityControls.instance = this;
            this.behaviour.call( YmirEntityControls, event );
        }
    }
});

export { YmirEntity };
    // handleFrame( timestamp: number ): void {
    //     this.$instance.translateX( this.$moveSpeed / ( 1000 / timestamp ) );
    // }