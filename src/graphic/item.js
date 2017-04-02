import * as three from 'three';
import { YmirEntity } from './entity';

const YmirItem = Object.create( YmirEntity, {
    configure: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function configure( params ) {
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