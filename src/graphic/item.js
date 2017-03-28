import * as three from 'three';
import { YmirEntity } from './entity';

// interface YmirItemParams {
//     geometry?: any;
//     texture?: any;
// }

// class YmirItem {
//     private scene: Function;
//     $instance: three.Mesh;

//     constructor(sceneCallback: Function) {
//         this.scene = sceneCallback;
//     }

//     setParams(params: YmirItemParams): YmirItem {
//         let item: three.Mesh;
//         let { geometry, texture } = params;
//         if (!this.$instance) {
//             item = this.$instance = new three.Mesh(geometry, texture);
//         }
//         return this;
//     }

//     appendTo(id: string): YmirItem {
//         this.scene(id).addItem( this );
//         return this;
//     }

// }

const YmirItem = Object.create( YmirEntity, {
    setParams: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function setParams( params ) {
            let { geometry, texture } = params;
            if ( !this.$instance ) {
                this.$instance = new three.Mesh( geometry, texture );
            }
            return this;
        }
    },
    attachTo: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function attachTo( sceneId ) {
            this.$scene( sceneId ).attachItem( this );
        }
    }
});

export { YmirItem };