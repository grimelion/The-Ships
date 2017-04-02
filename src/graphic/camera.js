import * as three from 'three';
import { get, has } from 'lodash';
import { YmirEntity } from './entity';

const YmirCamera = Object.create( YmirEntity, {
    configure: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function configure( params ) {
            let { fov, aspect, near, far, left, right, top, bottom } = params;

            if (!this.$instance) {
                let { type } = params;
                if (type === 'orthogonal') {
                    this.$instance = new three.OrthographicCamera(
                        left, right, top, bottom, near, far
                    );
                }
                else if (params.type === 'perspective') {
                    this.$instance = new three.PerspectiveCamera(
                        fov, aspect, near, far
                    );
                }
            }
            else {
                let type = this.type;
                let shouldUpdate = false;
                if (type === 'orthogonal') {
                    applyParams(
                        ['left', 'right', 'top', 'bottom', 'near', 'far'],
                        params
                    );
                
                }
                else if (type === 'perspective') {
                    applyParams(
                        ['fov', 'aspect', 'near', 'far'],
                        params
                    );               
                }
            }
            this.$instance.up.set( 0, 0, 1 );
            // this.updateQuaternions();
            return this;

            function applyParams( keys ) {
                let shouldUpdate = false;
                keys.forEach( ( item ) => {
                    if ( has( params, item ) && this.$instance[ item ] !== get( params, item ) ) {
                        this.$instance[ item ] = get( params, item );
                        shouldUpdate = true;
                    }
                });
                if ( shouldUpdate ) {
                    this.$instance.updateProjectionMatrix();          
                }
            }
        }
    }
});

// function YmirCamera() {
//     this.$shouldUpdate = true;
//     this.up = { x: 0, y: 0, z: 1 };
// }

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

// YmirCamera.prototype.applyParams = function (keys, params) {
//     let shouldUpdate = false;
//     keys.forEach( (item) => {
//         if ( has(params, item) && this.$instance[item] !== get(params, item) ) {
//             this.$instance[item] = get(params, item);
//             shouldUpdate = true;
//         }
//     });
//     if (shouldUpdate) {
//         this.$instance.updateProjectionMatrix();          
//     }
// };

// YmirCamera.prototype.updateQuaternions = function () {
//     this.swapQuaternion = new three.Quaternion().setFromUnitVectors( 
//         new three.Vector3(this.up.x, this.up.y, this.up.z), 
//         new three.Vector3( 0, 1, 0 )
//     );
//     this.inverseQuaternion = this.swapQuaternion.clone().inverse();
// };

// YmirCamera.prototype.configure = function (params) {
//     let { fov, aspect, near, far, left, right, top, bottom } = params;

//     if (!this.$instance) {
//         let { type } = params;
//         if (type === 'orthogonal') {
//             this.$instance = new three.OrthographicCamera(
//                 left, right, top, bottom, near, far
//             );
//         }
//         else if (params.type === 'perspective') {
//             this.$instance = new three.PerspectiveCamera(
//                 fov, aspect, near, far
//             );
//         }
//     }
//     else {
//         let type = this.type;
//         let shouldUpdate = false;
//         if (type === 'orthogonal') {
//             this.applyParams(
//                 ['left', 'right', 'top', 'bottom', 'near', 'far'],
//                 params
//             );
        
//         }
//         else if (type === 'perspective') {
//             this.applyParams(
//                 ['fov', 'aspect', 'near', 'far'],
//                 params
//             );               
//         }
//     }
//     this.$instance.up.set( this.up.x, this.up.y, this.up.z );
//     this.updateQuaternions();
//     return this;
// };

// YmirCamera.prototype.lookAt = function (coords) {
//     this.target = coords;
//     return this;
// };

// YmirCamera.prototype.moveTo = function (coords) {
//     this.position = coords;
//     return this;
// };

// YmirCamera.prototype.update = function () {
//     if ( !this.$shouldUpdate ) {
//         return;
//     }
//     this.$instance.position.set( this.position.x, this.position.y, this.position.z );
//     this.$instance.lookAt( new three.Vector3(this.target.x, this.target.y, this.target.z) );
//     this.$shouldUpdate = false;
// };

//----------------------------------------------------------------------------

// class YmirCamera {
//     private swapQuaternion: three.Quaternion;
//     private inverseQuaternion: three.Quaternion;

//     public $instance: three.OrthographicCamera | three.PerspectiveCamera;
//     public type: YmirCameraType;
//     public position: YmirVector3;
//     public target: YmirVector3;
//     public up: YmirVector3;

//     constructor() {
//         this.up = { x: 0, y: 0, z: 1 };
//     }

//     private applyParams(keys: string[], params: YmirCameraParams): void {
//         let shouldUpdate = false;
//         keys.forEach( (item) => {
//             if ( has(params, item) && (<YmirCameraSignature>this.$instance)[item] !== get(params, item) ) {
//                 (<YmirCameraSignature>this.$instance)[item] = get(params, item);
//                 shouldUpdate = true;
//             }
//         });

//         if (shouldUpdate) {
//             this.$instance.updateProjectionMatrix();          
//         }
//     }

//     private updateQuaternions(): void {
//         this.swapQuaternion = new three.Quaternion().setFromUnitVectors( 
//             new three.Vector3(this.up.x, this.up.y, this.up.z), 
//             new three.Vector3( 0, 1, 0 )
//         );
//         this.inverseQuaternion = this.swapQuaternion.clone().inverse();
//     }

//     setParams(params: YmirCameraParams): YmirCamera {
//         let { fov, aspect, near, far, left, right, top, bottom } = params;
        
//         if (!this.$instance) {
//             let { type } = params;
//             if (type === 'orthogonal') {
//                 this.$instance = new three.OrthographicCamera(
//                     left, right, top, bottom, near, far
//                 );
//             }
//             else if (params.type === 'perspective') {
//                 this.$instance = new three.PerspectiveCamera(
//                     fov, aspect, near, far
//                 );
//             }
//         }
//         else {
//             let type = this.type;
//             let shouldUpdate = false;
//             if (type === 'orthogonal') {
//                 this.applyParams(
//                     ['left', 'right', 'top', 'bottom', 'near', 'far'],
//                     params
//                 );
                
//             }
//             else if (type === 'perspective') {
//                 this.applyParams(
//                     ['fov', 'aspect', 'near', 'far'],
//                     params
//                 );               
//             }
//         }
//         this.$instance.up.set( this.up.x, this.up.y, this.up.z );
//         this.updateQuaternions();
//         return this;
//     }

//     lookAt(coords: YmirVector3): YmirCamera {
//         this.target = coords;
//         return this;
//     }

//     moveTo(coords: YmirVector3): YmirCamera {
//         this.position = coords;
//         return this;
//     }

//     update(): void {
//         console.log(this.position);
//         this.$instance.position.set( this.position.x, this.position.y, this.position.z );
//         this.$instance.lookAt( new three.Vector3(this.target.x, this.target.y, this.target.z) );
//     }

//     rotate( angle: number ): YmirCamera {
//         let offset = new three.Vector3( this.position.x, this.position.y, this.position.z );
//         let spherical = new three.Spherical();
//         offset.applyQuaternion( this.swapQuaternion );
//         spherical.setFromVector3( offset );
//         spherical.theta -= angle;
//         offset.setFromSpherical( spherical );
//         offset.applyQuaternion( this.inverseQuaternion );
//         this.position = { x: offset.x, y: offset.y, z: offset.z };
//         return this;
//     }
// }

export { YmirCamera };