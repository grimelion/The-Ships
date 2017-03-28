import * as three from 'three';
import { YmirVector2, YmirVector3 } from './data';

const YmirEntity = Object.create( null, {
    move: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function move( x, y, z ) {
            this.$instance.translateX( x );
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
    },
    update: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function update() {
            if ( !this.$shouldUpdate ) {
                return;
            }

            this.$instance.position.set( this.position.x, this.position.y, this.position.z );
            this.$shouldUpdate = false;
        }
    }
    
});

export { YmirEntity };
    // handleFrame( timestamp: number ): void {
    //     this.$instance.translateX( this.$moveSpeed / ( 1000 / timestamp ) );
    // }