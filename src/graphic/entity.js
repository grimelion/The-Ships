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
        value: function ( angle, point ) {
            let offset = new three.Vector3();
            let spherical = new three.Spherical();
            let swapQuaternion = new three.Quaternion();
            let inverseQuaternion = new three.Quaternion();

            return function rotate( angle ) {
                swapQuaternion.setFromUnitVectors( 
                    new three.Vector3( this.instance.up.x, this.instance.up.y, this.instance.up.z ), 
                    new three.Vector3( 0, 1, 0 )
                );
                inverseQuaternion.copy( swapQuaternion ).inverse();
                
                offset.set( this.instance.position.x, this.instance.position.y, this.instance.position.z );
                offset.applyQuaternion( swapQuaternion );
                spherical.setFromVector3( offset );
                spherical.theta -= angle;
                offset.setFromSpherical( spherical );
                offset.applyQuaternion( inverseQuaternion );
                this.instance.position.set( offset.x, offset.y, offset.z );
                this.instance.lookAt( { x: 0, y: 0, z: 0 } );
            };
        }()
    },

// YmirCamera.prototype.rotate = function () {
//     let offset = new three.Vector3();
//     let spherical = new three.Spherical();

//     return function rotate(angle) {
    
//         offset.set( this.position.x, this.position.y, this.position.z );
//         offset.applyQuaternion( this.swapQuaternion );
//         spherical.setFromVector3( offset );
//         spherical.theta -= angle;
//         offset.setFromSpherical( spherical );
//         offset.applyQuaternion( this.inverseQuaternion );
//         this.position = { x: offset.x, y: offset.y, z: offset.z };
//         this.$shouldUpdate = true;
//         return this;
//     };
// }();

    turn: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function turn( x, y, z ) {

        }
    },
    locate: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function locate( x, y, z ) {
            this.instance.position.set( x, y, z );
        }
    },
    face: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function face( x, y, z ) {
            this.instance.lookAt( { x, y, z } );
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
    }
});

export { YmirEntity, YmirEntityControls };
    // handleFrame( timestamp: number ): void {
    //     this.$instance.translateX( this.$moveSpeed / ( 1000 / timestamp ) );
    // }

    // ,
    // update: {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function update( event ) {
    //         YmirEntityControls.instance = this;
    //         this.behaviour.call( YmirEntityControls, event );
    //     }
    // }